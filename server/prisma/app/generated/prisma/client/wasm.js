
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  role: 'role',
  dateOfBirth: 'dateOfBirth',
  age: 'age',
  phone: 'phone',
  country: 'country',
  city: 'city',
  bio: 'bio',
  profileImage: 'profileImage',
  gender: 'gender',
  isActive: 'isActive',
  emailVerified: 'emailVerified',
  verificationToken: 'verificationToken',
  verificationExpires: 'verificationExpires',
  lastActive: 'lastActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FlashcardScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  courseId: 'courseId',
  moduleId: 'moduleId',
  question: 'question',
  answer: 'answer',
  difficultyLevel: 'difficultyLevel',
  tags: 'tags',
  aiGenerated: 'aiGenerated',
  createdAt: 'createdAt',
  lastReviewed: 'lastReviewed',
  timesReviewed: 'timesReviewed',
  confidenceLevel: 'confidenceLevel',
  aiModel: 'aiModel',
  generationPrompt: 'generationPrompt',
  sourceContentSnippet: 'sourceContentSnippet'
};

exports.Prisma.FlashcardInteractionScalarFieldEnum = {
  id: 'id',
  flashcardId: 'flashcardId',
  userId: 'userId',
  correct: 'correct',
  responseTime: 'responseTime',
  interactionDate: 'interactionDate'
};

exports.Prisma.FlashcardCollectionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  userId: 'userId',
  createdAt: 'createdAt',
  isPublic: 'isPublic'
};

exports.Prisma.FlashcardCollectionItemScalarFieldEnum = {
  id: 'id',
  collectionId: 'collectionId',
  flashcardId: 'flashcardId',
  addedAt: 'addedAt'
};

exports.Prisma.ChatbotSessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isActive: 'isActive'
};

exports.Prisma.ChatbotMessageScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  content: 'content',
  role: 'role',
  timestamp: 'timestamp',
  referencedContent: 'referencedContent',
  courseId: 'courseId',
  moduleId: 'moduleId',
  model: 'model',
  promptTokens: 'promptTokens',
  completionTokens: 'completionTokens'
};

exports.Prisma.ChatbotFeedbackScalarFieldEnum = {
  id: 'id',
  messageId: 'messageId',
  userId: 'userId',
  rating: 'rating',
  feedback: 'feedback',
  createdAt: 'createdAt'
};

exports.Prisma.ChatbotSessionAnalyticsScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  messageCount: 'messageCount',
  userMessageCount: 'userMessageCount',
  aiMessageCount: 'aiMessageCount',
  averageUserMessageLength: 'averageUserMessageLength',
  averageAiResponseLength: 'averageAiResponseLength',
  topicsDiscussed: 'topicsDiscussed'
};

exports.Prisma.SavedAnswerScalarFieldEnum = {
  id: 'id',
  question: 'question',
  answer: 'answer',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isPublic: 'isPublic',
  userId: 'userId',
  courseId: 'courseId'
};

exports.Prisma.SkillScalarFieldEnum = {
  id: 'id',
  name: 'name',
  category: 'category',
  description: 'description',
  icon: 'icon'
};

exports.Prisma.UserSkillScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  skillId: 'skillId',
  proficiencyLevel: 'proficiencyLevel',
  acquiredDate: 'acquiredDate'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  description: 'description',
  overview: 'overview',
  thumbnail: 'thumbnail',
  coverImage: 'coverImage',
  type: 'type',
  difficulty: 'difficulty',
  instructorId: 'instructorId',
  durationHours: 'durationHours',
  isFeatured: 'isFeatured',
  isPublished: 'isPublished',
  startDate: 'startDate',
  endDate: 'endDate',
  enrollmentLimit: 'enrollmentLimit',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CourseTagsScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  name: 'name'
};

exports.Prisma.LearningOutcomeScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  description: 'description',
  orderNumber: 'orderNumber'
};

