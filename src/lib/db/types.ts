export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;                  // matches auth.users.id
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          plan_id: "starter" | "growth" | "pro" | "agency" | null;
          trial_ends_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };

      instagram_accounts: {
        Row: {
          id: string;
          user_id: string;
          ig_user_id: string;
          username: string;
          name: string;
          profile_pic_url: string | null;
          access_token: string;         // encrypted in DB
          token_expires_at: string | null;
          followers_count: number;
          is_active: boolean;
          connected_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["instagram_accounts"]["Row"], "connected_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["instagram_accounts"]["Insert"]>;
      };

      automations: {
        Row: {
          id: string;
          user_id: string;
          account_id: string;
          name: string;
          description: string | null;
          trigger_type: "comment_keyword" | "story_reply" | "story_poll_vote" | "dm_keyword" | "live_comment" | "mention";
          trigger_config: Json;          // TriggerConfig from automation.ts
          actions: Json;                 // ActionConfig[] from automation.ts
          is_active: boolean;
          reply_once: boolean;
          post_id: string | null;        // null = apply to all posts
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["automations"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["automations"]["Insert"]>;
      };

      dm_logs: {
        Row: {
          id: string;
          automation_id: string;
          account_id: string;
          recipient_ig_id: string;
          recipient_username: string | null;
          trigger_type: string;
          trigger_text: string | null;
          message_sent: string;
          status: "sent" | "failed" | "skipped";
          error: string | null;
          sent_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["dm_logs"]["Row"], "sent_at">;
        Update: never;
      };

      leads: {
        Row: {
          id: string;
          user_id: string;
          account_id: string;
          ig_user_id: string;
          username: string;
          full_name: string | null;
          profile_pic_url: string | null;
          source_automation_id: string | null;
          source_trigger: string | null;
          tags: string[];
          notes: string | null;
          whatsapp_number: string | null;
          email: string | null;
          status: "new" | "contacted" | "converted" | "lost";
          converted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };

      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_id: "starter" | "growth" | "pro" | "agency";
          status: "active" | "past_due" | "cancelled" | "trialing";
          razorpay_subscription_id: string | null;
          current_period_start: string;
          current_period_end: string;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["subscriptions"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["subscriptions"]["Insert"]>;
      };

      automation_stats: {
        Row: {
          id: string;
          automation_id: string;
          date: string;              // YYYY-MM-DD
          triggered: number;
          dms_sent: number;
          links_clicked: number;
          conversions: number;
        };
        Insert: Omit<Database["public"]["Tables"]["automation_stats"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["automation_stats"]["Insert"]>;
      };
    };

    Views: {
      automation_stats_summary: {
        Row: {
          automation_id: string;
          total_triggered: number;
          total_dms_sent: number;
          total_links_clicked: number;
          total_conversions: number;
        };
      };
    };

    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
