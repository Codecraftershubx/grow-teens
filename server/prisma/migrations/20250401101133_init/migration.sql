-- AlterTable
ALTER TABLE "ChatbotMessage" ADD COLUMN     "completionTokens" INTEGER,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "promptTokens" INTEGER;

-- AlterTable
ALTER TABLE "Flashcard" ADD COLUMN     "aiModel" TEXT,
ADD COLUMN     "generationPrompt" TEXT,
ADD COLUMN     "sourceContentSnippet" TEXT;

-- AlterTable
ALTER TABLE "SavedAnswer" ADD COLUMN     "programId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "ChatbotSessionAnalytics" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "userMessageCount" INTEGER NOT NULL DEFAULT 0,
    "aiMessageCount" INTEGER NOT NULL DEFAULT 0,
    "averageUserMessageLength" INTEGER,
    "averageAiResponseLength" INTEGER,
    "topicsDiscussed" TEXT,

    CONSTRAINT "ChatbotSessionAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatbotSessionAnalytics_sessionId_key" ON "ChatbotSessionAnalytics"("sessionId");

-- CreateIndex
CREATE INDEX "ChatbotMessage_role_idx" ON "ChatbotMessage"("role");

-- CreateIndex
CREATE INDEX "SavedAnswer_category_idx" ON "SavedAnswer"("category");

-- CreateIndex
CREATE INDEX "SavedAnswer_userId_idx" ON "SavedAnswer"("userId");

-- CreateIndex
CREATE INDEX "SavedAnswer_programId_idx" ON "SavedAnswer"("programId");

-- AddForeignKey
ALTER TABLE "ChatbotSessionAnalytics" ADD CONSTRAINT "ChatbotSessionAnalytics_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatbotSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedAnswer" ADD CONSTRAINT "SavedAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedAnswer" ADD CONSTRAINT "SavedAnswer_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;