exports.Prisma.CourseRequirementScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  description: 'description',
  orderNumber: 'orderNumber'
};

exports.Prisma.CourseModuleScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  title: 'title',
  description: 'description',
  orderNumber: 'orderNumber',
  isPublished: 'isPublished',
  estimatedHours: 'estimatedHours',
  unlockCondition: 'unlockCondition',
  thumbnail: 'thumbnail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContentUnitScalarFieldEnum = {
  id: 'id',
  moduleId: 'moduleId',
  title: 'title',
  description: 'description',
  contentType: 'contentType',
  orderNumber: 'orderNumber',
  estimatedMinutes: 'estimatedMinutes',
  isRequired: 'isRequired',
  textContent: 'textContent',
  videoUrl: 'videoUrl',
  audioUrl: 'audioUrl',
  fileUrl: 'fileUrl',
  externalUrl: 'externalUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UnitAttachmentScalarFieldEnum = {
  id: 'id',
  unitId: 'unitId',
  title: 'title',
  description: 'description',
  fileUrl: 'fileUrl',
  fileType: 'fileType'
};

exports.Prisma.EnrollmentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  courseId: 'courseId',
  enrollmentDate: 'enrollmentDate',
  status: 'status',
  completionDate: 'completionDate',
  progressPercentage: 'progressPercentage',
  lastAccessedAt: 'lastAccessedAt',
  unenrollmentDate: 'unenrollmentDate',
  unenrollmentReason: 'unenrollmentReason'
};

exports.Prisma.ModuleProgressScalarFieldEnum = {
  id: 'id',
  enrollmentId: 'enrollmentId',
  moduleId: 'moduleId',
  userId: 'userId',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  progressPercentage: 'progressPercentage'
};

exports.Prisma.UnitProgressScalarFieldEnum = {
  id: 'id',
  enrollmentId: 'enrollmentId',
  unitId: 'unitId',
  userId: 'userId',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  timeSpentMinutes: 'timeSpentMinutes',
  lastPosition: 'lastPosition'
};

exports.Prisma.QuizScalarFieldEnum = {
  id: 'id',
  moduleId: 'moduleId',
  title: 'title',
  description: 'description',
  timeLimit: 'timeLimit',
  passingScore: 'passingScore',
  allowRetakes: 'allowRetakes',
  maxAttempts: 'maxAttempts',
  randomizeQuestions: 'randomizeQuestions',
  showCorrectAnswers: 'showCorrectAnswers',
  orderNumber: 'orderNumber',
  isPublished: 'isPublished'
};

exports.Prisma.QuizQuestionScalarFieldEnum = {
  id: 'id',
  quizId: 'quizId',
  questionText: 'questionText',
  questionType: 'questionType',
  points: 'points',
  orderNumber: 'orderNumber',
  options: 'options',
  correctAnswer: 'correctAnswer',
  explanation: 'explanation'
};

exports.Prisma.QuizAttemptScalarFieldEnum = {
  id: 'id',
  enrollmentId: 'enrollmentId',
  quizId: 'quizId',
  userId: 'userId',
  startedAt: 'startedAt',
  submittedAt: 'submittedAt',
  score: 'score',
  percentage: 'percentage',
  passed: 'passed',
  attemptNumber: 'attemptNumber'
};

exports.Prisma.QuestionAnswerScalarFieldEnum = {
  id: 'id',
  attemptId: 'attemptId',
  questionId: 'questionId',
  userAnswer: 'userAnswer',
  isCorrect: 'isCorrect',
  pointsAwarded: 'pointsAwarded'
};

exports.Prisma.ExerciseScalarFieldEnum = {
  id: 'id',
  moduleId: 'moduleId',
  title: 'title',
  description: 'description',
  instructions: 'instructions',
  exerciseType: 'exerciseType',
  orderNumber: 'orderNumber',
  dueDate: 'dueDate',
  allowLateSubmissions: 'allowLateSubmissions',
  maxScore: 'maxScore'
};

