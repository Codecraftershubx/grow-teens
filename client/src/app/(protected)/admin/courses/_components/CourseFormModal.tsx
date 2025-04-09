import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  SimpleGrid,
  Switch,
  Box,
  Image,
} from "@chakra-ui/react";
import { FiEdit2, FiPlus } from "react-icons/fi";

interface FormData {
  title: string;
  description: string;
  overview: string;
  type: string;
  difficulty: string;
  durationHours: number;
  instructorId: number;
  isFeatured: boolean;
  isPublished: boolean;
}

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  handleFormChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleCheckboxChange: (name: string, value: boolean) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "thumbnail" | "coverImage"
  ) => void;
  handleSubmit: () => void;
  isLoading: boolean;
  isEditMode: boolean;
  thumbnailPreview: string;
  coverImagePreview: string;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({
  isOpen,
  onClose,
  formData,
  handleFormChange,
  handleCheckboxChange,
  handleFileChange,
  handleSubmit,
  isLoading,
  isEditMode,
  thumbnailPreview,
  coverImagePreview,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditMode ? "Edit Course" : "Add New Course"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel fontSize="sm">Course Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Enter course title"
                fontSize="sm"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm">Short Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Brief description (150-200 characters)"
                fontSize="sm"
                rows={3}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Detailed Overview</FormLabel>
              <Textarea
                name="overview"
                value={formData.overview}
                onChange={handleFormChange}
                placeholder="Detailed course overview"
                fontSize="sm"
                rows={5}
              />
            </FormControl>

            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired>
                <FormLabel fontSize="sm">Course Type</FormLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  fontSize="sm"
                >
                  <option value="TECH">Technology</option>
                  <option value="FINANCIAL_LITERACY">Financial Literacy</option>
                  <option value="LEADERSHIP">Leadership</option>
                  <option value="ENTREPRENEURSHIP">Entrepreneurship</option>
                  <option value="PERSONAL_DEVELOPMENT">
                    Personal Development
                  </option>
                  <option value="CAREER">Career</option>
                  <option value="ACADEMIC">Academic</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="sm">Difficulty Level</FormLabel>
                <Select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleFormChange}
                  fontSize="sm"
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                  <option value="EXPERT">Expert</option>
                </Select>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm">Duration (Hours)</FormLabel>
                <Input
                  name="durationHours"
                  type="number"
                  value={formData.durationHours}
                  onChange={handleFormChange}
                  min={0}
                  fontSize="sm"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">Instructor ID</FormLabel>
                <Input
                  name="instructorId"
                  type="number"
                  fontSize="sm"
                  value={formData.instructorId}
                  onChange={handleFormChange}
                  min={0}
                />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm">Thumbnail Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "thumbnail")}
                  fontSize="sm"
                  p={1}
                />
                {thumbnailPreview && (
                  <Box mt={2} position="relative" width="150px" height="100px">
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      borderRadius="md"
                    />
                  </Box>
                )}
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">Cover Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "coverImage")}
                  fontSize="sm"
                  p={1}
                />
                {coverImagePreview && (
                  <Box mt={2} position="relative" width="150px" height="80px">
                    <Image
                      src={coverImagePreview}
                      alt="Cover Image Preview"
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      borderRadius="md"
                    />
                  </Box>
                )}
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={4} mt={2}>
              <FormControl display="flex" alignItems="center">
                <Switch
                  id={isEditMode ? "is-featured-edit" : "is-featured"}
                  isChecked={formData.isFeatured}
                  onChange={(e) =>
                    handleCheckboxChange("isFeatured", e.target.checked)
                  }
                  colorScheme="yellow"
                  mr={3}
                />
                <FormLabel
                  htmlFor={isEditMode ? "is-featured-edit" : "is-featured"}
                  mb={0}
                  fontSize="sm"
                >
                  Featured Course
                </FormLabel>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <Switch
                  id={isEditMode ? "is-published-edit" : "is-published"}
                  isChecked={formData.isPublished}
                  onChange={(e) =>
                    handleCheckboxChange("isPublished", e.target.checked)
                  }
                  colorScheme="green"
                  mr={3}
                />
                <FormLabel
                  htmlFor={isEditMode ? "is-published-edit" : "is-published"}
                  mb={0}
                  fontSize="sm"
                >
                  Publish Course
                </FormLabel>
              </FormControl>
            </SimpleGrid>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} fontSize="sm">
            Cancel
          </Button>
          <Button
            colorScheme={isEditMode ? "blue" : "primary"}
            leftIcon={isEditMode ? <FiEdit2 /> : <FiPlus />}
            onClick={handleSubmit}
            isLoading={isLoading}
            fontSize="sm"
          >
            {isEditMode ? "Update Course" : "Create Course"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseFormModal;
