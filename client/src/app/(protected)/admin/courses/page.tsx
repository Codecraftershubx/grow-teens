"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
  Badge,
  Divider,
  HStack,
  useBreakpointValue,
  IconButton,
  Switch,
} from "@chakra-ui/react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiStar,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { motion } from "framer-motion";
import DetailsDrawer from "./_components/DetailsDrawer";
import CourseFormModal from "./_components/CourseFormModal";
import DeleteConfirmationModal from "./_components/DeleteConfirmationModal";
import { Course, NextAuthUserSession } from "@/types";
import Pagination from "../../_components/Pagination";

import { courseService, AdminCourseListParams } from "@/services/api";

import { useSession } from "next-auth/react";

const MotionBox = motion(Box);

// Define the FormData type based on CourseFormModal
interface CourseFormData {
  title: string;
  description: string;
  overview: string;
  type: string;
  difficulty: string;
  durationHours: number;
  instructorId: number; // Or maybe fetch/select instructor?
  isFeatured: number; // Changed to number
  isPublished: number; // Changed to number
  // Add any other fields your form manages
}

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // == Re-added Form State ==
  const initialFormData: CourseFormData = {
    title: "",
    description: "",
    overview: "",
    type: "PERSONAL_DEVELOPMENT", // Default type
    difficulty: "BEGINNER", // Default difficulty
    durationHours: 0,
    instructorId: 0, // How is instructor assigned? Needs logic.
    isFeatured: 0, // Changed to 0
    isPublished: 0, // Changed to 0
  };
  const [formData, setFormData] = useState<CourseFormData>(initialFormData);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  // =======================

  const toast = useToast();
  const courseFormModal = useDisclosure();
  const deleteConfirmation = useDisclosure();
  const detailsDrawer = useDisclosure();

  const cardBg = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 }) || 4;

  const listVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const { data: sessionData } = useSession() as {
    data: NextAuthUserSession | null;
  };
  const token = sessionData?.user?.token;

  const fetchCourses = useCallback(
    async (page = 1) => {
      if (!token) return;

      setIsLoading(true);
      setCurrentPage(page);

      try {
        const params: AdminCourseListParams = {
          page: page,
          limit: 10,
        };
        if (searchQuery) params.search = searchQuery;
        if (typeFilter) params.type = typeFilter;
        if (difficultyFilter) params.difficulty = difficultyFilter;

        if (statusFilter === "published") params.isPublished = true;
        else if (statusFilter === "draft") params.isPublished = false;
        else if (statusFilter === "featured") params.isFeatured = true;

        const response = await courseService.getAdminCourses(token, params);

        setCourses(response?.data?.data || []);
        setTotalPages(response?.data?.pagination?.totalPages || 1);
      } catch (err: any) {
        console.error("Error fetching courses:", err);
        toast({
          title: "Error Fetching Courses",
          description: err.message || "Could not load course data.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setCourses([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    },
    [token, searchQuery, typeFilter, difficultyFilter, statusFilter]
  );

  useEffect(() => {
    if (token) {
      fetchCourses(1);
    }
  }, [fetchCourses, token]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value);
    };

  const handlePageChange = (newPage: number) => {
    fetchCourses(newPage);
  };

  // == Re-added Form Handlers ==
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    // Handle number conversion for relevant fields
    const newValue =
      name === "durationHours" || name === "instructorId"
        ? parseInt(value, 10) || 0
        : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 })); // Set 1 or 0
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "thumbnail" | "coverImage"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      if (type === "thumbnail") {
        setThumbnailFile(file);
        setThumbnailPreview(previewUrl);
      } else {
        setCoverImageFile(file);
        setCoverImagePreview(previewUrl);
      }
    } else {
      // Handle file removal
      if (type === "thumbnail") {
        setThumbnailFile(null);
        setThumbnailPreview("");
      } else {
        setCoverImageFile(null);
        setCoverImagePreview("");
      }
    }
  };
  // ==========================

  const handleAddCourseClick = () => {
    setSelectedCourse(null);
    setIsEditMode(false);
    setFormData(initialFormData); // Reset form
    setThumbnailFile(null);
    setCoverImageFile(null);
    setThumbnailPreview("");
    setCoverImagePreview("");
    courseFormModal.onOpen();
  };

  const handleEditCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsEditMode(true);
    // Populate form with selected course data
    setFormData({
      title: course.title || "",
      description: course.description || "",
      overview: course.overview || "",
      type: course.type || "PERSONAL_DEVELOPMENT",
      difficulty: course.difficulty || "BEGINNER",
      durationHours: course.durationHours || 0,
      instructorId: course.instructor?.id || 0, // Adjust if needed
      isFeatured: course.isFeatured ? 1 : 0, // Convert boolean to 1/0
      isPublished: course.isPublished ? 1 : 0, // Convert boolean to 1/0
    });
    setThumbnailFile(null); // Don't re-upload existing files unless changed
    setCoverImageFile(null);
    setThumbnailPreview(course.thumbnail || "");
    setCoverImagePreview(course.coverImage || "");
    courseFormModal.onOpen();
  };

  const handleViewDetailsClick = (course: Course) => {
    setSelectedCourse(course);
    detailsDrawer.onOpen();
  };

  const handleDeleteClick = (course: Course) => {
    setSelectedCourse(course);
    deleteConfirmation.onOpen();
  };

  const handleCourseFormSubmit = async () => {
    if (!token) return;
    setIsSubmitting(true);

    const dataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (value instanceof File) {
        dataToSubmit.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          dataToSubmit.append(key, String(item));
        });
      } else {
        dataToSubmit.append(key, String(value));
      }
    });

    if (thumbnailFile) {
      dataToSubmit.append("thumbnail", thumbnailFile);
    }
    if (coverImageFile) {
      dataToSubmit.append("coverImage", coverImageFile);
    }

    try {
      if (isEditMode && selectedCourse) {
        // Assuming updateCourse accepts FormData
        await courseService.updateCourse(
          token,
          selectedCourse.id,
          dataToSubmit
        );
        toast({
          title: "Success",
          description: "Course updated successfully.",
          status: "success",
        });
      } else {
        // Assuming createCourse accepts FormData
        await courseService.createCourse(token, dataToSubmit);
        toast({
          title: "Success",
          description: "Course created successfully.",
          status: "success",
        });
      }
      courseFormModal.onClose();
      fetchCourses(isEditMode ? currentPage : 1);
    } catch (err: any) {
      console.error("Error submitting course:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to save course.",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCourse || !token) return;
    setIsDeleting(true);
    try {
      await courseService.deleteCourse(token, selectedCourse.id);
      toast({
        title: "Success",
        description: "Course deleted successfully.",
        status: "success",
      });
      deleteConfirmation.onClose();
      const newPage =
        courses.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
      fetchCourses(newPage);
      setSelectedCourse(null);
    } catch (err: any) {
      console.error("Error deleting course:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to delete course.",
        status: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async (course: Course) => {
    if (!token) return;
    setIsToggling(course.id);
    try {
      const updatedStatus = !course.isPublished;
      await courseService.togglePublish(token, course.id, {
        isPublished: updatedStatus,
      });
      toast({
        title: "Success",
        description: `Course ${updatedStatus ? "published" : "unpublished"}.`,
        status: "success",
        duration: 3000,
      });
      fetchCourses(currentPage);
    } catch (err: any) {
      console.error("Error toggling publish status:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to update status.",
        status: "error",
      });
    } finally {
      setIsToggling(null);
    }
  };

  const getDifficultyColor = (difficulty: string = "BEGINNER") => {
    switch (difficulty?.toUpperCase()) {
      case "BEGINNER":
        return "green";
      case "INTERMEDIATE":
        return "orange";
      case "ADVANCED":
        return "red";
      case "EXPERT":
        return "purple";
      default:
        return "gray";
    }
  };

  const renderCourseGrid = () => (
    <MotionBox variants={listVariants} initial="hidden" animate="show">
      <SimpleGrid columns={columns} spacing={6}>
        {courses.map((course) => (
          <MotionBox
            key={course.id}
            variants={itemVariants}
            bg={cardBg}
            border="1px"
            borderColor={borderColor}
            borderRadius="lg"
            overflow="hidden"
            _hover={{
              boxShadow: "md",
              bg: cardHoverBg,
              transform: "translateY(-2px)",
            }}
          >
            <Image
              src={course.thumbnail || "/placeholder-image.png"}
              alt={course.title}
              h="150px"
              w="full"
              objectFit="cover"
            />
            <Box p={4}>
              <HStack justify="space-between" align="start" mb={2}>
                <Heading size="sm" noOfLines={2}>
                  {course.title}
                </Heading>
                <Badge
                  colorScheme={course.isPublished ? "green" : "yellow"}
                  fontSize="xs"
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </HStack>
              <Text fontSize="xs" color={mutedTextColor} mb={1}>
                Instructor: {course.instructor?.firstName}{" "}
                {course.instructor?.lastName || "N/A"}
              </Text>
              <HStack spacing={2} mb={2}>
                <Badge
                  colorScheme={getDifficultyColor(
                    course.difficulty || "BEGINNER"
                  )}
                  fontSize="xs"
                >
                  {course.difficulty || "BEGINNER"}
                </Badge>
                <Badge colorScheme="blue" fontSize="xs">
                  {course.type || "N/A"}
                </Badge>
                {course.isFeatured && (
                  <Badge colorScheme="purple" fontSize="xs">
                    Featured
                  </Badge>
                )}
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} noOfLines={3} mb={3}>
                {course.description}
              </Text>
              <Divider my={3} />
              <Flex justify="space-between" align="center">
                <Tooltip label="Toggle Publish Status" hasArrow>
                  <Switch
                    colorScheme="green"
                    isChecked={course.isPublished}
                    onChange={() => handleTogglePublish(course)}
                    isDisabled={isToggling === course.id}
                    size="sm"
                  />
                </Tooltip>
                <HStack spacing={1}>
                  <Tooltip label="View Details" hasArrow>
                    <IconButton
                      icon={<FiEye />}
                      size="xs"
                      variant="ghost"
                      aria-label="View Details"
                      onClick={() => handleViewDetailsClick(course)}
                    />
                  </Tooltip>
                  <Tooltip label="Edit Course" hasArrow>
                    <IconButton
                      icon={<FiEdit2 />}
                      size="xs"
                      variant="ghost"
                      aria-label="Edit Course"
                      onClick={() => handleEditCourseClick(course)}
                    />
                  </Tooltip>
                  <Tooltip label="Delete Course" hasArrow>
                    <IconButton
                      icon={<FiTrash2 />}
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Delete Course"
                      onClick={() => handleDeleteClick(course)}
                    />
                  </Tooltip>
                </HStack>
              </Flex>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>
    </MotionBox>
  );

  const renderCourseList = () => (
    <MotionBox
      variants={listVariants}
      initial="hidden"
      animate="show"
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
    >
      <Grid
        templateColumns="minmax(100px, 3fr) repeat(5, 1fr) auto"
        gap={4}
        p={4}
        borderBottomWidth="1px"
        borderColor={borderColor}
        alignItems="center"
        fontWeight="bold"
        fontSize="sm"
        color={mutedTextColor}
      >
        <Text>Title</Text>
        <Text>Instructor</Text>
        <Text>Type</Text>
        <Text>Difficulty</Text>
        <Text>Enrollments</Text>
        <Text>Status</Text>
        <Text>Actions</Text>
      </Grid>
      {courses.map((course) => (
        <MotionBox
          key={course.id}
          variants={itemVariants}
          _hover={{ bg: cardHoverBg }}
        >
          <Grid
            templateColumns="minmax(100px, 3fr) repeat(5, 1fr) auto"
            gap={4}
            p={4}
            borderBottomWidth="1px"
            borderColor={borderColor}
            alignItems="center"
            fontSize="sm"
          >
            <Tooltip label={course.title} placement="top-start" hasArrow>
              <Text fontWeight="medium" noOfLines={1}>
                {course.title}
              </Text>
            </Tooltip>
            <Text noOfLines={1}>
              {course.instructor?.firstName}{" "}
              {course.instructor?.lastName || "N/A"}
            </Text>
            <Text>
              <Badge colorScheme="blue" fontSize="xs">
                {course.type || "N/A"}
              </Badge>
            </Text>
            <Text>
              <Badge
                colorScheme={getDifficultyColor(
                  course.difficulty || "BEGINNER"
                )}
                fontSize="xs"
              >
                {course.difficulty || "BEGINNER"}
              </Badge>
            </Text>
            <Text>{course._count?.enrollments ?? 0}</Text>
            <Flex align="center">
              <Tooltip
                label={course.isPublished ? "Published" : "Draft"}
                hasArrow
              >
                <Switch
                  colorScheme="green"
                  isChecked={course.isPublished}
                  onChange={() => handleTogglePublish(course)}
                  isDisabled={isToggling === course.id}
                  size="sm"
                  mr={2}
                />
              </Tooltip>
              {course.isFeatured && (
                <Icon as={FiStar} color="purple.500" title="Featured" />
              )}
            </Flex>
            <HStack spacing={1} justifySelf="end">
              <Tooltip label="View Details" hasArrow>
                <IconButton
                  icon={<FiEye />}
                  size="xs"
                  variant="ghost"
                  aria-label="View Details"
                  onClick={() => handleViewDetailsClick(course)}
                />
              </Tooltip>
              <Tooltip label="Edit Course" hasArrow>
                <IconButton
                  icon={<FiEdit2 />}
                  size="xs"
                  variant="ghost"
                  aria-label="Edit Course"
                  onClick={() => handleEditCourseClick(course)}
                />
              </Tooltip>
              <Tooltip label="Delete Course" hasArrow>
                <IconButton
                  icon={<FiTrash2 />}
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  aria-label="Delete Course"
                  onClick={() => handleDeleteClick(course)}
                />
              </Tooltip>
            </HStack>
          </Grid>
        </MotionBox>
      ))}
    </MotionBox>
  );

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
        <Heading size="lg">Manage Courses</Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          onClick={handleAddCourseClick}
        >
          Add New Course
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={4} mb={6}>
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={handleSearchChange}
            borderRadius="md"
          />
        </InputGroup>
        <Select
          placeholder="All Types"
          size="sm"
          value={typeFilter}
          onChange={handleFilterChange(setTypeFilter)}
          borderRadius="md"
        >
          <option value="PERSONAL_DEVELOPMENT">Personal Development</option>
          <option value="STEM">STEM</option>
          <option value="ARTS">Arts</option>
          <option value="LIFE_SKILLS">Life Skills</option>
        </Select>
        <Select
          placeholder="All Difficulties"
          size="sm"
          value={difficultyFilter}
          onChange={handleFilterChange(setDifficultyFilter)}
          borderRadius="md"
        >
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
          <option value="EXPERT">Expert</option>
        </Select>
        <Select
          placeholder="All Statuses"
          size="sm"
          value={statusFilter}
          onChange={handleFilterChange(setStatusFilter)}
          borderRadius="md"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="featured">Featured</option>
        </Select>
        <HStack justify={{ base: "flex-start", lg: "flex-end" }}>
          <Tooltip label="Grid View" hasArrow>
            <IconButton
              icon={<FiGrid />}
              aria-label="Grid View"
              variant={viewType === "grid" ? "solid" : "ghost"}
              colorScheme={viewType === "grid" ? "blue" : "gray"}
              onClick={() => setViewType("grid")}
              size="sm"
            />
          </Tooltip>
          <Tooltip label="List View" hasArrow>
            <IconButton
              icon={<FiList />}
              aria-label="List View"
              variant={viewType === "list" ? "solid" : "ghost"}
              colorScheme={viewType === "list" ? "blue" : "gray"}
              onClick={() => setViewType("list")}
              size="sm"
            />
          </Tooltip>
        </HStack>
      </SimpleGrid>

      {isLoading ? (
        <Flex justify="center" align="center" minH="300px">
          <Spinner size="xl" />
        </Flex>
      ) : courses.length > 0 ? (
        <>
          {viewType === "grid" ? renderCourseGrid() : renderCourseList()}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Text textAlign="center" mt={10} color={mutedTextColor}>
          No courses found matching your criteria.
        </Text>
      )}

      <CourseFormModal
        isOpen={courseFormModal.isOpen}
        onClose={courseFormModal.onClose}
        formData={formData}
        handleFormChange={handleFormChange}
        handleCheckboxChange={handleCheckboxChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleCourseFormSubmit}
        isLoading={isSubmitting}
        isEditMode={isEditMode}
        thumbnailPreview={thumbnailPreview}
        coverImagePreview={coverImagePreview}
      />

      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={deleteConfirmation.onClose}
        handleDeleteCourse={handleConfirmDelete}
        selectedCourse={selectedCourse}
        isLoading={isDeleting}
      />

      <DetailsDrawer
        isOpen={detailsDrawer.isOpen}
        onClose={detailsDrawer.onClose}
        selectedCourse={selectedCourse}
        handleEditCourse={handleEditCourseClick}
      />
    </Container>
  );
};

export default AdminCoursesPage;
