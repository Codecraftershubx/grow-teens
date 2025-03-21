"use client";

import { Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { useRouter } from "next/navigation";

const PotentialSummary = () => {
    const router = useRouter();
  return (
    <section className="px-[5%] py-10 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col items-start">
          <div className="rb-12 mb-12 grid grid-cols-1 items-start justify-between gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
            <div>
              <p className="mb-3 font-semibold md:mb-4 text-primary-600">
                Empower
              </p>
              <Text fontSize="4xl">
                Unlock Your Potential with GrowTeens Programs
              </Text>
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
                <Image
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="logo"
                  className="size-12"
                />
              </div>
              <Text
                as={"h3"}
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                mb={[2, 4]}
                className="md:leading-[1.3]"
                color="secondary.600"
              >
                Comprehensive Digital Skills Training for Teens
              </Text>

              <p>Our training equips teens with in-demand tech skills.</p>
            </div>
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <Image
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="logo"
                  className="size-12"
                />
              </div>
              <Text
                as={"h3"}
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                mb={[2, 4]}
                className="md:leading-[1.3]"
                color="secondary.600"
              >
                Entrepreneurial Support to Launch Your Ideas
              </Text>

              <p>
                We provide resources and mentorship for aspiring entrepreneurs.
              </p>
            </div>
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <Image
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Img"
                  className="size-12"
                />
              </div>
              <Text
                as={"h3"}
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                mb={[2, 4]}
                className="md:leading-[1.3]"
                color="secondary.600"
              >
                Leadership Development for Future Change Makers
              </Text>

              <p>Our programs cultivate the leaders of tomorrow.</p>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-4 md:mt-14 lg:mt-16">
            <Button variant="outline" onClick={() => router.push("/auth/signup")}>Join Us</Button>
            <Button rightIcon={<RxChevronRight />} variant="ghost">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PotentialSummary;
