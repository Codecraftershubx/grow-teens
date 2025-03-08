"use client";
import React, { useState } from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

const useForm = () => {
  const [email, setEmail] = useState("");
  const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email });
  };
  return {
    email,
    handleSetEmail,
    handleSubmit,
  };
};

const linkGroups = [
  {
    title: "Quick Links",
    links: [
      { label: "About Us", url: "#" },
      { label: "Our Programs", url: "#" },
      { label: "Get Involved", url: "#" },
      { label: "Contact Us", url: "#" },
      { label: "Success Stories", url: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", url: "#" },
      { label: "FAQs", url: "#" },
      { label: "Events", url: "#" },
      { label: "Partnerships", url: "#" },
      { label: "Volunteer", url: "#" },
    ],
  },
  {
    title: "Connect With Us",
    links: [
      { label: "Social Media", url: "#" },
      { label: "Newsletter", url: "#" },
      { label: "Support Us", url: "#" },
      { label: "Impact", url: "#" },
      { label: "Join Us", url: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Licenses", url: "#" },
      { label: "Privacy Policy", url: "#" },
      { label: "Cookie Policies", url: "#" },
      { label: "Terms and Conditions", url: "#" },
    ],
  },
];

const socialIcons = [
  {
    label: "Facebook",
    url: "#",
    icon: <BiLogoFacebookCircle className="size-6" />,
  },
  {
    label: "Instagram",
    url: "#",
    icon: <BiLogoInstagram className="size-6" />,
  },
  {
    label: "Twitter",
    url: "#",
    icon: <FaXTwitter className="size-6 p-0.5" />,
  },
  {
    label: "LinkedIn",
    url: "#",
    icon: <BiLogoLinkedinSquare className="size-6" />,
  },
  {
    label: "YouTube",
    url: "#",
    icon: <BiLogoYoutube className="size-6" />,
  },
];

export function Footer() {
  const formState = useForm();

  const todayDate = new Date().getFullYear();

  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container mx-auto">
        {/* Subscription Area */}
        <div className="rb-12 mb-12 flex flex-col items-start justify-between md:mb-18 lg:mb-20 lg:flex-row">
          <div className="rb-6 mb-6 lg:mb-0">
            <h6 className="font-semibold md:text-md">Subscribe to updates</h6>
            <p>Stay informed about our latest programs and events.</p>
          </div>
          <div className="max-w-md lg:min-w-[25rem]">
            <form
              className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-y-4 md:gap-4"
              onSubmit={formState.handleSubmit}
            >
              <input
                id="email"
                type="email"
                placeholder="Your Email Here"
                value={formState.email}
                onChange={formState.handleSetEmail}
              />
              <button type="submit">Join</button>
            </form>
            <p className="text-xs">
              By subscribing, you accept our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Links Area */}
        <div className="rb-12 mb-12 grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-3 md:mb-18 md:gap-y-12 lg:mb-20 lg:grid-cols-5">
          {/* Logo */}
          <a
            href="#"
            className="sm:col-start-1 sm:col-end-4 sm:row-start-1 sm:row-end-2 lg:col-start-auto lg:col-end-auto lg:row-start-auto lg:row-end-auto"
          >
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
              alt="Logo image"
            />
          </a>
          {/* Link Groups */}
          {linkGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col items-start justify-start">
              <h6 className="mb-3 font-semibold md:mb-4">{group.title}</h6>
              <ul>
                {group.links.map((link, i) => (
                  <li key={i} className="py-2 text-sm">
                    <a href={link.url} className="flex items-center gap-3">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-black" />

        {/* Copyright & Social Icons */}
        <div className="flex flex-col-reverse items-start pb-4 pt-6 text-sm md:justify-start md:pb-0 md:pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col-reverse items-start md:flex-row md:gap-6 lg:items-center">
            <div className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 md:grid-flow-col md:justify-center md:gap-x-6 md:gap-y-0 lg:text-left">
              <p className="mt-8 md:mt-0">
                © {todayDate} GrowTeens. All rights reserved.
              </p>
            </div>
          </div>
          <div className="mb-8 flex items-center justify-center gap-3 lg:mb-0">
            {socialIcons.map((social, idx) => (
              <a key={idx} href={social.url} aria-label={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
