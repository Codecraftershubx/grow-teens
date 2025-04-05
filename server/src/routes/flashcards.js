import express from "express";
import { 
  getUserFlashcards, 
  createFlashcardInteraction, 
  createFlashcardCollection, 
  addFlashcardToCollection,
} from "../controllers/flashcards.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getUserFlashcards);

// Flashcard interactions for spaced repetition
router.post("/:id/interaction", authMiddleware, createFlashcardInteraction);

// Collection management
router.post("/collections", authMiddleware, createFlashcardCollection);
router.post("/collections/add", authMiddleware, addFlashcardToCollection);

export default router;
