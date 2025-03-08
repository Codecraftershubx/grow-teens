import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface ErrorMessageProps {
  error: string;
  onClose: () => void;
}

export default function ErrorMessage({ error, onClose }: ErrorMessageProps) {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    error
  );

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    } else {
      if (onClose) onClose();
    }
  }, [error, onClose]);

  return (
    <>
      {errorMessage && (
        <Alert status="error" mb={5}>
          <AlertIcon />
          <Box>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => setErrorMessage(null)}
          />
        </Alert>
      )}
    </>
  );
}
