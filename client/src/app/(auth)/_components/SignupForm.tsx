/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import ErrorMessage from "./ErrorMessage";
import { signIn } from "next-auth/react";
import requestClient from "@/lib/requestClient";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  userType: "TEEN" | "MENTOR" | "SPONSORS" | "ADMIN";
}

export default function SignupForm() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(
    searchParams?.get("error") ?? null
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const response = await requestClient().post("/auth/signup", {
        ...data,
      });
      const { status, message } = response.data;

      if (status === "error") {
        setIsLoading(false);
        return setErrorMessage(message);
      }

      const loginResponse = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl:
          searchParams.get("callbackUrl") || `${window.location.origin}/`,
        redirect: false,
      });

      if (!loginResponse) {
        setErrorMessage("An unknown error occurred.");
        return;
      }

      if (loginResponse.error) {
        setErrorMessage(loginResponse.error);
        return;
      }

      if (loginResponse.ok && loginResponse.url) {
        window.location.href = loginResponse.url;
        return;
      }

      setErrorMessage(loginResponse.error);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <ErrorMessage
          error={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
      <div className="flex flex-col gap-5 text-gray">
        {/* First Name Field */}
        <FormControl isInvalid={!!errors.firstName?.message} mb={5}>
          <FormLabel htmlFor="firstName">
            First Name
            <Text as="span" color="red.500">
              *
            </Text>
          </FormLabel>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            isDisabled={isLoading}
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <Text as="span" color="red.500">
              {errors.firstName?.message}
            </Text>
          )}
        </FormControl>

        {/* Last Name Field */}
        <FormControl isInvalid={!!errors.lastName?.message} mb={5}>
          <FormLabel htmlFor="lastName">
            Last Name
            <Text as="span" color="red.500">
              *
            </Text>
          </FormLabel>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            isDisabled={isLoading}
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <Text as="span" color="red.500">
              {errors.lastName?.message}
            </Text>
          )}
        </FormControl>

        {/* Email Field */}
        <FormControl isInvalid={!!errors.email?.message} mb={5}>
          <FormLabel htmlFor="email">
            Email
            <Text as="span" color="red.500">
              *
            </Text>
          </FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            isDisabled={isLoading}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <Text as="span" color="red.500">
              {errors.email?.message}
            </Text>
          )}
        </FormControl>

        {/* Password Field */}
        <FormControl isInvalid={!!errors.password?.message} mb={5}>
          <FormLabel htmlFor="password">
            Password
            <Text as="span" color="red.500">
              *
            </Text>
          </FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              type={isVisible ? "text" : "password"}
              placeholder="Enter password"
              isDisabled={isLoading}
              {...register("password", { required: "Password is required" })}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                isDisabled={isLoading}
                h="1.75rem"
                size="sm"
                onClick={toggleVisibility}
                bgColor="transparent"
                _hover={{ bg: "transparent" }}
                icon={
                  isVisible ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <IoEyeOutline size={16} />
                  )
                }
                aria-label="Toggle password visibility"
              />
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Text as="span" color="red.500">
              {errors.password?.message}
            </Text>
          )}
        </FormControl>

        {/* Age Field */}
        <FormControl isInvalid={!!errors.age?.message} mb={5}>
          <FormLabel htmlFor="age">
            Age
            <Text as="span" color="red.500">
              *
            </Text>
          </FormLabel>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            isDisabled={isLoading}
            {...register("age", {
              required: "Age is required",
              min: { value: 13, message: "Minimum age is 13" },
              max: { value: 19, message: "Maximum age is 19" },
            })}
          />
          {errors.age && (
            <Text as="span" color="red.500">
              {errors.age?.message}
            </Text>
          )}
        </FormControl>

        {/* User Type Select Field */}
        <FormControl isInvalid={!!errors.userType?.message} mb={5}>
          <FormLabel htmlFor="userType">
            User Type
            <Text as="span" color="red.500">
              *
            </Text>
          </FormLabel>
          <Select
            id="userType"
            placeholder="Select user type"
            isDisabled={isLoading}
            {...register("userType", { required: "User type is required" })}
          >
            <option value="TEEN">Teen</option>
            <option value="MENTOR">Mentor</option>
            <option value="SPONSORS">Sponsors</option>
            <option value="ADMIN">Admin</option>
          </Select>
          {errors.userType && (
            <Text as="span" color="red.500">
              {errors.userType?.message}
            </Text>
          )}
        </FormControl>
      </div>
      <div className="my-6 flex flex-col gap-4">
        <Button
          variant="solid"
          size="lg"
          type="submit"
          isLoading={isLoading}
          loadingText="Submitting"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}
