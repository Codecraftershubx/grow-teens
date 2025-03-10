// components/AdminDashboard.tsx
import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  // Example metrics data (replace with API data)
  const metrics = {
    totalUsers: 1200,
    activeCourses: 35,
    pendingMentorships: 10,
    totalEvents: 5,
  };

  // Example user registrations (replace with dynamic data)
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "TEEN" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "MENTOR" },
    {
      id: 3,
      name: "Samuel Adams",
      email: "samuel@example.com",
      role: "SPONSORS",
    },
  ];

  const cardBg = "gray.100";

  return (
    <Box p={6}>
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Admin Dashboard</Heading>
        <Button colorScheme="blue">Logout</Button>
      </Flex>

      {/* Metrics Overview */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={6}>
        <Box p={4} bg={cardBg} borderRadius="md" boxShadow="md">
          <Text fontWeight="bold">Total Users</Text>
          <Text fontSize="2xl">{metrics.totalUsers}</Text>
        </Box>
        <Box p={4} bg={cardBg} borderRadius="md" boxShadow="md">
          <Text fontWeight="bold">Active Courses</Text>
          <Text fontSize="2xl">{metrics.activeCourses}</Text>
        </Box>
        <Box p={4} bg={cardBg} borderRadius="md" boxShadow="md">
          <Text fontWeight="bold">Pending Mentorships</Text>
          <Text fontSize="2xl">{metrics.pendingMentorships}</Text>
        </Box>
        <Box p={4} bg={cardBg} borderRadius="md" boxShadow="md">
          <Text fontWeight="bold">Total Events</Text>
          <Text fontSize="2xl">{metrics.totalEvents}</Text>
        </Box>
      </SimpleGrid>

      <Divider my={6} />

      {/* User Management Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          User Registrations
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" mr={2}>
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red">
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Divider my={6} />

      {/* Courses Management Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          Course Management
        </Heading>
        <Text mb={4}>
          Manage courses: add new courses, update existing ones, and view course
          performance.
        </Text>
        <Button colorScheme="green" size="sm">
          Add New Course
        </Button>
      </Box>

      <Divider my={6} />

      {/* Events Management Section */}
      <Box mb={6}>
        <Heading size="md" mb={4}>
          Events Management
        </Heading>
        <Text mb={4}>
          View and manage upcoming events, workshops, and bootcamps.
        </Text>
        <Button colorScheme="teal" size="sm">
          Create New Event
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
