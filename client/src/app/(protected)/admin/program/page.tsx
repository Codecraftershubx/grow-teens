"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
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
  Select,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";
import requestClient from "@/lib/requestClient";
import { useSession } from "next-auth/react";
import { NextAuthUserSession } from "@/types";
import { IoCloudDoneOutline } from "react-icons/io5";

interface Program {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string;
}

interface ProgramFormInputs {
  title: string;
  description: string;
  type: string;
  image: File | null;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const ProgramManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPending, startTransition] = useTransition();

  const [programs, setPrograms] = useState<Program[]>([]);

  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const session = useSession();
  const data = session.data as NextAuthUserSession;
  const sessionData = data?.user;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProgramFormInputs>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error(
          "File size exceeds the 10MB limit. Please upload a smaller file."
        );
        setFile(null);
        setValue("image", null);
      } else {
        setFile(selectedFile);
        setValue("image", selectedFile);
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      if (droppedFile.size > MAX_FILE_SIZE) {
        toast.error(
          "File size exceeds the 10MB limit. Please upload a smaller file."
        );
        setFile(null);
        setValue("image", null);
      } else {
        setFile(droppedFile);
        setValue("image", droppedFile);
      }
    }
  };

  const fetchPrograms = useCallback(() => {
    startTransition(async () => {
      const response = await requestClient({ token: sessionData?.token }).get(
        "/programs"
      );
      if (!response.data) {
        return;
      }
      setPrograms(response.data.data);
    });
  }, [sessionData?.token]);

  const onSubmit: SubmitHandler<ProgramFormInputs> = (data) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("type", data.type.toUpperCase());

        if (data.image) {
          formData.append("image", data.image);
        } else {
          console.log("No CAC document selected.");
        }

        await requestClient({
          token: sessionData?.token,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).post("/programs", formData);
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
    if (sessionData) {
      fetchPrograms();
    }
  }, [sessionData, fetchPrograms]);

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
                  <Select
                    {...register("type", { required: "Type is required" })}
                    placeholder="Select program type"
                  >
                    <option value="FINANCIAL_LITERACY">Finance</option>
                    <option value="TECH">Tech</option>
                    <option value="HEALTH">Health</option>
                  </Select>
                  {errors.type && (
                    <Box color="red.500">{errors.type.message}</Box>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.image} className="mb-8">
                  <FormLabel>Image Upload</FormLabel>
                  <Controller
                    name="image"
                    control={control}
                    rules={{
                      required: "Material is required",
                    }}
                    render={({ field }) => (
                      <Box
                        className="border relative p-4 rounded-md"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          handleDrop(e);
                          field.onChange(e.dataTransfer.files?.[0]);
                        }}
                        cursor="pointer"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept=".img,.png,.jpg,.jpeg"
                          onChange={(e) => {
                            handleFileChange(e);
                            field.onChange(e.target.files?.[0]);
                          }}
                          className="hidden"
                        />
                        <Box display="flex" flexDirection="column" gap={2}>
                          <Box
                            bg="gray.50"
                            p={2}
                            rounded="full"
                            mx="auto"
                            mb={4}
                          >
                            <IoCloudDoneOutline className="w-6 h-6 text-gray-700" />
                          </Box>
                          <Text fontSize="sm" textAlign="center">
                            <span className="font-semibold text-primary-500">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </Text>
                          <Text
                            fontSize="xs"
                            color="gray.500"
                            textAlign="center"
                          >
                            PDF, DOC or DOCX. Maximum size of 10MB (max.
                            800x400px)
                          </Text>
                          {file && (
                            <Text fontSize="sm" color="gray.500">
                              Selected file: {field.value?.name}
                            </Text>
                          )}
                        </Box>
                      </Box>
                    )}
                  />
                  {errors.type && (
                    <Box color="red.500">{errors.image?.message}</Box>
                  )}
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
              </Tr>
            </Thead>
            <Tbody>
              {programs.map((program, id) => (
                <Tr key={program.id}>
                  <Td>{id + 1}</Td>
                  <Td>{program.title}</Td>
                  <Td>{program.description}</Td>
                  <Td>{program.type}</Td>
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
