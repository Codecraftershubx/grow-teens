import prisma from "../prismaClient.js";

export const getUserFlashcards = async (req, res) => {
  const userId = req.user.id;
  const { moduleId, programId, collectionId } = req.query;

  try {
    let flashcards;

    if (collectionId) {
      // Get flashcards from a specific collection
      flashcards = await prisma.flashcardCollectionItem.findMany({
        where: {
          collectionId: Number(collectionId),
          collection: { userId },
        },
        include: { flashcard: true },
      });
      flashcards = flashcards.map((item) => item.flashcard);
    } else {
      // Query based on filters
      flashcards = await prisma.flashcard.findMany({
        where: {
          userId,
          ...(moduleId ? { moduleId: Number(moduleId) } : {}),
          ...(programId ? { programId: Number(programId) } : {}),
        },
        orderBy: { lastReviewed: "asc" },
      });
    }

    res.json(flashcards);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    res.status(500).json({ message: "Failed to fetch flashcards" });
  }
};

export const createFlashcardInteraction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { correct, responseTime } = req.body;

    // Record the interaction
    const interaction = await prisma.flashcardInteraction.create({
      data: {
        flashcardId: Number(id),
        userId,
        correct,
        responseTime,
      },
    });

    // Update the flashcard's review data
    await prisma.flashcard.update({
      where: { id: Number(id) },
      data: {
        lastReviewed: new Date(),
        timesReviewed: { increment: 1 },
      },
    });

    res.json(interaction);
  } catch (error) {
    console.error("Error recording interaction:", error);
    res.status(500).json({ message: "Failed to record interaction" });
  }
};

// Additional controller methods for flashcard collections
export const createFlashcardCollection = async (req, res) => {
  try {
    const { name, description, isPublic = false } = req.body;
    const userId = req.user.id;

    const collection = await prisma.flashcardCollection.create({
      data: {
        name,
        description,
        isPublic,
        userId,
      },
    });

    res.status(201).json(collection);
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ message: "Failed to create collection" });
  }
};

export const addFlashcardToCollection = async (req, res) => {
  try {
    const { collectionId, flashcardId } = req.body;
    const userId = req.user.id;

    // Verify ownership
    const collection = await prisma.flashcardCollection.findUnique({
      where: { id: Number(collectionId), userId },
    });

    if (!collection) {
      return res.status(403).json({ message: "Collection not found or access denied" });
    }

    const item = await prisma.flashcardCollectionItem.create({
      data: {
        collectionId: Number(collectionId),
        flashcardId: Number(flashcardId),
      },
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("Error adding to collection:", error);
    res.status(500).json({ message: "Failed to add to collection" });
  }
};
