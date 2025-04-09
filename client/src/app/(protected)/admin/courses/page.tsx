/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { convertDate } from "@/utils/formatDate";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCheck,
  FiX,
  FiStar,
  FiUser,
  FiClock,
  FiPackage,
  FiChevronLeft,
  FiBarChart2,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { motion } from "framer-motion";
import DetailsDrawer from "./_components/DetailsDrawer";
import CourseFormModal from "./_components/CourseFormModal";
import DeleteConfirmationModal from "./_components/DeleteConfirmationModal";
import { Course } from "@/types";
import Pagination from "../../_components/Pagination";

import requestClient from "@/lib/requestClient";
import { useSession } from "next-auth/react";
import { NextAuthUserSession } from "@/types";

// Define course type based on our schema

const MotionBox = motion(Box);

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    overview: "",
    type: "PERSONAL_DEVELOPMENT",
    difficulty: "BEGINNER",
    durationHours: 0,
    instructorId: 0,
    isFeatured: false,
    isPublished: false,
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const toast = useToast();
  const addCourseModal = useDisclosure();
  const editCourseModal = useDisclosure();
  const deleteConfirmation = useDisclosure();
  const detailsDrawer = useDisclosure();

  const cardBg = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 }) || 4;

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const { data: sessionData } = useSession() as {
    data: NextAuthUserSession | null;
  };

  const fetchCourses = useCallback(
    async (page = currentPage) => {
      if (!sessionData?.user) return;

      setIsLoading(true);

      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: "10", // Adjust this if needed
        });

        // Add filter parameters if they exist
        if (searchQuery) queryParams.append("search", searchQuery);
        if (typeFilter) queryParams.append("type", typeFilter);
        if (difficultyFilter) queryParams.append("difficulty", difficultyFilter);

        // Handle status filters - make sure these match your API expectations
        if (statusFilter === "published") {
          queryParams.append("isPublished", "true");
        } else if (statusFilter === "draft") {
          queryParams.append("isPublished", "false");
        } else if (statusFilter === "featured") {
          queryParams.append("isFeatured", "true");
        }

        // Admin endpoint should return all courses regardless of published status
        // Add a specific parameter to override the default isPublished filter if needed
        // if (statusFilter === "") {
        //   queryParams.append("admin", "true");
        // }

        // Make the API call using requestClient with proper auth
        const response = await requestClient({
          token: sessionData?.user?.token,
        }).get(`/courses?${queryParams.toString()}`);

        // Check response structure and update state
        if (response.data) {
          // Update with correct property names from your API
          setCourses(response.data.courses || []);
          setFilteredCourses(response.data.courses || []);
          
          // Make sure these match your API response structure
          setTotalPages(response.data.pagination?.totalPages || 1);
          
          // Additional useful information if your API provides it
          if (response.data.pagination?.total) {
            setTotalCount(response.data.pagination.total);
          }
        }
      } catch (err: any) {
        console.error("Error fetching courses:", err);
        
        // Improved error handling with specific messages
        let errorMessage = "Failed to fetch courses";
        if (err.response?.status === 401) {
          errorMessage = "Your session has expired. Please log in again.";
        } else if (err.response?.status === 403) {
          errorMessage = "You don't have permission to view courses.";
        } else if (err.response?.data?.error) {
          errorMessage = err.response.data.error;
        }

        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });

        // Reset course data
        setCourses([]);
        setFilteredCourses([]);
      } finally {
        setIsLoading(false);
      }
    },
    [
      sessionData,
      searchQuery,
      typeFilter,
      difficultyFilter,
      statusFilter,
      currentPage,
    ]
  );

  useEffect(() => {
    if (sessionData?.user) {
      fetchCourses();
    }
  }, [
    fetchCourses,
    sessionData,
    currentPage,
    searchQuery,
    typeFilter,
    difficultyFilter,
    statusFilter,
  ]);

  useEffect(() => {
    let results = [...courses];

    if (searchQuery) {
      results = results.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (typeFilter) {
      results = results.filter((course) => course.type === typeFilter);
    }

    if (difficultyFilter) {
      results = results.filter(
        (course) => course.difficulty === difficultyFilter
      );
    }

    if (statusFilter === "published") {
      results = results.filter((course) => course.isPublished);
    } else if (statusFilter === "draft") {
      results = results.filter((course) => !course.isPublished);
    } else if (statusFilter === "featured") {
      results = results.filter((course) => course.isFeatured);
    }

    setFilteredCourses(results);
  }, [searchQuery, typeFilter, difficultyFilter, statusFilter, courses]);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "thumbnail" | "coverImage"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === "thumbnail") {
        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
      } else {
        setCoverImageFile(file);
        setCoverImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      overview: course.overview || "",
      type: course.type,
      difficulty: course.difficulty || "BEGINNER",
      durationHours: course.durationHours || 0,
      instructorId: course.instructor?.id || 0,
      isFeatured: course.isFeatured,
      isPublished: course.isPublished,
    });
    setThumbnailPreview(course.thumbnail || "");
    setCoverImagePreview(course.coverImage || "");
    editCourseModal.onOpen();
  };

  // Open delete confirmation
  const handleDeleteClick = (course: Course) => {
    setSelectedCourse(course);
    deleteConfirmation.onOpen();
  };

  // Open details drawer
  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    detailsDrawer.onOpen();
  };

  // Reset form data when adding a new course
  const handleAddCourseClick = () => {
    setSelectedCourse(null);
    setFormData({
      title: "",
      description: "",
      overview: "",
      type: "PERSONAL_DEVELOPMENT",
      difficulty: "BEGINNER",
      durationHours: 0,
      instructorId: 0,
      isFeatured: false,
      isPublished: false,
    });
    setThumbnailPreview("");
    setCoverImagePreview("");
    setThumbnailFile(null);
    setCoverImageFile(null);
    addCourseModal.onOpen();
  };

  // Handle form submission for create/update
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const formDataToSubmit = new FormData();

      // Add form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataToSubmit.append(key, value.toString());
        }
      });

      // Add file uploads if they exist
      if (thumbnailFile) {
        formDataToSubmit.append("thumbnail", thumbnailFile);
      }

      if (coverImageFile) {
        formDataToSubmit.append("coverImage", coverImageFile);
      }

      if (selectedCourse) {
        // Update existing course
        await requestClient({
          token: sessionData?.user?.token,
        }).put(`/courses/${selectedCourse.id}`, formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast({
          title: "Course updated",
          description: `"${formData.title}" has been successfully updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        editCourseModal.onClose();
      } else {
        // Create new course
        await requestClient({
          token: sessionData?.user?.token,
        }).post("/courses", formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast({
          title: "Course created",
          description: `"${formData.title}" has been successfully created.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        addCourseModal.onClose();
      }

      // Reload courses after successful operation
      fetchCourses();
    } catch (error: any) {
      console.error("Error submitting course:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.error ||
          "There was an error processing your request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle course deletion
  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;

    setIsLoading(true);

    try {
      await requestClient({
        token: sessionData?.user?.token,
      }).delete(`/courses/${selectedCourse.id}`);

      toast({
        title: "Course deleted",
        description: `"${selectedCourse.title}" has been successfully deleted.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      deleteConfirmation.onClose();

      // Refresh course list
      fetchCourses();
    } catch (error: any) {
      console.error("Error deleting course:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.error ||
          "There was an error deleting the course.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle publication status toggle
  const handleTogglePublish = async (course: Course) => {
    setIsLoading(true);

    try {
      await requestClient({
        token: sessionData?.user?.token,
      }).put(`/courses/${course.id}/publish`, {
        isPublished: !course.isPublished,
      });

      toast({
        title: !course.isPublished ? "Course published" : "Course unpublished",
        description: `"${course.title}" is now ${
          !course.isPublished ? "visible" : "hidden"
        } to students.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Refresh course list
      fetchCourses();
    } catch (error: any) {
      console.error("Error updating course status:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.error ||
          "There was an error updating the course status.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string = "BEGINNER") => {
    switch (difficulty) {
      case "BEGINNER":
        return "green";
      case "INTERMEDIATE":
        return "blue";
      case "ADVANCED":
        return "purple";
      case "EXPERT":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
      >
        <Heading size="md" color={textColor}>
          Course Management
        </Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="primary"
          size="sm"
          onClick={handleAddCourseClick}
        >
          Add New Course
        </Button>
      </Flex>

      {/* Filter and search controls */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr",
          lg: "3fr 1fr 1fr 1fr auto",
        }}
        gap={4}
        mb={8}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            fontSize="sm"
            onChange={(e) => setSearchQuery(e.target.value)}
            bg={cardBg}
            borderColor={borderColor}
          />
        </InputGroup>

        <Select
          placeholder="Filter by type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          bg={cardBg}
          borderColor={borderColor}
          fontSize="sm"
        >
          <option value="">All Types</option>
          <option value="TECH">Technology</option>
          <option value="FINANCIAL_LITERACY">Financial Literacy</option>
          <option value="LEADERSHIP">Leadership</option>
          <option value="ENTREPRENEURSHIP">Entrepreneurship</option>
          <option value="PERSONAL_DEVELOPMENT">Personal Development</option>
        </Select>

        <Select
          placeholder="Filter by difficulty"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          bg={cardBg}
          borderColor={borderColor}
          fontSize="sm"
        >
          <option value="">All Difficulties</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
          <option value="EXPERT">Expert</option>
        </Select>

        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          bg={cardBg}
          borderColor={borderColor}
          fontSize="sm"
        >
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="featured">Featured</option>
        </Select>

        <HStack>
          <Tooltip label="Grid View">
            <IconButton
              aria-label="Grid View"
              icon={<FiGrid />}
              variant={viewType === "grid" ? "solid" : "outline"}
              colorScheme={viewType === "grid" ? "primary" : "gray"}
              onClick={() => setViewType("grid")}
            />
          </Tooltip>
          <Tooltip label="List View">
            <IconButton
              aria-label="List View"
              icon={<FiList />}
              variant={viewType === "list" ? "solid" : "outline"}
              colorScheme={viewType === "list" ? "primary" : "gray"}
              onClick={() => setViewType("list")}
            />
          </Tooltip>
        </HStack>
      </Grid>

      {/* Course display */}
      {isLoading ? (
        <Flex justify="center" align="center" py={10}>
          <Spinner size="xl" color="primary.500" thickness="4px" />
        </Flex>
      ) : filteredCourses.length === 0 ? (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          borderWidth="1px"
          borderRadius="lg"
          p={8}
          borderColor={borderColor}
          bg={cardBg}
          textAlign="center"
        >
          <Box position="relative" w="200px" h="200px" mb={6} mx="auto">
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              bg="gray.100"
              borderRadius="full"
              w="180px"
              h="180px"
              opacity="0.6"
            />
            <Flex
              position="absolute"
              direction="column"
              align="center"
              justify="center"
              top="0"
              left="0"
              right="0"
              bottom="0"
            >
              <Icon as={FiPackage} boxSize={16} color="primary.400" mb={2} />
            </Flex>
          </Box>

          <Heading size="md" mb={2}>
            {searchQuery || typeFilter || difficultyFilter || statusFilter
              ? "No courses match your criteria"
              : "No courses found"}
          </Heading>
          <Text color={mutedTextColor} mb={4} fontSize="sm">
            {searchQuery || typeFilter || difficultyFilter || statusFilter
              ? "Try adjusting your search or filters."
              : "Get started by adding your first course."}
          </Text>
          <HStack spacing={4} justify="center">
            {(searchQuery ||
              typeFilter ||
              difficultyFilter ||
              statusFilter) && (
              <Button
                leftIcon={<FiChevronLeft />}
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("");
                  setDifficultyFilter("");
                  setStatusFilter("");
                }}
              >
                Clear Filters
              </Button>
            )}
          </HStack>
        </MotionBox>
      ) : viewType === "grid" ? (
        <SimpleGrid
          columns={columns}
          spacing={6}
          as={motion.div}
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {filteredCourses.map((course) => (
            <MotionBox
              key={course.id}
              variants={itemVariants}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg={cardBg}
              borderColor={borderColor}
              _hover={{
                transform: "translateY(-4px)",
                shadow: "lg",
                borderColor: "primary.300",
              }}
              role="group"
            >
              <Box position="relative" height="160px" overflow="hidden">
                <Image
                  src={
                    course.thumbnail ||
                    "https://via.placeholder.com/300x160?text=No+Image"
                  }
                  alt={course.title}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  fallbackSrc="https://via.placeholder.com/300x160?text=Loading..."
                />
                <Flex
                  position="absolute"
                  top={0}
                  right={0}
                  p={2}
                  transition="opacity 0.3s"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  bg="blackAlpha.700"
                  borderBottomLeftRadius="md"
                >
                  <Tooltip label="Edit Course">
                    <IconButton
                      aria-label="Edit"
                      icon={<FiEdit2 />}
                      size="sm"
                      colorScheme="blue"
                      mr={1}
                      onClick={() => handleEditCourse(course)}
                    />
                  </Tooltip>
                  <Tooltip label="Delete Course">
                    <IconButton
                      aria-label="Delete"
                      icon={<FiTrash2 />}
                      size="sm"
                      colorScheme="red"
                      mr={1}
                      onClick={() => handleDeleteClick(course)}
                    />
                  </Tooltip>
                  <Tooltip label="View Details">
                    <IconButton
                      aria-label="View Details"
                      icon={<FiEye />}
                      size="sm"
                      colorScheme="purple"
                      onClick={() => handleViewDetails(course)}
                    />
                  </Tooltip>
                </Flex>

                {/* Status indicators */}
                <Flex
                  position="absolute"
                  bottom={2}
                  left={2}
                  flexWrap="wrap"
                  gap={1}
                >
                  {course.isFeatured && (
                    <Badge
                      colorScheme="yellow"
                      rounded="full"
                      px={2}
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={FiStar} mr={1} boxSize={3} />
                      Featured
                    </Badge>
                  )}

                  <Badge
                    colorScheme={course.isPublished ? "green" : "gray"}
                    rounded="full"
                    px={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Icon
                      as={course.isPublished ? FiCheck : FiX}
                      mr={1}
                      boxSize={3}
                    />
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </Flex>
              </Box>

              <Box p={4}>
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <Heading size="md" noOfLines={2} mb={2} flex="1">
                    {course.title}
                  </Heading>
                </Flex>

                <Text color={mutedTextColor} fontSize="sm" noOfLines={2} mb={3}>
                  {course.description}
                </Text>

                <Flex wrap="wrap" gap={2} mb={3}>
                  <Badge colorScheme={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>

                  <Badge colorScheme="teal">
                    {course.type.replace(/_/g, " ")}
                  </Badge>
                </Flex>

                <HStack spacing={4} mt={2}>
                  <Flex align="center">
                    <Icon as={FiUser} color="primary.500" mr={1} />
                    <Text fontSize="sm" color={mutedTextColor}>
                      {course._count?.enrollments || 0}
                    </Text>
                  </Flex>

                  <Flex align="center">
                    <Icon as={FiClock} color="orange.500" mr={1} />
                    <Text fontSize="sm" color={mutedTextColor}>
                      {course.durationHours || 0}h
                    </Text>
                  </Flex>

                  <Flex align="center">
                    <Icon as={FiBarChart2} color="purple.500" mr={1} />
                    <Text fontSize="sm" color={mutedTextColor}>
                      {course._count?.modules || 0}
                    </Text>
                  </Flex>
                </HStack>
              </Box>

              <Divider borderColor={borderColor} />

              <Flex p={3} justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontSize="xs" color={mutedTextColor}>
                    Updated {convertDate(course.updatedAt)}
                  </Text>
                </Box>

                <Switch
                  isChecked={course.isPublished}
                  onChange={() => handleTogglePublish(course)}
                  colorScheme="green"
                  size="sm"
                />
              </Flex>
            </MotionBox>
          ))}
        </SimpleGrid>
      ) : (
        // List view
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg={cardBg}
          borderColor={borderColor}
          as={motion.div}
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {filteredCourses.map((course, index) => (
            <MotionBox
              key={course.id}
              variants={itemVariants}
              borderBottomWidth={
                index < filteredCourses.length - 1 ? "1px" : "0"
              }
              borderColor={borderColor}
              p={4}
              _hover={{ bg: cardHoverBg }}
            >
              <Flex direction={{ base: "column", md: "row" }} gap={4}>
                {/* Thumbnail */}
                <Box
                  width={{ base: "100%", md: "180px" }}
                  height={{ base: "120px", md: "100px" }}
                  flexShrink={0}
                  position="relative"
                >
                  <Image
                    src={
                      course.thumbnail ||
                      "https://via.placeholder.com/180x100?text=No+Image"
                    }
                    alt={course.title}
                    borderRadius="md"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    fallbackSrc="https://via.placeholder.com/180x100?text=Loading..."
                  />
                  {course.isFeatured && (
                    <Badge
                      position="absolute"
                      top={2}
                      left={2}
                      colorScheme="yellow"
                      rounded="full"
                      px={2}
                    >
                      Featured
                    </Badge>
                  )}
                </Box>

                {/* Content */}
                <Box flex="1">
                  <Flex justifyContent="space-between" alignItems="flex-start">
                    <Heading size="md" mb={1}>
                      {course.title}
                    </Heading>

                    <Badge
                      colorScheme={course.isPublished ? "green" : "gray"}
                      ml={2}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </Flex>

                  <Text
                    fontSize="sm"
                    color={mutedTextColor}
                    mb={2}
                    noOfLines={2}
                  >
                    {course.description}
                  </Text>

                  <Flex wrap="wrap" gap={2} mb={2}>
                    <Badge colorScheme={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>

                    <Badge colorScheme="teal">
                      {course.type.replace(/_/g, " ")}
                    </Badge>

                    <Flex align="center">
                      <Icon
                        as={FiUser}
                        color="primary.500"
                        mr={1}
                        boxSize={3}
                      />
                      <Text fontSize="xs" fontWeight="medium">
                        {course._count?.enrollments || 0} enrolled
                      </Text>
                    </Flex>

                    <Flex align="center">
                      <Icon
                        as={FiClock}
                        color="orange.500"
                        mr={1}
                        boxSize={3}
                      />
                      <Text fontSize="xs" fontWeight="medium">
                        {course.durationHours || 0} hours
                      </Text>
                    </Flex>
                  </Flex>
                </Box>

                {/* Actions */}
                <Flex
                  alignItems="center"
                  justifyContent={{ base: "flex-end", md: "center" }}
                  mt={{ base: 2, md: 0 }}
                >
                  <Tooltip label="Edit Course">
                    <IconButton
                      aria-label="Edit"
                      icon={<FiEdit2 />}
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      mr={1}
                      onClick={() => handleEditCourse(course)}
                    />
                  </Tooltip>
                  <Tooltip label="Delete Course">
                    <IconButton
                      aria-label="Delete"
                      icon={<FiTrash2 />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      mr={1}
                      onClick={() => handleDeleteClick(course)}
                    />
                  </Tooltip>
                  <Tooltip label="View Details">
                    <IconButton
                      aria-label="View Details"
                      icon={<FiEye />}
                      size="sm"
                      colorScheme="purple"
                      variant="ghost"
                      mr={1}
                      onClick={() => handleViewDetails(course)}
                    />
                  </Tooltip>
                  <Tooltip label={course.isPublished ? "Unpublish" : "Publish"}>
                    <IconButton
                      aria-label={course.isPublished ? "Unpublish" : "Publish"}
                      icon={course.isPublished ? <FiCheck /> : <FiX />}
                      size="sm"
                      colorScheme={course.isPublished ? "green" : "gray"}
                      variant="ghost"
                      onClick={() => handleTogglePublish(course)}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            </MotionBox>
          ))}
        </Box>
      )}

      {/* Pagination controls */}
      {filteredCourses.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCount}
          showingItems={filteredCourses.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          colorScheme="primary"
          size="sm"
          isLoading={isLoading}
          showArrows={true}
          showFirstLast={true}
          maxDisplayedPages={5}
        />
      )}

      {/* Add Course Modal */}
      <CourseFormModal
        isOpen={addCourseModal.isOpen}
        onClose={addCourseModal.onClose}
        formData={formData}
        handleFormChange={handleFormChange}
        handleCheckboxChange={handleCheckboxChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isEditMode={false}
        thumbnailPreview={thumbnailPreview}
        coverImagePreview={coverImagePreview}
      />

      {/* Edit Course Modal */}
      <CourseFormModal
        isOpen={editCourseModal.isOpen}
        onClose={editCourseModal.onClose}
        formData={formData}
        handleFormChange={handleFormChange}
        handleCheckboxChange={handleCheckboxChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isEditMode={true}
        thumbnailPreview={thumbnailPreview}
        coverImagePreview={coverImagePreview}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={deleteConfirmation.onClose}
        selectedCourse={selectedCourse}
        handleDeleteCourse={handleDeleteCourse}
        isLoading={isLoading}
      />

      {/* Course Details Drawer */}
      <DetailsDrawer
        isOpen={detailsDrawer.isOpen}
        onClose={detailsDrawer.onClose}
        selectedCourse={selectedCourse}
        handleEditCourse={handleEditCourse}
      />
    </Container>
  );
};

export default AdminCoursesPage;