exports.Prisma.ExerciseSubmissionScalarFieldEnum = {
  id: 'id',
  exerciseId: 'exerciseId',
  enrollmentId: 'enrollmentId',
  userId: 'userId',
  submittedAt: 'submittedAt',
  content: 'content',
  fileUrl: 'fileUrl',
  score: 'score',
  feedback: 'feedback',
  gradedAt: 'gradedAt',
  gradedBy: 'gradedBy'
};

exports.Prisma.CourseReviewScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  userId: 'userId',
  rating: 'rating',
  comment: 'comment',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isPublished: 'isPublished'
};

exports.Prisma.MentorshipProgramScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  startDate: 'startDate',
  endDate: 'endDate',
  maxMentees: 'maxMentees',
  isActive: 'isActive'
};

exports.Prisma.MentorshipScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  menteeId: 'menteeId',
  programId: 'programId',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status'
};

exports.Prisma.MentorshipSessionScalarFieldEnum = {
  id: 'id',
  relationshipId: 'relationshipId',
  sessionDate: 'sessionDate',
  durationMinutes: 'durationMinutes',
  notes: 'notes',
  status: 'status',
  feedback: 'feedback'
};

exports.Prisma.EventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  eventDate: 'eventDate',
  startTime: 'startTime',
  endTime: 'endTime',
  location: 'location',
  virtualLink: 'virtualLink',
  isVirtual: 'isVirtual',
  maxParticipants: 'maxParticipants',
  thumbnail: 'thumbnail',
  registrationDeadline: 'registrationDeadline'
};

exports.Prisma.EventRegistrationScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  userId: 'userId',
  registrationDate: 'registrationDate',
  attendanceConfirmed: 'attendanceConfirmed'
};

exports.Prisma.CommunityScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  thumbnail: 'thumbnail',
  creatorId: 'creatorId',
  createdAt: 'createdAt',
  isPrivate: 'isPrivate'
};

exports.Prisma.CommunityMemberScalarFieldEnum = {
  id: 'id',
  communityId: 'communityId',
  userId: 'userId',
  joinedDate: 'joinedDate',
  role: 'role'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  authorId: 'authorId',
  communityId: 'communityId',
  title: 'title',
  content: 'content',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  userId: 'userId',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  creatorId: 'creatorId',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  githubUrl: 'githubUrl',
  demoUrl: 'demoUrl',
  thumbnail: 'thumbnail'
};

exports.Prisma.ProjectMemberScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  userId: 'userId',
  role: 'role',
  joinedDate: 'joinedDate'
};

exports.Prisma.SponsorScalarFieldEnum = {
  id: 'id',
  organizationName: 'organizationName',
  contactPerson: 'contactPerson',
  email: 'email',
  phone: 'phone',
  website: 'website',
  logo: 'logo',
  description: 'description',
  partnershipStart: 'partnershipStart'
};

exports.Prisma.SponsorshipScalarFieldEnum = {
  id: 'id',
  sponsorId: 'sponsorId',
  title: 'title',
  description: 'description',
  amount: 'amount',
  type: 'type',
  startDate: 'startDate',
  endDate: 'endDate'
};

exports.Prisma.AchievementScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  badgeImage: 'badgeImage',
  points: 'points',
  category: 'category'
};

exports.Prisma.UserAchievementScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  achievementId: 'achievementId',
  earnedDate: 'earnedDate'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  isRead: 'isRead',
  createdAt: 'createdAt',
  type: 'type',
  actionUrl: 'actionUrl'
};

exports.Prisma.ResourceScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  fileUrl: 'fileUrl',
  type: 'type',
  uploaderId: 'uploaderId',
  uploadDate: 'uploadDate',
  isApproved: 'isApproved'
};

