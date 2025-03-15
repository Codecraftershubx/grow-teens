/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Box, Grid, Heading, Text, useDisclosure } from "@chakra-ui/react";
import ProgramCard from "../../_components/ProgramCard";
import requestClient from "@/lib/requestClient";
import { useSession } from "next-auth/react";
import { NextAuthUserSession } from "@/types";
import EnrollCourseModal from "../_components/EnrollCourseModal";

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
  const [enrolledProgram, setEnrolledProgram] = useState<any | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isPending, startTransition] = useTransition();

  const session = useSession();
  const sessionData = session.data as NextAuthUserSession;

  // Fetch Courses from API
  const fetchCourses = useCallback(() => {
    startTransition(async () => {
      try {
        const response = await requestClient({
          token: sessionData?.user?.token,
        }).get("/programs");
        if (!response.data) {
          return;
        }
        setCourses(response.data?.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    });
  }, [sessionData?.user?.token]);

  const fetchEnrolledProgram = useCallback((userId: any) => {
    startTransition(async () => {
      try {
        const response = await requestClient({
          token: sessionData?.user?.token,
        }).get(`/enrollments/${userId}`);
        if (!response.data) {
          return;
        }
        setEnrolledProgram(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    });
  }, [sessionData?.user?.token]);

  useEffect(() => {
    if (sessionData?.user) {
      fetchCourses();
    }
  }, [fetchCourses, sessionData]);

  useEffect(() => {
    if (sessionData?.user) {
      fetchEnrolledProgram(Number(sessionData?.user?.id));
    }
  }, [fetchEnrolledProgram, sessionData]);

  console.log("Enrolled Programs ", enrolledProgram);

  console.log("Programs ", courses);

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
          <>
            {enrolledProgram?.length === 0 && (
              <Text>No enrolled programs available</Text>
            )}
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {enrolledProgram &&
                enrolledProgram.map((program: any) => {
                  const programData = program.program;
                  return (
                    <ProgramCard
                      key={program.id}
                      id={program.programId}
                      programs={program}
                      image={programData.image}
                      title={programData.title}
                      statusType={program.statusType}
                      description={programData.description}
                      onEnroll={() => handleCourseClick(programData)}
                    />
                  );
                })}
            </Grid>
          </>
        )}
      </Box>

      <Box>
        <Heading size="lg" mb={6}>
          Featured Courses and Programs
        </Heading>

        {isPending ? (
          <Text>Loading courses...</Text>
        ) : (
          <>
            {courses?.length === 0 && <Text>No courses available</Text>}

            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {courses.map((course) => (
                <ProgramCard
                  key={course.id}
                  id={course.id}
                  image={course.image}
                  title={course.title}
                  statusType={course.statusType}
                  enrollDate={course.enrollDate}
                  description={course.description}
                  onEnroll={() => handleCourseClick(course)}
                />
              ))}
            </Grid>
          </>
        )}
      </Box>

      {/* Course Modal */}
      {selectedCourse && (
        <EnrollCourseModal
          isOpen={isOpen}
          onClose={onClose}
          selectedCourse={selectedCourse}
        />
      )}
    </Box>
  );
};

export default TeensCoursesPage;
