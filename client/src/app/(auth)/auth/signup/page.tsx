import React, { Suspense } from "react";
import Link from "next/link";
import AuthWrapper from "@/app/(auth)/_components/AuthWrapper";
import { Heading } from "@chakra-ui/react";
import SignupForm from "../../_components/SignupForm";

export default async function RegisterPage() {
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
              Welcome to GrowTeens
            </Heading>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
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