exports.Prisma.AssessmentScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  title: 'title',
  description: 'description',
  totalPoints: 'totalPoints',
  passingPoints: 'passingPoints',
  createdAt: 'createdAt'
};

exports.Prisma.AssessmentQuestionScalarFieldEnum = {
  id: 'id',
  assessmentId: 'assessmentId',
  question: 'question',
  questionType: 'questionType',
  points: 'points',
  orderNumber: 'orderNumber',
  options: 'options',
  correctAnswer: 'correctAnswer'
};

exports.Prisma.UserAssessmentAttemptScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  assessmentId: 'assessmentId',
  score: 'score',
  passed: 'passed',
  attemptDate: 'attemptDate',
  attemptNumber: 'attemptNumber',
  answers: 'answers'
};

exports.Prisma.FeedbackScalarFieldEnum = {
  id: 'id',
  providerId: 'providerId',
  targetId: 'targetId',
  targetType: 'targetType',
  rating: 'rating',
  comment: 'comment',
  createdAt: 'createdAt'
};

exports.Prisma.SubscriberScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserRole = exports.$Enums.UserRole = {
  TEEN: 'TEEN',
  MENTOR: 'MENTOR',
  SPONSORS: 'SPONSORS',
  ADMIN: 'ADMIN'
};

exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
  PREFER_NOT_TO_SAY: 'PREFER_NOT_TO_SAY'
};

exports.MessageRole = exports.$Enums.MessageRole = {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT'
};

exports.CourseType = exports.$Enums.CourseType = {
  HEALTH: 'HEALTH',
  TECH: 'TECH',
  FINANCIAL_LITERACY: 'FINANCIAL_LITERACY',
  LEADERSHIP: 'LEADERSHIP',
  ENTREPRENEURSHIP: 'ENTREPRENEURSHIP',
  PERSONAL_DEVELOPMENT: 'PERSONAL_DEVELOPMENT',
  CAREER: 'CAREER',
  CREATIVITY: 'CREATIVITY',
  ACADEMIC: 'ACADEMIC'
};

exports.DifficultyLevel = exports.$Enums.DifficultyLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  EXPERT: 'EXPERT'
};

exports.ContentType = exports.$Enums.ContentType = {
  VIDEO: 'VIDEO',
  TEXT: 'TEXT',
  AUDIO: 'AUDIO',
  INTERACTIVE: 'INTERACTIVE',
  ASSIGNMENT: 'ASSIGNMENT',
  RESOURCE: 'RESOURCE'
};

exports.EnrollmentStatus = exports.$Enums.EnrollmentStatus = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  UNENROLLED: 'UNENROLLED',
  EXPIRED: 'EXPIRED',
  SUSPENDED: 'SUSPENDED'
};

exports.QuestionType = exports.$Enums.QuestionType = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  SHORT_ANSWER: 'SHORT_ANSWER',
  ESSAY: 'ESSAY',
  FILE_UPLOAD: 'FILE_UPLOAD'
};

exports.ExerciseType = exports.$Enums.ExerciseType = {
  WRITTEN: 'WRITTEN',
  FILE_UPLOAD: 'FILE_UPLOAD',
  PROJECT: 'PROJECT',
  CODE: 'CODE',
  REFLECTION: 'REFLECTION'
};

exports.StatusType = exports.$Enums.StatusType = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

exports.SessionStatus = exports.$Enums.SessionStatus = {
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  MISSED: 'MISSED'
};

exports.CommunityRole = exports.$Enums.CommunityRole = {
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
  MEMBER: 'MEMBER'
};

exports.ProjectStatus = exports.$Enums.ProjectStatus = {
  PLANNING: 'PLANNING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED'
};

exports.ProjectRole = exports.$Enums.ProjectRole = {
  LEADER: 'LEADER',
  MEMBER: 'MEMBER',
  CONTRIBUTOR: 'CONTRIBUTOR',
  OBSERVER: 'OBSERVER'
};

