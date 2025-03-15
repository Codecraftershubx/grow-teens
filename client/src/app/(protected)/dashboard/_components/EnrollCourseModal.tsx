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
  Image,
  Text,
} from "@chakra-ui/react";

interface Course {
  title: string;
  image: string;
  description: string;
}

interface EnrollCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse: Course;
}

const EnrollCourseModal = ({
  isOpen,
  onClose,
  selectedCourse,
}: EnrollCourseModalProps) => {
  return (
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
  );
};

export default EnrollCourseModal;