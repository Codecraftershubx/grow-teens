"use client";

import { Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import manFixingDevice from "../../../../public/assets/images/man-fixing.svg";

const EmpowerSummary = () => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-secondary-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:justify-between md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4 text-primary-600">
              Empower
            </p>
            <Text fontSize="4xl">
              Unlock Your Potential with GrowTeens Programs
            </Text>
            <Text mb={[6, 8]}>
              Participating in GrowTeens programs equips teenagers with
              essential digital, entrepreneurial, and leadership skills. This
              transformative experience prepares them for a successful future in
              the global economy.
            </Text>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <Text
                  as={"h3"}
                  fontSize={{ base: "xl", md: "2xl", lg: "3xl", "xl": "5xl" }}
                  mb={2}
                  className="md:leading-[1.3]"
                >
                  Skills
                </Text>
                <p>Gain valuable skills for the future of work.</p>
              </div>
              <div>
                <Text
                  as={"h3"}
                  fontSize={{ base: "xl", md: "2xl", lg: "3xl", "xl": "5xl" }}
                  mb={2}
                  className="md:leading-[1.3]"
                >
                  Opportunities
                </Text>
                <p>Access mentorship and entrepreneurial support for growth.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button variant="outline">Join Us</Button>
              <Button variant="ghost">
                Learn More <RxChevronRight />
              </Button>
            </div>
          </div>
          <Image
            src={manFixingDevice}
            alt="Man fixing"
            className="w-full object-cover"
            width={100}
            height={100}
          />
        </div>
      </div>
    </section>
  );
};

export default EmpowerSummary;
