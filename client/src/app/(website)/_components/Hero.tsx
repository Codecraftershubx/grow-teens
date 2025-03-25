"use client";

import Image from "next/image";
import HeroBg from "../../../../public/assets/images/hero-background.svg";
import { Button, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const router = useRouter();
  return (
    <section id="home" className="flex flex-col relative pt-20">
      <div className="flex flex-col items-center justify-between w-full gap-20 px-6 py-14 gap-y-6 lg:flex-row lg:px-20 rounded-3xl">
        <Text
          w={{ lg: "xl" }}
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight={600}
          color=""
          className="lg:w-1/2 "
        >
          Empowering African Teens for a Brighter Future
        </Text>

        <div className="lg:w-1/2">
          <Text mx="auto" className="text-base md:text-lg ">
            At GrowTeens, we are dedicated to equipping African teenagers with
            essential skills for success in the digital age. Our mission is to
            empower youth to become proactive contributors to the global economy
            through innovative training and mentorship.
          </Text>
          <div className="mt-6 flex flex-wrap gap-6 md:mt-8">
            <Button variant="solid" onClick={() => router.push("/signup")}>
              Join Us
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>

      <Image
        src={HeroBg}
        alt="hero"
        className="hidden w-full h-full md:block"
        loading="lazy"
      />
      {/* <div className="relative flex-1">
        <div className="absolute inset-0 z-0 bg-secondary-800">
          <Image
            src={HeroBg}
            alt="placeholder image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full bg-blend-multiply"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-[5%] space-y-6">
            <Text
              w={{ lg: "xl" }}
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight={600}
              color="yellow.200"
              className="drop-shadow-2xl"
            >
              Empowering African Teens for a Brighter Future
            </Text>

            <div>
              <Text
                mx="auto"
                className="text-base md:text-lg lg:w-2/4 drop-shadow-lg"
                color="yellow.200"
              >
                At GrowTeens, we are dedicated to equipping African teenagers
                with essential skills for success in the digital age. Our mission
                is to empower youth to become proactive contributors to the global
                economy through innovative training and mentorship.
              </Text>
              <div className="mt-6 flex justify-center flex-wrap gap-6 md:mt-8">
                <Button variant="solid" onClick={() => router.push("/signup")}>
                  Join Us
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
