import prisma from "../prismaClient.js";

export const createCourse = async (req, res) => {
  // Assuming adminMiddleware ensures req.user exists and has an ID
  const instructorId = req.user.id;
  const {
    title,
    description,
    difficulty, // Make sure these match schema names
    type, // e.g., CourseType enum
    category,
    language,
    tags, // Handle tag relations if applicable
    learningOutcomes, // Handle relations if applicable
    requirements, // Handle relations if applicable
    isPublished: isPublishedStr, // Read as string
    isFeatured: isFeaturedStr,   // Read as string
  } = req.body;

  // Basic validation
  if (!title || !description || !difficulty || !type) {
    return res.status(400).json({
      error:
        "Missing required course fields (title, description, difficulty, type)",
    });
  }

  // Convert '1'/'0' strings to boolean. Default to false if undefined/null.
  const isPublished = isPublishedStr === '1';
  const isFeatured = isFeaturedStr === '1';

  console.log(req.cloudinaryUrl, " Testiing ", req.coverImageUrl)

  try {
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        instructorId,
        difficulty,
        type,
        category, // Include optional fields
        language,
        thumbnail: req.cloudinaryUrl || null, // Use URL from request (e.g., set by middleware)
        coverImage: req.coverImageUrl || null, // Use URL from request (e.g., set by middleware)
        isPublished, // Use the converted boolean
        isFeatured,  // Use the converted boolean
        slug: title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""), // Basic slug generation

        // Add logic here to handle relations like tags, outcomes, requirements if sent in body
        // e.g., connect existing tags or create new ones based on req.body.tags
      },
      include: {
        // Include instructor details in response
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
      },
    });
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return res.status(409).json({
        error: "A course with a similar title (slug) already exists.",
      });
    }
    res
      .status(500)
      .json({ error: "Failed to create course", details: error.message });
  }
};

