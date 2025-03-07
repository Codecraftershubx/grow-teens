"use client";

import { Button } from "@/components/ui/button";
import { Text } from "@chakra-ui/react";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

const EmpowerSummary = () => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Empower</p>
            <Text fontSize="4xl">Unlock Your Potential with GrowTeens Programs</Text>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Unlock Your Potential with GrowTeens Programs
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              Participating in GrowTeens programs equips teenagers with
              essential digital, entrepreneurial, and leadership skills. This
              transformative experience prepares them for a successful future in
              the global economy.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-5xl font-bold md:text-7xl lg:text-8xl">
                  Skills
                </h3>
                <p>Gain valuable skills for the future of work.</p>
              </div>
              <div>
                <h3 className="mb-2 text-5xl font-bold md:text-7xl lg:text-8xl">
                  Opportunities
                </h3>
                <p>Access mentorship and entrepreneurial support for growth.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button>
                Join
              </Button>
              <Button visual="ghost">Learn More <RxChevronRight /></Button>
            </div>
          </div>
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
            className="w-full object-cover"
            alt="Relume placeholder image"
          />
        </div>
      </div>
    </section>
  );
}

export default EmpowerSummary;
