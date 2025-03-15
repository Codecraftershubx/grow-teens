import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Flex,
} from "@chakra-ui/react";
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  handleRequest: () => void;
  isLoading: boolean;
}
  
const DeleteModal = ({
  isOpen,
  onClose,
  title,
  handleRequest,
  isLoading,
  }: DeleteModalProps) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <h3 className='text-xl font-semibold text-center'>Delete {title}</h3>
            <p className='text-sm text-gray-500 mt-2 text-center'>Are you sure you want to delete this {title}?</p>
            <Flex gap={3} my={8}>
              <Button onClick={onClose} flex={1}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                flex={1}
                onClick={handleRequest}
                isLoading={isLoading}
              >
                Delete
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default DeleteModal;