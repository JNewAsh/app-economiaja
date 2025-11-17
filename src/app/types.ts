// Tipos para o EconomiaJÁ

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'number' | 'select' | 'multiselect';
  options?: string[];
  category: 'renda' | 'despesas-fixas' | 'despesas-variaveis' | 'habitos';
}

export interface QuizAnswer {
  questionId: string;
  value: number | string | string[];
}

export interface FinancialProfile {
  rendaMensal: number;
  despesasFixas: number;
  despesasVariaveis: number;
  saldoMensal: number;
  percentualEconomia: number;
  categoria: 'critico' | 'atencao' | 'equilibrado' | 'saudavel' | 'excelente';
  recomendacoes: string[];
}

export interface ExpenseCategory {
  name: string;
  value: number;
  percentage: number;
  essential: boolean;
}

// Novos tipos para Cofre Digital
export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  color: string;
  category: 'viagem' | 'emergencia' | 'investimento' | 'compra' | 'educacao' | 'outro';
}

export interface Transaction {
  id: string;
  goalId: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  date: string;
  description?: string;
}
