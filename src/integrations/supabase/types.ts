export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      art_path_progress: {
        Row: {
          coin_reward: number
          completed_at: string
          id: string
          station_index: number
          updated_at: string
          user_id: string
        }
        Insert: {
          coin_reward: number
          completed_at?: string
          id?: string
          station_index: number
          updated_at?: string
          user_id: string
        }
        Update: {
          coin_reward?: number
          completed_at?: string
          id?: string
          station_index?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      auction_offers: {
        Row: {
          created_at: string
          id: string
          price: number
          rotation_slot: number
          updated_at: string
          work_slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          rotation_slot: number
          updated_at?: string
          work_slug: string
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          rotation_slot?: number
          updated_at?: string
          work_slug?: string
        }
        Relationships: []
      }
      discoveries: {
        Row: {
          created_at: string
          id: string
          kind: string
          slug: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          slug: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          slug?: string
          user_id?: string
        }
        Relationships: []
      }
      journey_progress: {
        Row: {
          completed_at: string
          id: string
          journey_slug: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          journey_slug: string
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          journey_slug?: string
          user_id?: string
        }
        Relationships: []
      }
      owned_items: {
        Row: {
          id: string
          item_slug: string
          kind: string
          purchase_price: number
          purchased_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          item_slug: string
          kind?: string
          purchase_price: number
          purchased_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          item_slug?: string
          kind?: string
          purchase_price?: number
          purchased_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          created_at: string
          id: string
          score: number
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          score: number
          total: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          score?: number
          total?: number
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          best_streak: number
          coins: number
          created_at: string
          last_harvest_date: string | null
          points: number
          streak: number
          updated_at: string
          user_id: string
        }
        Insert: {
          best_streak?: number
          coins?: number
          created_at?: string
          last_harvest_date?: string | null
          points?: number
          streak?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          best_streak?: number
          coins?: number
          created_at?: string
          last_harvest_date?: string | null
          points?: number
          streak?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_art_path_station: {
        Args: { target_station: number }
        Returns: {
          awarded: number
          coins: number
        }[]
      }
      complete_art_path_station_for_user: {
        Args: { target_station: number; target_user: string }
        Returns: {
          awarded: number
          coins: number
        }[]
      }
      purchase_auction_offer: {
        Args: { target_offer: string }
        Returns: {
          coins: number
          item_slug: string
        }[]
      }
      purchase_auction_offer_for_user: {
        Args: { target_offer: string; target_user: string }
        Returns: {
          coins: number
          item_slug: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
