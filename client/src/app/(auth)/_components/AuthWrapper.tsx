import logo from "@public/assets/images/logo.svg";
import { Image } from "@chakra-ui/react";

interface AuthWrapperProps {
  children: React.ReactNode;
}
export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <>
      <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Image src={logo.src} alt="GrowTeens logo" className="" />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
