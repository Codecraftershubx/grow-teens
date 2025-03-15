/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button, Heading, Image } from "@chakra-ui/react";
import { RxChevronRight } from "react-icons/rx";
import handon from "@public/assets/images/handson.svg";
import mentors from "@public/assets/images/mentors.svg";
import unlocking from "@public/assets/images/unlocking.svg";
import { useRouter } from "next/navigation";

interface InsightData {
  title: string;
  description: string;
  cta: string;
  ctaLink?: string;
  image: string | any;
}

const Insights: InsightData[] = [
  {
    title: "Unlocking Potential Through Innovative Learning Experiences",
    description:
      "Our programs equip teenagers with essential skills for the digital age.",
    cta: "Explore",
    image: unlocking,
  },
  {
    title: "Hands-On Training for Real-World Challenges",
    description:
      "Engage in practical workshops that foster creativity and problem-solving.",
    cta: "Join",
    ctaLink: "/auth/signin",
    image: handon,
  },
  {
    title: "Mentorship Programs to Guide Future Leaders",
    description:
      "Connect with experienced mentors who inspire and support your journey.",
    cta: "Connect",
    image: mentors,
  },
];

const Explore = () => {
  const router = useRouter();
  return (
    <section className="px-[5%] py-10 md:py-24">
      <div className="container mx-auto">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="max-w-lg">
            <Heading
              as={"h2"}
              className="text-4xl leading-[1.2] md:text-5xl lg:text-6xl"
              color="secondary.600"
            >
              Empowering Youth with Skills for a Bright Future
            </Heading>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {Insights.map((insight, idx) => (
            <div className="flex flex-col" key={idx}>
              <div className="mb-6 md:mb-8">
                <Image src={insight.image.src} alt="placeholder image" />
              </div>
              <Heading as="h6" fontSize={{ base: "xl", md: "2xl" }} mb={4}>
                {insight.title}
              </Heading>
              <p>{insight.description}</p>
              <div className="mt-6 flex gap-4 md:mt-8">
                <Button
                  rightIcon={<RxChevronRight />}
                  variant="link"
                  onClick={() => router.push("/auth/signup")}
                >
                  {insight.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