export const getCourses = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    type,
    difficulty,
    search,
    sortBy = "createdAt",
    order = "asc",
  } = req.query;

  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {
      isPublished: true, // Filter for only published courses
    };

    if (type) where.type = type;
    if (difficulty) where.difficulty = difficulty;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const validSortFields = [
      "createdAt",
      "title",
      "difficulty",
      "enrollmentsCount",
    ]; // Add more if needed
    const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortOrder = order === "asc" ? "asc" : "desc";

    let orderBy = { [sortField]: sortOrder };

    // Special handling if sorting by enrollment count (requires aggregation)
    // Note: Prisma doesn't directly support orderBy on _count in the main query easily.
    // A more complex approach (raw query or fetching all then sorting) might be needed for accurate count sorting.
    // Keeping it simple for now, sorting by other fields.

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          instructor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImage: true,
            },
          },
          _count: {
            select: { enrollments: true }, // Include enrollment count
          },
        },
      }),
      prisma.course.count({ where }),
    ]);

    res.status(200).json({
      courses,
      pagination: {
        total,
        page: parseInt(page),
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error("Public courses fetch error:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            bio: true,
          },
        },
        modules: {
          orderBy: { order: "asc" }, // Assuming modules have an order field
          select: {
            id: true,
            title: true,
            order: true,
            description: true,
            // Optionally include content units if needed for overview
            // contentUnits: {
            //   orderBy: { order: 'asc' },
            //   select: { id: true, title: true, contentType: true, duration: true }
            // }
          },
        },
        reviews: {
          // Include reviews
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
          },
        },
        _count: {
          // Include counts
          select: { enrollments: true, reviews: true, modules: true },
        },
        // Add includes for tags, requirements, outcomes if needed
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the course is published before returning
    if (!course.isPublished) {
      // Check if the user is the instructor or an admin (if auth middleware was optionally used)
      // if (req.user && (req.user.id === course.instructorId || req.user.role === 'ADMIN')) {
      //    return res.status(200).json(course);
      // }
      return res.status(403).json({ error: "This course is not available" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Course fetch error:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve course", details: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    type,
    difficulty,
    instructorId,
    overview,
    durationHours,
    isPublished: isPublishedStr, // Read as string
    isFeatured: isFeaturedStr,   // Read as string
  } = req.body;

  try {
    const dataToUpdate = {
      // Initialize with fields that might be updated
      title,
      description,
      overview,
      type,
      difficulty,
      instructorId: instructorId ? parseInt(instructorId) : undefined,
      durationHours: durationHours ? parseInt(durationHours) : undefined,
      thumbnail: req.cloudinaryUrl || undefined, // Use URL if present, otherwise keep existing
      coverImage: req.coverImageUrl || undefined, // Use URL if present, otherwise keep existing
    };

    // Convert '1'/'0' strings to boolean only if they are present in the body
    if (isPublishedStr !== undefined) {
      dataToUpdate.isPublished = isPublishedStr === '1';
    }
    if (isFeaturedStr !== undefined) {
      dataToUpdate.isFeatured = isFeaturedStr === '1';
    }

    // Remove undefined fields so Prisma doesn't try to set them to null
    Object.keys(dataToUpdate).forEach(
      (key) => dataToUpdate[key] === undefined && delete dataToUpdate[key]
    );

    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: dataToUpdate, // Pass the dynamically built object
    });

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.course.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createModule = async (req, res) => {
  const { title, description, courseId, estimatedHours, orderNumber } =
    req.body;

  try {
    if (!title || !courseId) {
      return res
        .status(400)
        .json({ error: "Title and course ID are required" });
    }

    const module = await prisma.courseModule.create({
      data: {
        title,
        description,
        courseId: parseInt(courseId),
        estimatedHours: estimatedHours ? parseInt(estimatedHours) : null,
        orderNumber: orderNumber ? parseInt(orderNumber) : 1,
        thumbnail: req.cloudinaryUrl || null,
      },
    });

    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateModule = async (req, res) => {
  const { id } = req.params;
  const { title, description, estimatedHours, isPublished, orderNumber } =
    req.body;

  try {
    const module = await prisma.courseModule.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        estimatedHours: estimatedHours ? parseInt(estimatedHours) : undefined,
        isPublished,
        orderNumber: orderNumber ? parseInt(orderNumber) : undefined,
        thumbnail: req.cloudinaryUrl || undefined,
      },
    });

    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteModule = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.courseModule.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getModuleById = async (req, res) => {
  const { id } = req.params;

  try {
    const module = await prisma.courseModule.findUnique({
      where: { id: parseInt(id) },
      include: {
        course: true,
        units: {
          orderBy: { orderNumber: "asc" },
        },
        quizzes: {
          orderBy: { orderNumber: "asc" },
        },
        exercises: {
          orderBy: { orderNumber: "asc" },
        },
      },
    });

    if (!module) return res.status(404).json({ error: "Module not found" });

    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getModules = async (req, res) => {
  const { courseId, page = 1, limit = 10 } = req.query;

  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = courseId ? { courseId: parseInt(courseId) } : {};

    const [modules, total] = await Promise.all([
      prisma.courseModule.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { orderNumber: "asc" },
        include: {
          course: {
            select: {
              id: true,
              title: true,
            },
          },
          _count: {
            select: { units: true },
          },
        },
      }),
      prisma.courseModule.count({ where }),
    ]);

    res.status(200).json({
      modules,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createContentUnit = async (req, res) => {
  const {
    title,
    description,
    moduleId,
    contentType,
    textContent,
    videoUrl,
    audioUrl,
    externalUrl,
    estimatedMinutes,
    orderNumber,
  } = req.body;

  try {
    if (!title || !moduleId || !contentType) {
      return res
        .status(400)
        .json({ error: "Title, module ID, and content type are required" });
    }

    const unit = await prisma.contentUnit.create({
      data: {
        title,
        description,
        moduleId: parseInt(moduleId),
        contentType,
        textContent,
        videoUrl,
        audioUrl,
        fileUrl: req.cloudinaryUrl || null,
        externalUrl,
        estimatedMinutes: estimatedMinutes ? parseInt(estimatedMinutes) : null,
        orderNumber: orderNumber ? parseInt(orderNumber) : 1,
      },
    });

    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const enrollInCourse = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id; // From authMiddleware

  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    // 1. Check if course exists and is published
    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId) },
      select: { id: true, isPublished: true },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (!course.isPublished) {
      return res
        .status(403)
        .json({ error: "Cannot enroll in an unpublished course" });
    }

    // 2. Check if user is already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          // Using the compound unique key
          userId: userId,
          courseId: parseInt(courseId),
        },
      },
    });

    if (existingEnrollment) {
      return res.status(409).json({
        error: "Already enrolled in this course",
        enrollment: existingEnrollment, // Optionally return existing enrollment
      });
    }

    // 3. Create the enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: userId,
        courseId: parseInt(courseId),
        status: "ACTIVE", // Default status
        progressPercentage: 0, // Default progress
        // enrollmentDate is handled by @default(now())
      },
      include: {
        // Include course details in the response
        course: {
          select: { id: true, title: true, slug: true },
        },
      },
    });

    res.status(201).json({ message: "Successfully enrolled", enrollment });
  } catch (error) {
    console.error("Enrollment error:", error);
    res
      .status(500)
      .json({ error: "Failed to enroll in course", details: error.message });
  }
};

