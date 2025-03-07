"use client";

import { Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

const PotentialSummary = () => {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="flex flex-col items-start">
        <div className="rb-12 mb-12 grid grid-cols-1 items-start justify-between gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Empower</p>
            <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
              Unlock Your Potential with GrowTeens
            </h2>
          </div>
          <div>
            <p className="md:text-md">
              At GrowTeens, we provide essential digital skills training to
              prepare African teenagers for the future. Our entrepreneurial
              support fosters creativity and innovation, empowering youth to
              start their own ventures. Leadership development programs ensure
              that they become confident leaders in their communities.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <div className="rb-5 mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo"
                className="size-12"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              Comprehensive Digital Skills Training for Teens
            </h3>
            <p>Our training equips teens with in-demand tech skills.</p>
          </div>
          <div>
            <div className="rb-5 mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo"
                className="size-12"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              Entrepreneurial Support to Launch Your Ideas
            </h3>
            <p>
              We provide resources and mentorship for aspiring entrepreneurs.
            </p>
          </div>
          <div>
            <div className="rb-5 mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo"
                className="size-12"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              Leadership Development for Future Change Makers
            </h3>
            <p>Our programs cultivate the leaders of tomorrow.</p>
          </div>
        </div>
        <div className="mt-10 flex items-center gap-4 md:mt-14 lg:mt-16">
          <Button variant="outline">Join Us</Button>
          <Button rightIcon={<RxChevronRight />} variant="link">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  </section>
  );
};

export default PotentialSummary;
