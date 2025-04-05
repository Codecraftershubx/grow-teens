import express from "express";
import { 
  getOrCreateSession, 
  saveMessages, 
  submitFeedback, 
  listSessions,
  deleteSession,
  updateSessionTitle
} from "../controllers/chatbot.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Session management
router.get("/sessions", authMiddleware, listSessions);
router.get("/session", authMiddleware, getOrCreateSession);
router.put("/session/:sessionId", authMiddleware, updateSessionTitle);
router.delete("/session/:sessionId", authMiddleware, deleteSession);

// Message handling
router.post("/messages", authMiddleware, saveMessages);
router.post("/feedback/:messageId", authMiddleware, submitFeedback);

export default router;
