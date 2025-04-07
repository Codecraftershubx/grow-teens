"use client";

import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Logo from "@public/assets/images/logo.svg";
import { signOut, useSession } from "next-auth/react";
import { NextAuthUserSession } from "@/types";
import { Avatar, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import GreetingComponent from "./GreetingComponent";

const DashboardNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const data = session.data as NextAuthUserSession;

  return (
    <div className="lg:fixed w-full bg-white z-50">
      <div className="flex justify-between shadow-sm lg:pr-8">
        <div className="flex items-center gap-8 md:gap-36">
          <div className="hidden md:flex h-16 shrink-0 items-center my-4 ml-6 md:ml-12">
            <Image
              src={Logo}
              alt=""
              className="w-24 h-10 md:w-[160px] md:h-auto"
              width={75}
              height={75}
            />
          </div>
          <GreetingComponent />
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <Avatar
                size="md"
                name={data?.user?.firstName || data?.user?.lastName}
                src=""
              />
              <span className="hidden lg:flex lg:items-center">
                <div className="text-left ml-4">
                  <div className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      {data?.user.firstName + " " + data?.user.lastName}
                    </span>
                    {/* {renderBusinessType(data?.user?.role)} */}
                  </div>
                  <p className="text-gray-600 text-sm">{data?.user?.role}</p>
                </div>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-4 h-6 w-6 text-gray-600"
                />
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <Button
                  variant="unstyled"
                  px={3}
                  py={1}
                  onClick={() => {
                    if (data?.user?.role === "TEEN") {
                      router.push("/dashboard/settings/personal_information");
                    } else {
                      router.push("/");
                    }
                  }}
                >
                  View Profile
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  variant="unstyled"
                  px={3}
                  py={1}
                  color={"primary.500"}
                  onClick={async () => {
                    await signOut();
                    router.push("/");
                  }}
                >
                  Log Out
                </Button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
      {/* <Divider /> */}
    </div>
  );
};

export default DashboardNavbar;
