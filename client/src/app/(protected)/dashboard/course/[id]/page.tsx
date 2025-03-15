/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import requestClient from "@/lib/requestClient";
import { NextAuthUserSession } from "@/types";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import LoadingState from "@/app/(protected)/_components/LoadingState";
import { toast } from "react-toastify";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = ({ params: paramsPromise }: PageProps) => {
  const [programId, setProgramId] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [program, setProgram] = useState<any | null>(null);
  const [selectedModule, setSelectedModule] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();
  const [enrollmentStatus, setEnrollmentStatus] = useState<any | null>(null);

  const session = useSession();
  const sessionData = session?.data as NextAuthUserSession;

  const userId = sessionData?.user?.id;

  useEffect(() => {
    paramsPromise.then((resolvedParams) => {
      setProgramId(resolvedParams.id);
    });
  }, [paramsPromise]);

  const fetchProgram = useCallback(async () => {
    if (!programId) return;
    setLoading(true);
    try {
      const response = await requestClient({
        token: sessionData?.user?.token,
      }).get(`/programs/${programId}`);
      if (response.status === 200) {
        setProgram(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load course data.");
    } finally {
      setLoading(false);
    }
  }, [programId, sessionData?.user?.token]);

  const fetchEnrollmentStatus = useCallback(async () => {
    if (!programId) return;
    setLoading(true);
    try {
      const response = await requestClient({
        token: sessionData?.user?.token,
      }).get(`/enrollments/${userId}/${programId}`);
      setEnrollmentStatus(response.data);
    } catch (error) {
      console.error("Error fetching enrollment status:", error);
      toast.error("Error fetching enrollment status");
    } finally {
      setLoading(false);
    }
  }, [userId, programId, sessionData?.user?.token]);

  useEffect(() => {
    if (!userId || !sessionData || !programId) return;
    fetchEnrollmentStatus();
    fetchProgram();
  }, [userId, programId, fetchEnrollmentStatus, fetchProgram, sessionData]);

  const handleEnroll = () => {
    if (!userId || !programId) {
      toast.error("User or program is invalid.");
      return;
    }

    startTransition(async () => {
      try {
        await requestClient({ token: sessionData?.user?.token }).post(
          "/enrollments",
          {
            userId: userId,
            programId: Number(programId),
          }
        );
        fetchEnrollmentStatus();
        toast.success("You have successfully enrolled!");
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while enrolling.");
      }
    });
  };

  return (
    <Box p={5}>
      {loading ? (
        <LoadingState />
      ) : (
        <Box className="border rounded-lg shadow-sm bg-white p-4">
          <Flex
            cursor="pointer"
            onClick={() => router.back()}
            align="center"
            gap={2}
          >
            <ArrowLeft className="w-5 h-auto text-gray-500" />
            <Text fontSize="14px" color="gray.600">
              Back
            </Text>
          </Flex>

          <Box p={8}>
            <Heading mb={2}>{program?.title}</Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              {program?.description}
            </Text>

            {program?.image && (
              <Image
                src={program?.image}
                alt={program?.title}
                boxSize="500px"
                w="full"
                borderRadius="md"
                mb={6}
              />
            )}

            {enrollmentStatus?.enrolled ? (
              <Box mb={6}>
                <Text fontSize="md" color="green.600" mb={2}>
                  You are enrolled in this course.
                </Text>
                {enrollmentStatus.enrollmentStatus === "ACTIVE" &&
                  enrollmentStatus.enrolledAt && (
                    <Text fontSize="sm">
                      Enrolled on:{" "}
                      {new Date(
                        enrollmentStatus.enrolledAt
                      ).toLocaleDateString()}
                    </Text>
                  )}
                {enrollmentStatus.enrollmentStatus === "COMPLETED" && (
                  <Text fontSize="sm" color="blue.600">
                    Course Completed
                  </Text>
                )}
              </Box>
            ) : (
              <Button
                colorScheme="red"
                onClick={handleEnroll}
                isLoading={isPending}
                loadingText="Enrolling..."
                mb={6}
              >
                Enroll Now
              </Button>
            )}

            <Heading size="md" mb={3}>
              Course Modules
            </Heading>
            {program?.modules && program?.modules.length > 0 ? (
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={6}
                mb={6}
              >
                {program?.modules.map((module: any) => (
                  <Card
                    key={module.id}
                    onClick={() => setSelectedModule(module)}
                  >
                    <CardBody>
                      <Heading size="sm">{module.title}</Heading>
                      <Text>{module.description}</Text>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            ) : (
              <Text>No modules found.</Text>
            )}

            {selectedModule && (
              <UnorderedList>
                {JSON.parse(selectedModule.content).map(
                  (item: string, i: any) => (
                    <ListItem key={i}>{item}</ListItem>
                  )
                )}
              </UnorderedList>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Page;
