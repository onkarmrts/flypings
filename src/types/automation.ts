export type TriggerType =
  | "comment_keyword"
  | "story_reply"
  | "story_poll_vote"
  | "dm_keyword"
  | "live_comment"
  | "mention";

export type ActionType =
  | "send_dm"
  | "send_dm_with_link"
  | "send_upi_link"
  | "send_whatsapp_redirect"
  | "add_to_leads"
  | "tag_lead";

export interface TriggerConfig {
  type: TriggerType;
  keywords?: string[];           // ["LINK", "BUY", "JOIN"]
  pollOption?: "A" | "B" | "C" | "D";
  postId?: string;               // specific post or "any"
  caseSensitive?: boolean;
}

export interface ActionConfig {
  type: ActionType;
  message: string;               // DM message template (supports {{name}}, {{username}})
  link?: string;                 // URL or UPI deep link
  upiId?: string;                // For UPI payment actions
  upiAmount?: number;
  upiNote?: string;
  whatsappNumber?: string;
  delay?: number;                // delay in seconds before sending
}

export interface Automation {
  id: string;
  name: string;
  description?: string;
  accountId: string;
  trigger: TriggerConfig;
  actions: ActionConfig[];
  isActive: boolean;
  replyOnce: boolean;            // don't DM same user twice for same post
  createdAt: Date;
  updatedAt: Date;
  stats: AutomationStats;
}

export interface AutomationStats {
  triggered: number;
  dmsSent: number;
  linksClicked: number;
  conversions: number;
}

export type AutomationTemplate =
  | "comment_to_link"
  | "comment_to_upi"
  | "story_poll_funnel"
  | "live_join_link"
  | "mention_reply"
  | "lost_lead_recovery";
