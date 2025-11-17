import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Usuario {
  id: string
  nome: string
  email: string
  data_criacao: string
}

export interface Gasto {
  id: string
  usuario_id: string
  tipo: string
  valor: number
  data: string
  importancia: boolean
}

export interface MetaEconomia {
  id: string
  usuario_id: string
  objetivo: string
  valor_meta: number
  valor_atual: number
  data_criacao: string
  icone?: string
  cor?: string
}
