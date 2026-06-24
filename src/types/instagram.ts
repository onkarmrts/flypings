export interface InstagramAccount {
  id: string;
  username: string;
  name: string;
  profilePicUrl: string;
  accessToken: string;
  followersCount: number;
  mediaCount: number;
  connectedAt: Date;
}

export interface InstagramWebhookEntry {
  id: string;
  time: number;
  changes: WebhookChange[];
  messaging?: WebhookMessage[];
}

export interface WebhookChange {
  field: "comments" | "mentions" | "story_insights" | "messages";
  value: {
    from: { id: string; username: string };
    media: { id: string; media_product_type: string };
    id: string;
    text: string;
    timestamp: string;
  };
}

export interface WebhookMessage {
  sender: { id: string };
  recipient: { id: string };
  timestamp: number;
  message: {
    mid: string;
    text: string;
  };
}

export interface InstagramMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | "REEL";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
}

export interface SendDMPayload {
  recipientId: string;
  message: string;
  accountId: string;
}