exports.SponsorshipType = exports.$Enums.SponsorshipType = {
  FINANCIAL: 'FINANCIAL',
  IN_KIND: 'IN_KIND',
  COURSE: 'COURSE',
  EVENT: 'EVENT',
  SCHOLARSHIP: 'SCHOLARSHIP'
};

exports.AchievementCategory = exports.$Enums.AchievementCategory = {
  COURSE_COMPLETION: 'COURSE_COMPLETION',
  SKILL_MASTERY: 'SKILL_MASTERY',
  COMMUNITY_CONTRIBUTION: 'COMMUNITY_CONTRIBUTION',
  PROJECT_MILESTONE: 'PROJECT_MILESTONE',
  MENTORSHIP: 'MENTORSHIP',
  LEADERSHIP: 'LEADERSHIP'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  COURSE: 'COURSE',
  MENTORSHIP: 'MENTORSHIP',
  COMMUNITY: 'COMMUNITY',
  ACHIEVEMENT: 'ACHIEVEMENT',
  SYSTEM: 'SYSTEM',
  EVENT: 'EVENT'
};

exports.ResourceType = exports.$Enums.ResourceType = {
  DOCUMENT: 'DOCUMENT',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  IMAGE: 'IMAGE',
  LINK: 'LINK',
  CODE: 'CODE'
};

exports.FeedbackTarget = exports.$Enums.FeedbackTarget = {
  USER: 'USER',
  COURSE: 'COURSE',
  MENTOR: 'MENTOR',
  EVENT: 'EVENT',
  RESOURCE: 'RESOURCE'
};

exports.Prisma.ModelName = {
  User: 'User',
  Flashcard: 'Flashcard',
  FlashcardInteraction: 'FlashcardInteraction',
  FlashcardCollection: 'FlashcardCollection',
  FlashcardCollectionItem: 'FlashcardCollectionItem',
  ChatbotSession: 'ChatbotSession',
  ChatbotMessage: 'ChatbotMessage',
  ChatbotFeedback: 'ChatbotFeedback',
  ChatbotSessionAnalytics: 'ChatbotSessionAnalytics',
  SavedAnswer: 'SavedAnswer',
  Skill: 'Skill',
  UserSkill: 'UserSkill',
  Course: 'Course',
  CourseTags: 'CourseTags',
  LearningOutcome: 'LearningOutcome',
  CourseRequirement: 'CourseRequirement',
  CourseModule: 'CourseModule',
  ContentUnit: 'ContentUnit',
  UnitAttachment: 'UnitAttachment',
  Enrollment: 'Enrollment',
  ModuleProgress: 'ModuleProgress',
  UnitProgress: 'UnitProgress',
  Quiz: 'Quiz',
  QuizQuestion: 'QuizQuestion',
  QuizAttempt: 'QuizAttempt',
  QuestionAnswer: 'QuestionAnswer',
  Exercise: 'Exercise',
  ExerciseSubmission: 'ExerciseSubmission',
  CourseReview: 'CourseReview',
  MentorshipProgram: 'MentorshipProgram',
  Mentorship: 'Mentorship',
  MentorshipSession: 'MentorshipSession',
  Event: 'Event',
  EventRegistration: 'EventRegistration',
  Community: 'Community',
  CommunityMember: 'CommunityMember',
  Post: 'Post',
  Comment: 'Comment',
  Project: 'Project',
  ProjectMember: 'ProjectMember',
  Sponsor: 'Sponsor',
  Sponsorship: 'Sponsorship',
  Achievement: 'Achievement',
  UserAchievement: 'UserAchievement',
  Notification: 'Notification',
  Resource: 'Resource',
  Assessment: 'Assessment',
  AssessmentQuestion: 'AssessmentQuestion',
  UserAssessmentAttempt: 'UserAssessmentAttempt',
  Feedback: 'Feedback',
  Subscriber: 'Subscriber'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
