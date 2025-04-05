/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import {
  Box,
  Button,
  Card,
  Heading,
  Text,
  Flex,
  Progress,
  Badge,
  IconButton,
  useToast,
  Spinner,
  Center,
  VStack,
} from "@chakra-ui/react";
import { FiThumbsUp, FiThumbsDown, FiRefreshCw, FiPlus } from "react-icons/fi";
import { useParams } from "next/navigation";
import requestClient from "@/lib/requestClient";
import { useSession } from "next-auth/react";
import { NextAuthUserSession } from "@/types";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  tags?: string;
  difficultyLevel: number;
  timesReviewed: number;
  lastReviewed?: Date;
  userId: number;
  programId?: number;
  moduleId?: number;
}

export default function FlashcardStudyPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  const toast = useToast();
  const moduleId = Number(params.moduleId);

  const session = useSession();
  const sessionData = session.data as NextAuthUserSession;

  const loadFlashcards = useCallback(() => {
    if (!sessionData?.user?.token) return;

    startTransition(async () => {
      try {
        setLoading(true);
        const response = await requestClient({
          token: sessionData?.user?.token,
        }).get(`/flashcards?moduleId=${moduleId}`);

        if (response.data) {
          setFlashcards(response.data.data || []);
          setCurrentIndex(0);
          setShowAnswer(false);
        }
      } catch (error) {
        console.error("Error loading flashcards:", error);
        toast({
          title: "Error loading flashcards",
          status: "error",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    });
  }, [moduleId, sessionData?.user?.token, toast]);

  const generateFlashcards = useCallback(() => {
    if (!sessionData?.user?.token) return;

    startTransition(async () => {
      try {
        setLoading(true);
        const response = await requestClient({
          token: sessionData?.user?.token,
        }).post("/flashcards/generate", { moduleId, count: 5 });

        if (response.data) {
          toast({
            title: "Flashcards generated successfully!",
            status: "success",
            duration: 3000,
          });
          loadFlashcards();
        }
      } catch (error) {
        console.error("Failed to generate flashcards:", error);
        toast({
          title: "Failed to generate flashcards",
          status: "error",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    });
  }, [moduleId, sessionData?.user?.token, loadFlashcards, toast]);

  const recordInteraction = useCallback(
    (flashcardId: number, correct: boolean) => {
      if (!sessionData?.user?.token) return;

      startTransition(async () => {
        try {
          await requestClient({
            token: sessionData?.user?.token,
          }).post(`/flashcards/${flashcardId}/interaction`, {
            correct,
            responseTime: Math.floor(Math.random() * 10) + 2, // Mock response time between 2-12 seconds
          });

          // No need to reload, we'll move to the next card
        } catch (error) {
          console.error("Error recording interaction:", error);
        }
      });
    },
    [sessionData?.user?.token]
  );

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const card = flashcards[currentIndex];
      recordInteraction(card.id, correct);

      // Move to next card
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      } else {
        toast({
          title: "You completed all flashcards!",
          description: "Great job studying this module.",
          status: "success",
          duration: 5000,
        });
      }
    },
    [currentIndex, flashcards, recordInteraction, toast]
  );

  // Initial data loading
  useEffect(() => {
    if (sessionData?.user) {
      loadFlashcards();
    }
  }, [loadFlashcards, sessionData]);

  if (loading || isPending) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (flashcards.length === 0) {
    return (
      <Box p={8} textAlign="center">
        <VStack spacing={6}>
          <Heading size="lg">No Flashcards Available</Heading>
          <Text>This module doesn&apos;t have any flashcards yet.</Text>
          <Button
            colorScheme="primary"
            leftIcon={<FiPlus />}
            onClick={generateFlashcards}
            isLoading={isPending}
            size="lg"
          >
            Generate Flashcards with AI
          </Button>
        </VStack>
      </Box>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <Box p={4} maxW="container.lg" mx="auto">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Flashcard Study</Heading>
        <Button
          leftIcon={<FiRefreshCw />}
          onClick={loadFlashcards}
          isLoading={isPending}
          variant="outline"
        >
          Refresh
        </Button>
      </Flex>

      <Progress
        value={(currentIndex / flashcards.length) * 100}
        mb={8}
        borderRadius="md"
      />

      <Flex justifyContent="space-between" mb={2}>
        <Text>
          Card {currentIndex + 1} of {flashcards.length}
        </Text>
        <Button
          size="sm"
          variant="ghost"
          onClick={generateFlashcards}
          isLoading={isPending}
        >
          Generate More
        </Button>
      </Flex>

      <Card p={8} mb={6} boxShadow="lg" borderRadius="lg">
        <Box minH="200px">
          {!showAnswer ? (
            <Box>
              <Heading size="md" mb={4} color="gray.500">
                Question
              </Heading>
              <Text fontSize="xl">{currentCard.question}</Text>
            </Box>
          ) : (
            <Box>
              <Heading size="md" mb={4} color="gray.500">
                Answer
              </Heading>
              <Text fontSize="xl">{currentCard.answer}</Text>
            </Box>
          )}
        </Box>

        {currentCard.tags && (
          <Flex mt={4} gap={2} flexWrap="wrap">
            {currentCard.tags.split(",").map((tag, index) => (
              <Badge key={index} colorScheme="primary" px={2} py={1}>
                {tag.trim()}
              </Badge>
            ))}
          </Flex>
        )}
      </Card>

      {!showAnswer ? (
        <Button
          colorScheme="primary"
          size="lg"
          width="full"
          onClick={() => setShowAnswer(true)}
        >
          Show Answer
        </Button>
      ) : (
        <Flex gap={4}>
          <IconButton
            aria-label="Didn't know"
            icon={<FiThumbsDown />}
            colorScheme="red"
            flex={1}
            size="lg"
            onClick={() => handleAnswer(false)}
            isDisabled={isPending}
          />
          <IconButton
            aria-label="Got it right"
            icon={<FiThumbsUp />}
            colorScheme="green"
            flex={1}
            size="lg"
            onClick={() => handleAnswer(true)}
            isDisabled={isPending}
          />
        </Flex>
      )}
    </Box>
  );
}
