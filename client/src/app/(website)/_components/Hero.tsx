"use client";

import Image from "next/image";
import HeroBg from "../../../../public/assets/images/hero-background.svg";
import { Button, Text } from "@chakra-ui/react";

const Hero = () => {
  return (
    <section id="home" className="flex h-[587px] flex-col">
      <div className="relative flex-1">
        <div className="absolute inset-0 z-0 bg-secondary-800">
          <Image
            src={HeroBg}
            alt="placeholder image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 size-full filter grayscale opacity-20 bg-blend-multiply"
          />
          {/* Overlay */}
          <div className="absolute inset-0 opacity-50 "></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-[5%] text-white space-y-6">
            <Text w={{ lg: "xl" }} fontSize={{base: "3xl", md: "5xl" }} fontWeight={600}>
              Empowering African Teens for a Brighter Future
            </Text>

            <div>
              <Text mx="auto" className="text-base md:text-lg lg:w-2/4">
                At GrowTeens, we are dedicated to equipping African teenagers
                with essential skills for success in the digital age. Our
                mission is to empower youth to become proactive contributors to
                the global economy through innovative training and mentorship.
              </Text>
              <div className="mt-6 flex justify-center flex-wrap gap-6 md:mt-8">
                <Button variant="solid">Join Us</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
