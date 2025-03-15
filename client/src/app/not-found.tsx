import Link from "next/link";
import GrowTeensLogo from "@public/assets/images/logo.svg";
import { Heading, Image } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center mb-2">
          <Image src={GrowTeensLogo.src} alt="Grow Teens Logo" />
        </div>
        <Heading as="h1" size="xl" fontWeight="medium" color="gray.900" mb={3}>
          Page Not Found (404)
        </Heading>
        <p className="text-base text-gray-500">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="mt-4 max-w-48 mx-auto flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
