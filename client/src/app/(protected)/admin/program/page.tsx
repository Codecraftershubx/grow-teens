"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Textarea,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";
import requestClient from "@/lib/requestClient";
import { convertDate } from "@/utils/formatDate";

interface Program {
  id: number;
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate?: string;
}

interface ProgramFormInputs {
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate?: string;
}

const ProgramManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProgramFormInputs>();

  const [programs, setPrograms] = useState<Program[]>([]);

  const fetchPrograms = useCallback(() => {
    startTransition(async () => {
      const response = await requestClient().get("/programs");
      if (!response.data) {
        return;
      }
      setPrograms(response.data);
    });
  }, [startTransition]);

  const onSubmit: SubmitHandler<ProgramFormInputs> = (data) => {
    startTransition(async () => {
      try {
        await requestClient().post("/programs", {
          title: data.title,
          description: data.description,
          type: data.type.toUpperCase(),
          startDate: data.startDate,
          endDate: data.endDate,
        });
        toast.success("The new program has been added successfully");
        fetchPrograms();
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while adding the program");
      }
    });
    reset();
    onClose();
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <Box p={6} bg="#f5f5f5">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading mb={6}>Program Management</Heading>
        <Button onClick={onOpen} colorScheme="blue" mb={4}>
          Add New Program
        </Button>
      </Flex>

      {/* Modal for Adding a New Program */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Program</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    {...register("title", { required: "Title is required" })}
                    placeholder="Program Title"
                  />
                  {errors.title && (
                    <Box color="red.500">{errors.title.message}</Box>
                  )}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    placeholder="Program Description"
                  />
                  {errors.description && (
                    <Box color="red.500">{errors.description.message}</Box>
                  )}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Type</FormLabel>
                  <Input
                    {...register("type", { required: "Type is required" })}
                    placeholder="e.g., Digital, Tech, Health"
                  />
                  {errors.type && (
                    <Box color="red.500">{errors.type.message}</Box>
                  )}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    {...register("startDate", {
                      required: "Start Date is required",
                    })}
                  />
                  {errors.startDate && (
                    <Box color="red.500">{errors.startDate.message}</Box>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <Input type="date" {...register("endDate")} />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue">
                Add Program
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Divider mb={6} />

      {/* View Programs Section */}
      <Box bg="white" p={6} borderRadius="md" boxShadow="md">
        <Heading size="md" mb={4}>
          Programs
        </Heading>

        {isPending ? (
          <Text>Loading...</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Type</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {programs.map((program) => (
                <Tr key={program.id}>
                  <Td>{program.id}</Td>
                  <Td>{program.title}</Td>
                  <Td>{program.description}</Td>
                  <Td>{program.type}</Td>
                  <Td>{program.startDate && convertDate(program.startDate)}</Td>
                  <Td>{program.endDate || "N/A"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

export default ProgramManagement;
