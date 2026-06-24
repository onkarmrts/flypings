export type PlanId = "starter" | "growth" | "pro" | "agency";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;              // INR per month
  priceAnnual: number;        // INR per year (discounted)
  limits: {
    instagramAccounts: number;
    automationsPerAccount: number;
    dmsPerMonth: number;
    teamMembers: number;
    analyticsRetentionDays: number;
  };
  features: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  planId: PlanId;
  status: "active" | "past_due" | "cancelled" | "trialing";
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 999,
    priceAnnual: 8999,
    limits: {
      instagramAccounts: 1,
      automationsPerAccount: 3,
      dmsPerMonth: 500,
      teamMembers: 1,
      analyticsRetentionDays: 7,
    },
    features: [
      "1 Instagram account",
      "3 automations",
      "500 DMs/month",
      "Comment-to-DM",
      "Basic analytics",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 2499,
    priceAnnual: 22999,
    limits: {
      instagramAccounts: 3,
      automationsPerAccount: 10,
      dmsPerMonth: 3000,
      teamMembers: 2,
      analyticsRetentionDays: 30,
    },
    features: [
      "3 Instagram accounts",
      "10 automations each",
      "3,000 DMs/month",
      "UPI Payment DMs",
      "Story Poll funnels",
      "Lead CRM",
      "WhatsApp handoff",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 4999,
    priceAnnual: 44999,
    limits: {
      instagramAccounts: 10,
      automationsPerAccount: 50,
      dmsPerMonth: 15000,
      teamMembers: 5,
      analyticsRetentionDays: 90,
    },
    features: [
      "10 Instagram accounts",
      "50 automations each",
      "15,000 DMs/month",
      "AI-personalized DMs",
      "Live comment triggers",
      "Lost lead recovery",
      "Regional language templates",
      "Funnel analytics per post",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    price: 9999,
    priceAnnual: 89999,
    limits: {
      instagramAccounts: 50,
      automationsPerAccount: 999,
      dmsPerMonth: 100000,
      teamMembers: 20,
      analyticsRetentionDays: 365,
    },
    features: [
      "50 Instagram accounts",
      "Unlimited automations",
      "1,00,000 DMs/month",
      "Client dashboard",
      "White-label reports",
      "Dedicated support",
      "API access",
    ],
  },
];
