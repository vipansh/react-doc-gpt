export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          content: string | null
          embedding: unknown | null
          id: number
        }
        Insert: {
          content?: string | null
          embedding?: unknown | null
          id?: number
        }
        Update: {
          content?: string | null
          embedding?: unknown | null
          id?: number
        }
      }
      orders: {
        Row: {
          created_at: string | null
          id: number
          input: string | null
          status: boolean | null
          token_debited: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          input?: string | null
          status?: boolean | null
          token_debited?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          input?: string | null
          status?: boolean | null
          token_debited?: number | null
        }
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          no_of_tokens: number | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          no_of_tokens?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          no_of_tokens?: number | null
        }
      }
      reactdoc: {
        Row: {
          content: string | null
          content_length: number | null
          content_tokens: number | null
          docs_title: string | null
          docs_url: string | null
          embedding: unknown | null
          id: number
        }
        Insert: {
          content?: string | null
          content_length?: number | null
          content_tokens?: number | null
          docs_title?: string | null
          docs_url?: string | null
          embedding?: unknown | null
          id?: number
        }
        Update: {
          content?: string | null
          content_length?: number | null
          content_tokens?: number | null
          docs_title?: string | null
          docs_url?: string | null
          embedding?: unknown | null
          id?: number
        }
      }
      wish_list: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          user: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          user?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          user?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: unknown
          similarity_threshold: number
          match_count: number
        }
        Returns: {
          document_id: number
          content: string
          similarity: number
        }[]
      }
      match_react_documents: {
        Args: {
          query_embedding: unknown
          similarity_threshold: number
          match_count: number
        }
        Returns: {
          id: number
          docs_title: string
          docs_url: string
          content: string
          content_length: number
          content_tokens: number
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      vector_dims: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
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
