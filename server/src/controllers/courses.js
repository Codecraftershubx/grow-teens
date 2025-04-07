import prisma from "../prismaClient.js";

export const createCourse = async (req, res) => {
  const { title, description, type, difficulty, instructorId, overview, durationHours } = req.body;
  
  try {
    const slug = title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    
    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        overview,
        type: type || "PERSONAL_DEVELOPMENT",
        difficulty: difficulty || "BEGINNER",
        instructorId: instructorId ? parseInt(instructorId) : null,
        durationHours: durationHours ? parseInt(durationHours) : null,
        thumbnail: req.cloudinaryUrl || null,
        coverImage: req.coverImageUrl || null,
      },
    });
    
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourses = async (req, res) => {
  const { page = 1, limit = 10, type, difficulty, search, featured } = req.query;
  
  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {
      isPublished: true,
    };
    
    if (type) where.type = type;
    if (difficulty) where.difficulty = difficulty;
    if (featured === 'true') where.isFeatured = true;
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
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
            select: { enrollments: true, reviews: true },
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
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
          orderBy: { orderNumber: 'asc' },
          include: {
            _count: {
              select: { units: true, quizzes: true, exercises: true },
            },
          },
        },
        learningOutcomes: {
          orderBy: { orderNumber: 'asc' },
        },
        requirements: {
          orderBy: { orderNumber: 'asc' },
        },
        tags: true,
        _count: {
          select: { enrollments: true, reviews: true },
        },
      },
    });
    
    if (!course) return res.status(404).json({ error: "Course not found" });
    
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, type, difficulty, instructorId, overview, durationHours, isPublished, isFeatured } = req.body;
  
  try {
    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        overview,
        type,
        difficulty,
        instructorId: instructorId ? parseInt(instructorId) : undefined,
        durationHours: durationHours ? parseInt(durationHours) : undefined,
        thumbnail: req.cloudinaryUrl || undefined,
        coverImage: req.coverImageUrl || undefined,
        isPublished,
        isFeatured,
      },
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
  const { title, description, courseId, estimatedHours, orderNumber } = req.body;
  
  try {
    if (!title || !courseId) {
      return res.status(400).json({ error: "Title and course ID are required" });
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
  const { title, description, estimatedHours, isPublished, orderNumber } = req.body;
  
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
          orderBy: { orderNumber: 'asc' },
        },
        quizzes: {
          orderBy: { orderNumber: 'asc' },
        },
        exercises: {
          orderBy: { orderNumber: 'asc' },
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
        orderBy: { orderNumber: 'asc' },
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
  const { title, description, moduleId, contentType, textContent, videoUrl, audioUrl, externalUrl, estimatedMinutes, orderNumber } = req.body;
  
  try {
    if (!title || !moduleId || !contentType) {
      return res.status(400).json({ error: "Title, module ID, and content type are required" });
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
  const userId = req.user.id;
  
  try {
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: parseInt(courseId),
        }
      }
    });
    
    if (existingEnrollment) {
      if (existingEnrollment.status === 'UNENROLLED') {
        const updatedEnrollment = await prisma.enrollment.update({
          where: { id: existingEnrollment.id },
          data: {
            status: 'ACTIVE',
            enrollmentDate: new Date(),
            unenrollmentDate: null,
            unenrollmentReason: null,
          }
        });
        return res.status(200).json({ message: "Re-enrolled successfully", enrollment: updatedEnrollment });
      }
      return res.status(400).json({ error: "You are already enrolled in this course" });
    }
    
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId: parseInt(courseId),
        status: 'ACTIVE',
      },
    });
    
    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
        }
      }
    });
    
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }
    
    if (enrollment.status === 'UNENROLLED') {
      return res.status(400).json({ error: "You are already unenrolled from this course" });
    }
    
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        status: 'UNENROLLED',
        unenrollmentDate: new Date(),
        unenrollmentReason: reason,
      }
    });
    
    res.status(200).json({ message: "Unenrolled successfully", enrollment: updatedEnrollment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrolledCourses = async (req, res) => {
  const userId = req.user.id;
  const { status = 'ACTIVE' } = req.query;
  
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId,
        status,
      },
      include: {
        course: {
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
              select: { modules: true },
            },
          },
        },
      },
    });
    
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
        }
      }
    });
    
    if (!enrollment) {
      return res.status(404).json({ error: "You are not enrolled in this course" });
    }
    
    let unitProgress = await prisma.unitProgress.findUnique({
      where: {
        enrollmentId_unitId: {
          enrollmentId: enrollment.id,
          unitId: parseInt(unitId),
        }
      }
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
    const unitIds = module.units.map(unit => unit.id);
    
    if (unitIds.length === 0) continue;
    
    const unitProgress = await prisma.unitProgress.count({
      where: {
        enrollmentId,
        unitId: { in: unitIds },
        completedAt: { not: null },
      },
    });
    
    const progressPercentage = Math.round((unitProgress / unitIds.length) * 100);
    
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
        userId: (await prisma.enrollment.findUnique({ where: { id: enrollmentId } })).userId,
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
  
  const courseProgressPercentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
  
  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      progressPercentage: courseProgressPercentage,
      completionDate: courseProgressPercentage === 100 ? new Date() : null,
      status: courseProgressPercentage === 100 ? 'COMPLETED' : 'ACTIVE',
    },
  });
}