export const unenrollFromCourse = async (req, res) => {
  const { courseId, reason } = req.body;
  const userId = req.user.id;

  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: parseInt(courseId),
        },
      },
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    if (enrollment.status === "UNENROLLED") {
      return res
        .status(400)
        .json({ error: "You are already unenrolled from this course" });
    }

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        status: "UNENROLLED",
        unenrollmentDate: new Date(),
        unenrollmentReason: reason,
      },
    });

    res.status(200).json({
      message: "Unenrolled successfully",
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrolledCourses = async (req, res) => {
  const userId = req.user.id; // From authMiddleware

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: userId,
        status: { not: "UNENROLLED" }, // Optionally filter out un-enrolled courses
      },
      orderBy: { enrollmentDate: "desc" }, // Show most recent first
      include: {
        course: {
          // Include details of the enrolled course
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            difficulty: true,
            type: true,
            instructor: {
              // Include instructor info
              select: { id: true, firstName: true, lastName: true },
            },
            // Add other course fields needed for the user's dashboard/list
          },
        },
        // Include ModuleProgress or UnitProgress if needed for overview
        // moduleProgress: { select: { id: true, completed: true, moduleId: true } }
      },
    });

    if (!enrollments || enrollments.length === 0) {
      // Return empty array, not an error
      return res.status(200).json([]);
    }

    // Optionally, calculate overall progress if not stored directly on enrollment
    // (Your schema has progressPercentage on Enrollment, which is good)

    res.status(200).json(enrollments);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({
      error: "Failed to retrieve enrolled courses",
      details: error.message,
    });
  }
};

export const updateUnitProgress = async (req, res) => {
  const { unitId, completed, timeSpentMinutes, lastPosition } = req.body;
  const userId = req.user.id;

  try {
    const unit = await prisma.contentUnit.findUnique({
      where: { id: parseInt(unitId) },
      select: { moduleId: true },
    });

    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }

    const module = await prisma.courseModule.findUnique({
      where: { id: unit.moduleId },
      select: { courseId: true },
    });

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: module.courseId,
        },
      },
    });

    if (!enrollment) {
      return res
        .status(404)
        .json({ error: "You are not enrolled in this course" });
    }

    let unitProgress = await prisma.unitProgress.findUnique({
      where: {
        enrollmentId_unitId: {
          enrollmentId: enrollment.id,
          unitId: parseInt(unitId),
        },
      },
    });

    if (!unitProgress) {
      unitProgress = await prisma.unitProgress.create({
        data: {
          enrollmentId: enrollment.id,
          unitId: parseInt(unitId),
          userId,
          timeSpentMinutes: timeSpentMinutes || 0,
          lastPosition: lastPosition || null,
          completedAt: completed ? new Date() : null,
        },
      });
    } else {
      unitProgress = await prisma.unitProgress.update({
        where: { id: unitProgress.id },
        data: {
          timeSpentMinutes: {
            increment: timeSpentMinutes || 0,
          },
          lastPosition: lastPosition || undefined,
          completedAt: completed ? new Date() : unitProgress.completedAt,
        },
      });
    }

    await updateModuleAndCourseProgress(enrollment.id, module.courseId);

    res.status(200).json(unitProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateModuleAndCourseProgress(enrollmentId, courseId) {
  const modules = await prisma.courseModule.findMany({
    where: { courseId },
    include: {
      units: {
        select: { id: true },
      },
    },
  });

  for (const module of modules) {
    const unitIds = module.units.map((unit) => unit.id);

    if (unitIds.length === 0) continue;

    const unitProgress = await prisma.unitProgress.count({
      where: {
        enrollmentId,
        unitId: { in: unitIds },
        completedAt: { not: null },
      },
    });

    const progressPercentage = Math.round(
      (unitProgress / unitIds.length) * 100
    );

    await prisma.moduleProgress.upsert({
      where: {
        enrollmentId_moduleId: {
          enrollmentId,
          moduleId: module.id,
        },
      },
      update: {
        progressPercentage,
        completedAt: progressPercentage === 100 ? new Date() : null,
      },
      create: {
        enrollmentId,
        moduleId: module.id,
        userId: (
          await prisma.enrollment.findUnique({ where: { id: enrollmentId } })
        ).userId,
        progressPercentage,
        completedAt: progressPercentage === 100 ? new Date() : null,
      },
    });
  }

  const totalUnits = await prisma.contentUnit.count({
    where: {
      module: {
        courseId,
      },
    },
  });

  const completedUnits = await prisma.unitProgress.count({
    where: {
      enrollmentId,
      completedAt: { not: null },
      unit: {
        module: {
          courseId,
        },
      },
    },
  });

  const courseProgressPercentage =
    totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      progressPercentage: courseProgressPercentage,
      completionDate: courseProgressPercentage === 100 ? new Date() : null,
      status: courseProgressPercentage === 100 ? "COMPLETED" : "ACTIVE",
    },
  });
}

