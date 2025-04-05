/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Avatar,
  SimpleGrid,
  VStack,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

import requestClient from "@/lib/requestClient";
import { useSession } from "next-auth/react";
import { NextAuthUserSession } from "@/types";

interface OverviewItem {
  id: number;
  title: string;
  value: string;
}

const Dashboard = () => {

  const [enrolled, setEnrolled] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();

  const session = useSession();
  const sessionData = session.data as NextAuthUserSession;

  const fetchEnrolled = useCallback(() => {
    startTransition(async () => {
      try {
        const response = await requestClient({
          token: sessionData?.user?.token,
        }).get("/programs");
        if (!response.data) {
          return;
        }
        setEnrolled(response.data?.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    });
  }, [sessionData?.user?.token]);

  console.log(enrolled, isPending);

    useEffect(() => {
      if (sessionData?.user) {
        fetchEnrolled();
      }
    }, [fetchEnrolled, sessionData]);

  const dailyTip =
    "Remember to take short breaks during study sessions to improve focus!";

  const overview: OverviewItem[] = [
    { id: 1, title: "Courses Enrolled", value: "2" },
    { id: 2, title: "Completed Modules", value: "0" },
    { id: 3, title: "Upcoming Deadlines", value: "0" },
  ];

  return (
    <Box p={6}>
      {/* Header Section */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Dashboard
      </Text>

      {/* Quick Stats Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        {overview.map((item) => (
          <Card key={item.id} borderRadius="lg" p={6} gap={6}>
            <CardHeader p={0} fontSize="md" fontWeight="md">
              {item.title}
            </CardHeader>
            <CardBody
              p={0}
              fontSize={{ base: "x-large", md: "2xl", lg: "4xl" }}
              fontWeight="semibold"
            >
              <Flex gap={2} alignItems="center">
                <Text>{item.value}</Text>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Daily Inspiration Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          Daily Inspiration
        </Heading>
        <Box
          p={4}
          bg="blue.50"
          borderRadius="md"
        >
          <Text fontSize="lg" fontStyle="italic">
            {dailyTip}
          </Text>
        </Box>
      </Box>

      {/* Active Courses Section */}
      {/* <Box mb={6}>
        <Heading size="md" mb={4}>
          Active Courses
        </Heading>
        <VStack spacing={4} align="stretch">
          {activeCourses.map((course) => (
            <Box
              key={course.id}
              p={4}
              bg="gray.800"
              borderRadius="md"
              boxShadow="md"
            >
              <Flex justifyContent="space-between" mb={2}>
                <Text fontWeight="bold">{course.title}</Text>
                <Text>{course.progress}%</Text>
              </Flex>
              <Progress value={course.progress} size="sm" colorScheme="blue" />
              <Button mt={2} size="sm" colorScheme="blue">
                Continue Course
              </Button>
            </Box>
          ))}
        </VStack>
      </Box> */}

      {/* Mentorship & Support Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          Mentorship & Support
        </Heading>
        <Box
          p={4}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="md"
          boxShadow="md"
        >
          <Flex alignItems="center">
            <Avatar name="John Doe" src="https://bit.ly/kent-c-dodds" mr={4} />
            <Box>
              <Text fontWeight="bold">Your Mentor: John Doe</Text>
              <Text fontSize="sm">Next session: Today at 4 PM</Text>
            </Box>
          </Flex>
          <Button mt={4} size="sm" colorScheme="blue">
            Join Session
          </Button>
        </Box>
      </Box>

      {/* Announcements Section */}
      {/* <Box mb={6}>
        <Heading size="md" mb={4}>
          Announcements
        </Heading>
        <VStack spacing={2} align="stretch" divider={<Divider />}>
          {announcements.map((announcement, index) => (
            <Text key={index}>{announcement}</Text>
          ))}
        </VStack>
      </Box> */}

      {/* Upcoming Events Section */}
      {/* <Box mb={6}>
        <Heading size="md" mb={4}>
          Upcoming Events
        </Heading>
        <VStack spacing={4} align="stretch">
          {events.map((event) => (
            <Box
              key={event.id}
              p={4}
              bg="gray.800"
              borderRadius="md"
              boxShadow="md"
            >
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">{event.name}</Text>
                <Text fontSize="sm">{event.date}</Text>
              </Flex>
              <Button mt={2} size="sm" colorScheme="teal">
                Register
              </Button>
            </Box>
          ))}
        </VStack>
      </Box> */}

      {/* Community & Additional Resources Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          Community Feed
        </Heading>
        <Box
          p={4}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="md"
          boxShadow="md"
        >
          <Text>
            This is a placeholder for the community feed where you can see
            posts, discussions, and shared resources from fellow GrowTeens
            users.
          </Text>
          <Button mt={4} size="sm" colorScheme="purple">
            View More
          </Button>
        </Box>
      </Box>

      {/* Additional Resources Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          Additional Resources
        </Heading>
        <VStack spacing={4} align="stretch">
          <Button colorScheme="green" size="sm">
            Help & Support
          </Button>
          <Button colorScheme="orange" size="sm">
            Resource Library
          </Button>
          <Button colorScheme="blue" size="sm">
            Sponsorship Opportunities
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;
