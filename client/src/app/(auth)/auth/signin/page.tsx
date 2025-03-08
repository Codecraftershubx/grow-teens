import React, { Suspense } from "react";
import LoginForm from "@/app/(auth)/_components/LoginForm";
import Link from "next/link";
import AuthWrapper from "@/app/(auth)/_components/AuthWrapper";
import { Heading, Text } from "@chakra-ui/react";

export default async function LoginPage() {

  return (
    <AuthWrapper>
      <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <article className="w-full">
          <div className="mb-8 flex flex-col items-center">
            <Heading
              as="h3"
              size="xl"
              fontWeight="medium"
              mb={3}
              color="gray.900"
            >
              Welcome Back
            </Heading>
            <Text fontSize="lg" color="gray.500">
              Please enter your details.
            </Text>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>

          <div className="text-center">
            <p className="text-gray-500 text-base font-normal leading-6 flex justify-center gap-1">
              Don&apos;t have an account?
              <Link href="/auth/signup" className="text-primary-500">
                Sign up
              </Link>
            </p>
          </div>
        </article>
      </section>
    </AuthWrapper>
  );
}
