"use client";

import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
  IconButton,
  useToast,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../../../public/assets/images/logo.svg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setEmail("");
  };

  return (
    <Box as="footer" bg="gray.900" color="white" py={{ base: 12, md: 16 }}>
      <Container maxW="container.xl" px="5%">
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "2fr 1fr 1fr 1fr",
          }}
          gap={{ base: 10, md: 8 }}
          mb={{ base: 12, md: 16 }}
        >
          {/* Logo and description */}
          <Box maxW={{ md: "full", lg: "90%" }}>
            <Link href="/" display="inline-block" mb={6}>
              <Image src={logo.src} alt="GrowTeens Logo" maxW="180px" />
            </Link>
            <Text mb={6} color="gray.300">
              Empowering African teenagers with the skills, knowledge, and
              support they need to thrive in the digital age and become leaders
              in their communities.
            </Text>
            <Stack direction="row" spacing={4}>
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebook />}
                colorScheme="whiteAlpha"
                variant="ghost"
                borderRadius="full"
              />
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                colorScheme="whiteAlpha"
                variant="ghost"
                borderRadius="full"
              />
              <IconButton
                aria-label="Instagram"
                icon={<FaInstagram />}
                colorScheme="whiteAlpha"
                variant="ghost"
                borderRadius="full"
              />
              <IconButton
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                colorScheme="whiteAlpha"
                variant="ghost"
                borderRadius="full"
              />
              <IconButton
                aria-label="YouTube"
                icon={<FaYoutube />}
                colorScheme="whiteAlpha"
                variant="ghost"
                borderRadius="full"
              />
            </Stack>
          </Box>

          {/* Quick Links */}
          <Box>
            <Heading size="md" mb={6}>
              Quick Links
            </Heading>
            <Stack spacing={3}>
              <Link href="/about" _hover={{ color: "primary.400" }}>
                About Us
              </Link>
              <Link href="/programs" _hover={{ color: "primary.400" }}>
                Our Programs
              </Link>
              <Link href="/mentors" _hover={{ color: "primary.400" }}>
                Mentors
              </Link>
              <Link href="/partners" _hover={{ color: "primary.400" }}>
                Partners
              </Link>
              <Link href="/faq" _hover={{ color: "primary.400" }}>
                FAQ
              </Link>
            </Stack>
          </Box>

          {/* Contact */}
          <Box>
            <Heading size="md" mb={6}>
              Contact
            </Heading>
            <Stack spacing={3} color="gray.300">
              <Text>26 Innovation Avenue</Text>
              <Text>Lagos, Nigeria</Text>
              <Text>contact@growteens.org</Text>
              <Text>+234 800 123 4567</Text>
            </Stack>
          </Box>

          {/* Newsletter */}
          <Box>
            <Heading size="md" mb={6}>
              Stay Updated
            </Heading>
            <Text mb={4} color="gray.300">
              Subscribe to our newsletter for updates on programs, events, and
              success stories.
            </Text>
            <form onSubmit={handleSubscribe}>
              <Stack direction="row" spacing={3}>
                <Input
                  type="email"
                  placeholder="Your Email Here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="white"
                  color="black"
                />
                <Button type="submit" colorScheme="primary">
                  Subscribe
                </Button>
              </Stack>
            </form>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
