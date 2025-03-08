"use client";

import React from "react";
import { Button, Heading, Image } from "@chakra-ui/react";
import { RxChevronRight } from "react-icons/rx";

interface InsightData {
  title: string;
  description: string;
  cta: string;
  image: string;
}

const Insights: InsightData[] = [
  {
    title: "Unlocking Potential Through Innovative Learning Experiences",
    description:
      "Our programs equip teenagers with essential skills for the digital age.",
    cta: "Explore",
    image:
      "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
  },
  {
    title: "Hands-On Training for Real-World Challenges",
    description:
      "Engage in practical workshops that foster creativity and problem-solving.",
    cta: "Join",
    image:
      "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
  },
  {
    title: "Mentorship Programs to Guide Future Leaders",
    description:
      "Connect with experienced mentors who inspire and support your journey.",
    cta: "Connect",
    image:
      "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
  },
];

const Explore = () => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
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
                <Image src={insight.image} alt="placeholder image" />
              </div>
              <Heading
                as="h6"
                fontSize={{ base: "xl", md: "2xl" }}
                mb={4}
              >
                {insight.title}
              </Heading>
              <p>{insight.description}</p>
              <div className="mt-6 flex gap-4 md:mt-8">
                <Button rightIcon={<RxChevronRight />} variant="link">
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
