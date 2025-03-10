"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import ProgramCard from "../../_components/ProgramCard";
import requestClient from "@/lib/requestClient";

interface Course {
  id: number;
  title: string;
  image: string;
  description: string;
  programs: string[];
  statusType: "PENDING" | "ACTIVE" | "COMPLETED";
  enrollDate?: string;
}

const TeensCoursesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isPending, startTransition] = useTransition();

  // Fetch Courses from API
  const fetchCourses = useCallback(() => {
    startTransition(async () => {
      try {
        const response = await requestClient().get("/courses");
        if (!response.data) {
          return;
        }
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    });
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    onOpen();
  };

  return (
    <Box p={6}>
      <Box pb={6}>
        <Heading size="lg" mb={6}>
          My Learning Path and Courses
        </Heading>

        {isPending ? (
          <Text>Loading courses...</Text>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            {courses.map((course) => (
              <ProgramCard
                key={course.id}
                image={course.image}
                title={course.title}
                programs={course.programs}
                statusType={course.statusType}
                enrollDate={course.enrollDate}
                description={course.description}
                onEnroll={() => handleCourseClick(course)}
              />
            ))}
          </Grid>
        )}

        {/* Course Modal */}
        {selectedCourse && (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedCourse.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  boxSize="120px"
                  mx="auto"
                  mb={4}
                />
                <Text>{selectedCourse.description}</Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => alert(`Enrolled in ${selectedCourse.title}`)}
                >
                  Enroll Now
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>

      <Box>
        <Heading size="lg" mb={6}>
          Featured Courses and Programs
        </Heading>

        {isPending ? (
          <Text>Loading courses...</Text>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            {courses.map((course) => (
              <ProgramCard
                key={course.id}
                image={course.image}
                title={course.title}
                programs={course.programs}
                statusType={course.statusType}
                enrollDate={course.enrollDate}
                description={course.description}
                onEnroll={() => handleCourseClick(course)}
              />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default TeensCoursesPage;
