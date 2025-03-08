"use client";

import { useState } from "react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(
    searchParams?.get("error") ?? null
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl:
        searchParams.get("callbackUrl") || `${window.location.origin}/`,
      redirect: false,
    });

    setIsLoading(false);

    if (!response) {
      setErrorMessage("An unknown error occurred.");
      return;
    }

    if (response.error) {
      setErrorMessage(response.error);
      return;
    }

    if (response.ok && response.url) {
      window.location.href = response.url;
      return;
    }

    setErrorMessage(response.error);
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
        <FormControl isInvalid={!!errors.email?.message} mb={5}>
          <FormLabel htmlFor="email">
            Email
            <Text as="span" color="red.500">
              *
            </Text>
          </FormLabel>
          <Input
            errorBorderColor="red.300"
            id="email"
            isInvalid={!!errors.email?.message}
            className="p-[10px_14px] w-full gap-2 rounded-lg border-1 border-gray-300"
            _focus={{
              border: !!errors.email?.message ? "red.300" : "border-gray-300",
            }}
            type="text"
            placeholder="Enter your business email"
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
            <Text as={"span"} className="text-red-500">
              {errors.email?.message}
            </Text>
          )}
        </FormControl>

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
              errorBorderColor="red.300"
              isInvalid={!!errors.password?.message}
              className="p-[10px_14px] w-full gap-2 rounded-lg border-1 border-gray-300"
              type={isVisible ? "text" : "password"}
              placeholder="Enter password"
              isDisabled={isLoading}
              {...register("password", {
                required: true,
              })}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                isDisabled={isLoading}
                h="1.75rem"
                size="sm"
                onClick={toggleVisibility}
                bgColor={"transparent"}
                _hover={{
                  bg: "transparent",
                }}
                icon={
                  isVisible ? (
                    <FiEyeOff
                      size={16}
                      className="text-default-400 pointer-events-none text-gray"
                    />
                  ) : (
                    <IoEyeOutline
                      size={16}
                      className="text-default-400 pointer-events-none text-gray"
                    />
                  )
                }
                aria-label={""}
              ></IconButton>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Text as={"span"} className="text-red-500">
              Password is required
            </Text>
          )}
        </FormControl>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <input type="checkbox" id="remember" className="w-4 h-4" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <Link href="/auth/forgot-password" className="text-primary">
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className="my-6 flex flex-col gap-4">
        <Button
          variant={"solid"}
          size="lg"
          type="submit"
          isLoading={isLoading}
          loadingText="Submitting"
        >
          Sign In
        </Button>
        <Button
          variant={"outline"}
          size="lg"
          borderColor={"gray.300"}
          className="w-full cursor-pointer text-gray border"
          leftIcon={<FcGoogle className="text-2xl" />}
          isDisabled={isLoading}
          onClick={() =>
            signIn("google", {
              callbackUrl:
                searchParams.get("callbackUrl") || `${window.location.origin}/`,
            })
          }
        >
          Sign In with Google
        </Button>
      </div>
    </form>
  );
}