export const getAdminCourses = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    type,
    difficulty,
    search,
    isPublished,
    isFeatured,
  } = req.query;

  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause for filtering - admin sees all courses by default
    const where = {};

    // Apply filters if provided
    if (type) where.type = type;
    if (difficulty) where.difficulty = difficulty;

    // Handle published/unpublished filter
    if (isPublished === "true") where.isPublished = true;
    if (isPublished === "false") where.isPublished = false;

    // Handle featured filter
    if (isFeatured === "true") where.isFeatured = true;

    // Handle search
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    // Fetch courses and total count in parallel
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { id: "asc" },
        include: {
          instructor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImage: true,
            },
          },
          modules: {
            select: { id: true, title: true },
          },
          _count: {
            select: {
              enrollments: true,
              reviews: true,
              modules: true,
            },
          },
        },
      }),
      prisma.course.count({ where }),
    ]);

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    if (total === 0) {
      return res
        .status(404)
        .json({ message: "No courses found matching the criteria" });
    }

    // Return results with pagination info
    res.status(200).json({
      data: courses,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Admin courses fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch courses",
      details: error.message,
    });
  }
};

// Add a quick helper for toggling course publish status
export const toggleCoursePublish = async (req, res) => {
  const { id } = req.params;
  const { isPublished } = req.body;

  try {
    // Verify the user is an admin
    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Unauthorized. Admin access required." });
    }

    if (isPublished === undefined) {
      return res.status(400).json({ error: "isPublished field is required" });
    }

    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: { isPublished: Boolean(isPublished) },
    });

    res.status(200).json({
      message: isPublished
        ? "Course published successfully"
        : "Course unpublished successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all content units for a specific module
 * @route GET /api/modules/:moduleId/units
 */
export const getContentUnitsByModule = async (req, res) => {
  const { moduleId } = req.params;
  try {
    const units = await prisma.contentUnit.findMany({
      where: { moduleId: parseInt(moduleId) },
      orderBy: { order: "asc" }, // Assuming an 'order' field exists for sequencing
    });
    if (!units) {
      // Even if empty, it's not an error, just no units found
      return res.status(200).json([]);
    }
    res.status(200).json(units);
  } catch (error) {
    console.error("Error fetching content units:", error);
    res.status(500).json({ error: "Failed to retrieve content units" });
  }
};

/**
 * Get a single content unit by ID
 * @route GET /api/units/:id
 */
export const getContentUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const unit = await prisma.contentUnit.findUnique({
      where: { id: parseInt(id) },
      include: { attachments: true }, // Include attachments if needed
    });
    if (!unit) {
      return res.status(404).json({ error: "Content unit not found" });
    }
    res.status(200).json(unit);
  } catch (error) {
    console.error("Error fetching content unit:", error);
    res.status(500).json({ error: "Failed to retrieve content unit" });
  }
};

/**
 * Update a content unit
 * @route PUT /api/units/:id
 * @access Admin/Instructor only (middleware should handle)
 */
export const updateContentUnit = async (req, res) => {
  const { id } = req.params;
  // Destructure expected updatable fields from body
  const { title, order, contentType, videoUrl, content, duration } = req.body;

  try {
    const unit = await prisma.contentUnit.update({
      where: { id: parseInt(id) },
      data: {
        title,
        order,
        contentType,
        videoUrl,
        content,
        duration,
        // Add other updatable fields from your schema as needed
      },
    });
    res
      .status(200)
      .json({ message: "Content unit updated successfully", unit });
  } catch (error) {
    if (error.code === "P2025") {
      // Handle case where unit to update doesn't exist
      return res.status(404).json({ error: "Content unit not found" });
    }
    console.error("Error updating content unit:", error);
    res.status(500).json({ error: "Failed to update content unit" });
  }
};

/**
 * Delete a content unit
 * @route DELETE /api/units/:id
 * @access Admin/Instructor only (middleware should handle)
 */
export const deleteContentUnit = async (req, res) => {
  const { id } = req.params;
  try {
    // Add logic here if deleting a unit requires cascading deletes or updates
    // e.g., deleting related UnitProgress, attachments, etc.
    // For now, just deleting the unit itself.

    await prisma.contentUnit.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Content unit deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      // Handle case where unit to delete doesn't exist
      return res.status(404).json({ error: "Content unit not found" });
    }
    console.error("Error deleting content unit:", error);
    res.status(500).json({ error: "Failed to delete content unit" });
  }
};
