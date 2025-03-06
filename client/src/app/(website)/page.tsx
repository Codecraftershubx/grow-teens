import Image from "next/image";
import HeroBg from "../../../public/assets/images/hero-background.svg";

export default function Home() {
  return (
    <section id="home" className="flex h-svh min-h-svh flex-col">
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
            <h1 className="lg:w-3/5 font-extrabold">
              Empowering African Teens for a Brighter Future
            </h1>

            <div>
              <p className="text-base md:text-lg lg:w-2/4 mx-auto">
                At GrowTeens, we are dedicated to equipping African teenagers
                with essential skills for success in the digital age. Our
                mission is to empower youth to become proactive contributors to
                the global economy through innovative training and mentorship.
              </p>
              <div className="mt-6 flex justify-center flex-wrap gap-6 md:mt-8">
                <button className="btn-primary">Register</button>
                <button className="btn-secondary">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[5%]">
        <div className="container relative z-10">
          <div className="grid grid-rows-1 items-start gap-y-5 py-12 md:grid-cols-2 md:gap-x-12 md:gap-y-8 md:py-18 lg:gap-x-20 lg:gap-y-16 lg:py-20">
            <div>
              <h1 className="text-xl font-bold text-text-primary md:text-2xl lg:text-10xl">
                Empowering African Teens for a Brighter Future
              </h1>
            </div>
            <div>
              <p className="text-base text-text-primary md:text-md">
                At GrowTeens, we are dedicated to equipping African teenagers
                with essential skills for success in the digital age. Our
                mission is to empower youth to become proactive contributors to
                the global economy through innovative training and mentorship.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                <button>Register</button>
                <button>Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
