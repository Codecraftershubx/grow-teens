/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import requestClient from "@/lib/requestClient";
import { useSession } from "next-auth/react";
import { NextAuthUserSession } from "@/types";
import { handleServerErrorMessage } from "@/utils";

export default function ResendVerification() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const session = useSession();
  const sessionData = session.data as NextAuthUserSession;

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await requestClient({
        token: sessionData?.user?.token,
      }).post("/auth/resend-verification", { email });

      if (!response.data) {
        toast.error("Failed to resend verification");
      }

      toast.success(
        "Verification email sent successfully. Please check your inbox."
      );
    } catch (error: any) {
      toast.error(
        handleServerErrorMessage(error) ||
          "An error occurred while sending the verification email."
      )
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center minH="100vh" bg="gray.50">
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        maxW="500px"
        w="90%"
      >
        <VStack spacing={4} align="stretch">
          <Heading size="lg" textAlign="center">
            Resend Verification Email
          </Heading>

          <Text color="gray.600">
            If your verification link has expired, enter your email below to
            receive a new one.
          </Text>

          <form onSubmit={handleResend}>
            <FormControl mt={4}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>

            <Button
              colorScheme="primary"
              type="submit"
              width="full"
              mt={6}
              isLoading={isLoading}
            >
              Send Verification Email
            </Button>
          </form>

          <Button variant="ghost" onClick={() => router.push("/auth/signin")} mt={2}>
            Back to Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
