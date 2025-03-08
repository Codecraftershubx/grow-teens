import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { BusinessStatus } from "../constants/enum";

export interface Account {
  providerAccountId: number | string;
  type: "oauth" | "credentials";
  provider: "google" | "credentials";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  active: boolean;
  status?: number;
  avatar?: string;
  picture?: string;
  owner: boolean;
  emailVerifiedAt: string;
  entityType: string;
  businessName: string;
  businessStatus: BusinessStatus;
  completeProfile: boolean;
  createdAt?: string;
  updatedAt?: string;
  dateJoined?: string;
}

export interface SingleUser {
  user: User & {
    business: Vendor;
  };
}

export interface NextAuthUserSession extends Session {
  user: User & {
    account: Account;
    token?: string;
  };
}

interface NextAuthUserSessionWithToken extends JWT {
  name: string;
  email: string;
  picture: string;
  sub: string;
  id: number;
  active: boolean;
  emailVerifiedAt: string;
  entityType: string;
  businessName: string;
  businessStatus: string;
  owner: boolean;
  completeProfile: boolean;
  token: string;
  account: Account;
  iat: number;
  exp: number;
  jti: string;
}

export interface EmailVerified {
  emailVerifiedAt: string;
}

export interface CustomerData {
  id: number;
  identifier: string;
  avatarId: number | null;
  name: string;
  email: string;
  phone: string;
  active: number;
  reference: string | null;
  lastEvaluationHistory: unknown;
  businessId: number;
  createdAt: string;
  updatedAt: string;
}
