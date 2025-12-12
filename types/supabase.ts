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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ad_categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      campaign_stats: {
        Row: {
          block_count: number | null
          block_reason: string | null
          browser_name: string | null
          browser_version: string | null
          campaign_id: string
          city: string | null
          country_code: string | null
          created_at: string | null
          device_type: string | null
          id: string
          ip_address: string | null
          isp_name: string | null
          os_name: string | null
          os_version: string | null
          outcome: string
          outcome_reason: string | null
          reason: string | null
          referer_url: string | null
          region: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string
          visit_time: string | null
        }
        Insert: {
          block_count?: number | null
          block_reason?: string | null
          browser_name?: string | null
          browser_version?: string | null
          campaign_id: string
          city?: string | null
          country_code?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          isp_name?: string | null
          os_name?: string | null
          os_version?: string | null
          outcome?: string
          outcome_reason?: string | null
          reason?: string | null
          referer_url?: string | null
          region?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id: string
          visit_time?: string | null
        }
        Update: {
          block_count?: number | null
          block_reason?: string | null
          browser_name?: string | null
          browser_version?: string | null
          campaign_id?: string
          city?: string | null
          country_code?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          isp_name?: string | null
          os_name?: string | null
          os_version?: string | null
          outcome?: string
          outcome_reason?: string | null
          reason?: string | null
          referer_url?: string | null
          region?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string
          visit_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_stats_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          black_product_id: string | null
          black_url: string
          block_ipv6: boolean
          block_vpn_proxy: boolean
          bot_detection_enabled: boolean
          created_at: string | null
          device_desktop: boolean
          device_filter_type: string | null
          device_filtering_enabled: boolean
          device_mobile: boolean
          device_tablet: boolean
          geo_countries: string | null
          geo_filter_type: string | null
          geo_filtering_enabled: boolean
          id: string
          name: string
          redirect_url: string | null
          shopify_product_id: string | null
          shopify_product_url: string | null
          slug: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          black_product_id?: string | null
          black_url: string
          block_ipv6?: boolean
          block_vpn_proxy?: boolean
          bot_detection_enabled?: boolean
          created_at?: string | null
          device_desktop?: boolean
          device_filter_type?: string | null
          device_filtering_enabled?: boolean
          device_mobile?: boolean
          device_tablet?: boolean
          geo_countries?: string | null
          geo_filter_type?: string | null
          geo_filtering_enabled?: boolean
          id?: string
          name: string
          redirect_url?: string | null
          shopify_product_id?: string | null
          shopify_product_url?: string | null
          slug: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          black_product_id?: string | null
          black_url?: string
          block_ipv6?: boolean
          block_vpn_proxy?: boolean
          bot_detection_enabled?: boolean
          created_at?: string | null
          device_desktop?: boolean
          device_filter_type?: string | null
          device_filtering_enabled?: boolean
          device_mobile?: boolean
          device_tablet?: boolean
          geo_countries?: string | null
          geo_filter_type?: string | null
          geo_filtering_enabled?: boolean
          id?: string
          name?: string
          redirect_url?: string | null
          shopify_product_id?: string | null
          shopify_product_url?: string | null
          slug?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      coupon_usage: {
        Row: {
          coupon_id: string
          id: string
          order_id: string | null
          used_at: string | null
          user_id: string
        }
        Insert: {
          coupon_id: string
          id?: string
          order_id?: string | null
          used_at?: string | null
          user_id: string
        }
        Update: {
          coupon_id?: string
          id?: string
          order_id?: string | null
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupon_usage_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          applies_to_plan_id: string | null
          code: string
          commission_rate: number | null
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number
          end_date: string | null
          event_type: string | null
          id: string
          max_uses: number | null
          min_purchase: number | null
          owner_id: string | null
          start_date: string | null
          status: string
          updated_at: string | null
          uses_count: number
        }
        Insert: {
          applies_to_plan_id?: string | null
          code: string
          commission_rate?: number | null
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value: number
          end_date?: string | null
          event_type?: string | null
          id?: string
          max_uses?: number | null
          min_purchase?: number | null
          owner_id?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string | null
          uses_count?: number
        }
        Update: {
          applies_to_plan_id?: string | null
          code?: string
          commission_rate?: number | null
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          end_date?: string | null
          event_type?: string | null
          id?: string
          max_uses?: number | null
          min_purchase?: number | null
          owner_id?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string | null
          uses_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "coupons_applies_to_plan_id_fkey"
            columns: ["applies_to_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: string | null
          credit_type: string
          description: string | null
          id: string
          reference_id: string | null
          reference_type: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          credit_type: string
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          credit_type?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      device_types: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      email_queue: {
        Row: {
          attempts: number
          body_html: string | null
          body_text: string | null
          created_at: string | null
          email_from: string
          email_to: string
          id: string
          last_attempt_at: string | null
          priority: number
          sent_at: string | null
          status: string
          subject: string
          user_id: string | null
        }
        Insert: {
          attempts?: number
          body_html?: string | null
          body_text?: string | null
          created_at?: string | null
          email_from: string
          email_to: string
          id?: string
          last_attempt_at?: string | null
          priority?: number
          sent_at?: string | null
          status?: string
          subject: string
          user_id?: string | null
        }
        Update: {
          attempts?: number
          body_html?: string | null
          body_text?: string | null
          created_at?: string | null
          email_from?: string
          email_to?: string
          id?: string
          last_attempt_at?: string | null
          priority?: number
          sent_at?: string | null
          status?: string
          subject?: string
          user_id?: string | null
        }
        Relationships: []
      }
      image_agent_chats: {
        Row: {
          agent_id: string
          business_context: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          parent_chat_id: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          agent_id?: string
          business_context?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          parent_chat_id?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          agent_id?: string
          business_context?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          parent_chat_id?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_agent_chats_parent_chat_id_fkey"
            columns: ["parent_chat_id"]
            isOneToOne: false
            referencedRelation: "image_agent_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      image_agent_messages: {
        Row: {
          chat_id: string | null
          created_at: string | null
          id: string
          image_storage_key: string | null
          image_url: string | null
          message_content: string
          message_role: string
          user_id: string | null
        }
        Insert: {
          chat_id?: string | null
          created_at?: string | null
          id?: string
          image_storage_key?: string | null
          image_url?: string | null
          message_content: string
          message_role: string
          user_id?: string | null
        }
        Update: {
          chat_id?: string | null
          created_at?: string | null
          id?: string
          image_storage_key?: string | null
          image_url?: string | null
          message_content?: string
          message_role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_agent_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "image_agent_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      ip_blocklist: {
        Row: {
          created_at: string | null
          id: string
          ip_address: string
          reason: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address: string
          reason?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: string
          reason?: string | null
        }
        Relationships: []
      }
      isp_blocklist: {
        Row: {
          created_at: string | null
          id: string
          isp_keyword: string
          reason: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          isp_keyword: string
          reason?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          isp_keyword?: string
          reason?: string | null
        }
        Relationships: []
      }
      landing_templates: {
        Row: {
          category: string | null
          created_at: string | null
          credits_cost: number
          description: string | null
          id: string
          is_premium: boolean
          name: string
          thumbnail_storage_path: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          credits_cost?: number
          description?: string | null
          id?: string
          is_premium?: boolean
          name: string
          thumbnail_storage_path?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          credits_cost?: number
          description?: string | null
          id?: string
          is_premium?: boolean
          name?: string
          thumbnail_storage_path?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          card_brand: string | null
          created_at: string | null
          expiry_month: string | null
          expiry_year: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          last_four_digits: string | null
          payment_type: string
          updated_at: string | null
          user_id: string
          wompi_source_id: string
        }
        Insert: {
          card_brand?: string | null
          created_at?: string | null
          expiry_month?: string | null
          expiry_year?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          last_four_digits?: string | null
          payment_type: string
          updated_at?: string | null
          user_id: string
          wompi_source_id: string
        }
        Update: {
          card_brand?: string | null
          created_at?: string | null
          expiry_month?: string | null
          expiry_year?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          last_four_digits?: string | null
          payment_type?: string
          updated_at?: string | null
          user_id?: string
          wompi_source_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          credits_amount: number | null
          currency: string
          id: string
          package_type: string | null
          payer_email: string
          payer_name: string
          payment_method: string
          status: string
          subscription_id: string | null
          transaction_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          credits_amount?: number | null
          currency?: string
          id?: string
          package_type?: string | null
          payer_email: string
          payer_name: string
          payment_method: string
          status?: string
          subscription_id?: string | null
          transaction_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          credits_amount?: number | null
          currency?: string
          id?: string
          package_type?: string | null
          payer_email?: string
          payer_name?: string
          payment_method?: string
          status?: string
          subscription_id?: string | null
          transaction_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          available_reward_amount: number | null
          created_at: string | null
          google_id: string | null
          id: string
          is_active: boolean | null
          pending_reward_amount: number | null
          profile_picture: string | null
          referral_code: string | null
          referral_commission_rate: number | null
          referred_by: string | null
          role: string | null
          status: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          available_reward_amount?: number | null
          created_at?: string | null
          google_id?: string | null
          id?: string
          is_active?: boolean | null
          pending_reward_amount?: number | null
          profile_picture?: string | null
          referral_code?: string | null
          referral_commission_rate?: number | null
          referred_by?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          available_reward_amount?: number | null
          created_at?: string | null
          google_id?: string | null
          id?: string
          is_active?: boolean | null
          pending_reward_amount?: number | null
          profile_picture?: string | null
          referral_code?: string | null
          referral_commission_rate?: number | null
          referred_by?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      referral_rewards: {
        Row: {
          created_at: string | null
          id: string
          processed_at: string | null
          referral_id: string
          reward_type: string
          reward_value: number
          status: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          processed_at?: string | null
          referral_id: string
          reward_type: string
          reward_value: number
          status?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          processed_at?: string | null
          referral_id?: string
          reward_type?: string
          reward_value?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_rewards_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          converted_at: string | null
          created_at: string | null
          id: string
          referred_id: string
          referrer_id: string
          status: string
        }
        Insert: {
          converted_at?: string | null
          created_at?: string | null
          id?: string
          referred_id: string
          referrer_id: string
          status?: string
        }
        Update: {
          converted_at?: string | null
          created_at?: string | null
          id?: string
          referred_id?: string
          referrer_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey1"
            columns: ["referred_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey1"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_ads: {
        Row: {
          ad_archive_id: string | null
          category_id: string | null
          cta_type: string | null
          days_active: number | null
          id: string
          landing_page_url: string | null
          page_likes: number | null
          saved_at: string | null
          storage_path: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ad_archive_id?: string | null
          category_id?: string | null
          cta_type?: string | null
          days_active?: number | null
          id?: string
          landing_page_url?: string | null
          page_likes?: number | null
          saved_at?: string | null
          storage_path?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ad_archive_id?: string | null
          category_id?: string | null
          cta_type?: string | null
          days_active?: number | null
          id?: string
          landing_page_url?: string | null
          page_likes?: number | null
          saved_at?: string | null
          storage_path?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_ads_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ad_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      shopify_stores: {
        Row: {
          access_token: string | null
          id: string
          installed_at: string | null
          is_active: boolean
          scope: string | null
          shop_url: string
          uninstalled_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          id?: string
          installed_at?: string | null
          is_active?: boolean
          scope?: string | null
          shop_url: string
          uninstalled_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          id?: string
          installed_at?: string | null
          is_active?: boolean
          scope?: string | null
          shop_url?: string
          uninstalled_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          billing_cycle: string
          campaign_credits: number
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean
          isCustom: boolean | null
          landing_page_credits: number
          max_stores: number
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          billing_cycle?: string
          campaign_credits?: number
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          isCustom?: boolean | null
          landing_page_credits?: number
          max_stores?: number
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          billing_cycle?: string
          campaign_credits?: number
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          isCustom?: boolean | null
          landing_page_credits?: number
          max_stores?: number
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      subscription_renewals: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          failure_reason: string | null
          id: string
          next_retry_date: string | null
          payment_method_id: string
          processed_date: string | null
          retry_count: number | null
          scheduled_date: string
          status: string
          subscription_id: string
          updated_at: string | null
          wompi_transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          failure_reason?: string | null
          id?: string
          next_retry_date?: string | null
          payment_method_id: string
          processed_date?: string | null
          retry_count?: number | null
          scheduled_date: string
          status: string
          subscription_id: string
          updated_at?: string | null
          wompi_transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          failure_reason?: string | null
          id?: string
          next_retry_date?: string | null
          payment_method_id?: string
          processed_date?: string | null
          retry_count?: number | null
          scheduled_date?: string
          status?: string
          subscription_id?: string
          updated_at?: string | null
          wompi_transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_renewals_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_renewals_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          auto_renew: boolean
          billing_cycle_count: number | null
          canceled_at: string | null
          coupon_code: string | null
          coupon_id: string | null
          created_at: string | null
          discount_amount: number | null
          end_date: string | null
          id: string
          max_retry_attempts: number | null
          next_billing_date: string | null
          payment_method_id: string | null
          plan_id: string
          start_date: string | null
          status: string
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_renew?: boolean
          billing_cycle_count?: number | null
          canceled_at?: string | null
          coupon_code?: string | null
          coupon_id?: string | null
          created_at?: string | null
          discount_amount?: number | null
          end_date?: string | null
          id?: string
          max_retry_attempts?: number | null
          next_billing_date?: string | null
          payment_method_id?: string | null
          plan_id: string
          start_date?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_renew?: boolean
          billing_cycle_count?: number | null
          canceled_at?: string | null
          coupon_code?: string | null
          coupon_id?: string | null
          created_at?: string | null
          discount_amount?: number | null
          end_date?: string | null
          id?: string
          max_retry_attempts?: number | null
          next_billing_date?: string | null
          payment_method_id?: string | null
          plan_id?: string
          start_date?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      template_folders: {
        Row: {
          created_at: string | null
          description: string | null
          folder_type: string
          id: string
          name: string
          path: string
          template_count: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          folder_type?: string
          id?: string
          name: string
          path: string
          template_count?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          folder_type?: string
          id?: string
          name?: string
          path?: string
          template_count?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          created_at: string | null
          description: string | null
          external_link: string
          folder_id: string
          id: string
          name: string
          platform: string | null
          preview_image_url: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          external_link: string
          folder_id: string
          id?: string
          name: string
          platform?: string | null
          preview_image_url?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          external_link?: string
          folder_id?: string
          id?: string
          name?: string
          platform?: string | null
          preview_image_url?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "templates_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "template_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      trade_show_events: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          location: string | null
          name: string
          registration_url: string | null
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          location?: string | null
          name: string
          registration_url?: string | null
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          location?: string | null
          name?: string
          registration_url?: string | null
          start_date?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tutorials: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          created_at: string | null
          credit_type: string
          credits_total: number
          credits_used: number
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credit_type: string
          credits_total?: number
          credits_used?: number
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          credit_type?: string
          credits_total?: number
          credits_used?: number
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_landing_pages: {
        Row: {
          animation_type: string | null
          background_color: string | null
          created_at: string | null
          custom_data: Json | null
          generated_html: string | null
          id: string
          is_published: boolean
          name: string
          slug: string
          store_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          animation_type?: string | null
          background_color?: string | null
          created_at?: string | null
          custom_data?: Json | null
          generated_html?: string | null
          id?: string
          is_published?: boolean
          name: string
          slug: string
          store_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          animation_type?: string | null
          background_color?: string | null
          created_at?: string | null
          custom_data?: Json | null
          generated_html?: string | null
          id?: string
          is_published?: boolean
          name?: string
          slug?: string
          store_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_landing_pages_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "shopify_stores"
            referencedColumns: ["id"]
          },
        ]
      }
      user_store_permissions: {
        Row: {
          granted_at: string | null
          granted_by: string
          id: string
          is_active: boolean
          permission_level: string
          revoked_at: string | null
          store_id: string
          user_id: string
        }
        Insert: {
          granted_at?: string | null
          granted_by: string
          id?: string
          is_active?: boolean
          permission_level?: string
          revoked_at?: string | null
          store_id: string
          user_id: string
        }
        Update: {
          granted_at?: string | null
          granted_by?: string
          id?: string
          is_active?: boolean
          permission_level?: string
          revoked_at?: string | null
          store_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_store_permissions_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "shopify_stores"
            referencedColumns: ["id"]
          },
        ]
      }
      user_template_folders: {
        Row: {
          assigned_at: string | null
          folder_name: string
          id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          folder_name: string
          id?: string
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          folder_name?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_template_folders_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          duration_seconds: number | null
          id: string
          title: string
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          title: string
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      withdrawals: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          payment_details: Json
          payment_method: string
          processed_at: string | null
          processed_by: string | null
          rejection_reason: string | null
          requested_at: string
          status: string
          transaction_reference: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          payment_details: Json
          payment_method: string
          processed_at?: string | null
          processed_by?: string | null
          rejection_reason?: string | null
          requested_at?: string
          status?: string
          transaction_reference?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          payment_details?: Json
          payment_method?: string
          processed_at?: string | null
          processed_by?: string | null
          rejection_reason?: string | null
          requested_at?: string
          status?: string
          transaction_reference?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      world_cities: {
        Row: {
          country_code: string
          created_at: string
          id: string
          latitude: number
          longitude: number
          name: string
        }
        Insert: {
          country_code: string
          created_at?: string
          id?: string
          latitude: number
          longitude: number
          name: string
        }
        Update: {
          country_code?: string
          created_at?: string
          id?: string
          latitude?: number
          longitude?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_device_stats: {
        Args: { campaign_id: string }
        Returns: {
          allowed: number
          blocked: number
          device: string
          rate: string
          visits: number
        }[]
      }
      get_geo_stats: {
        Args: { campaign_id: string }
        Returns: {
          allowed: number
          blocked: number
          country_code: string
          country_name: string
          rate: string
          visits: number
        }[]
      }
      user_has_password: { Args: never; Returns: boolean }
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
