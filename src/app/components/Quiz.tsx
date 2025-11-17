'use client';

import { useState } from 'react';
import { ChevronRight, DollarSign, Home, Zap, ShoppingCart, CreditCard, TrendingUp } from 'lucide-react';
import type { QuizAnswer, FinancialProfile } from '../types';

interface QuizProps {
  onComplete: (profile: FinancialProfile) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({
    renda: 0,
    aluguel: 0,
    contas: 0,
    alimentacao: 0,
    transporte: 0,
    lazer: 0,
    cartaoCredito: 0,
  });

  const questions = [
    {
      id: 'renda',
      title: 'Qual é sua renda mensal?',
      subtitle: 'Considere todos os seus ganhos mensais',
      icon: DollarSign,
      placeholder: 'Ex: 3000',
      prefix: 'R$',
    },
    {
      id: 'aluguel',
      title: 'Quanto você gasta com moradia?',
      subtitle: 'Aluguel, financiamento ou condomínio',
      icon: Home,
      placeholder: 'Ex: 1000',
      prefix: 'R$',
    },
    {
      id: 'contas',
      title: 'Quanto gasta com contas básicas?',
      subtitle: 'Luz, água, internet, telefone',
      icon: Zap,
      placeholder: 'Ex: 300',
      prefix: 'R$',
    },
    {
      id: 'alimentacao',
      title: 'Quanto gasta com alimentação?',
      subtitle: 'Supermercado, feira, delivery',
      icon: ShoppingCart,
      placeholder: 'Ex: 600',
      prefix: 'R$',
    },
    {
      id: 'transporte',
      title: 'Quanto gasta com transporte?',
      subtitle: 'Combustível, transporte público, apps',
      icon: TrendingUp,
      placeholder: 'Ex: 400',
      prefix: 'R$',
    },
    {
      id: 'lazer',
      title: 'Quanto gasta com lazer?',
      subtitle: 'Entretenimento, streaming, saídas',
      icon: TrendingUp,
      placeholder: 'Ex: 300',
      prefix: 'R$',
    },
    {
      id: 'cartaoCredito',
      title: 'Fatura média do cartão de crédito?',
      subtitle: 'Considere compras não incluídas acima',
      icon: CreditCard,
      placeholder: 'Ex: 500',
      prefix: 'R$',
    },
  ];

  const currentQuestion = questions[step];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateProfile();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const calculateProfile = () => {
    const renda = answers.renda || 0;
    const despesasFixas = (answers.aluguel || 0) + (answers.contas || 0);
    const despesasVariaveis = 
      (answers.alimentacao || 0) + 
      (answers.transporte || 0) + 
      (answers.lazer || 0) + 
      (answers.cartaoCredito || 0);
    
    const totalDespesas = despesasFixas + despesasVariaveis;
    const saldoMensal = renda - totalDespesas;
    const percentualEconomia = renda > 0 ? (saldoMensal / renda) * 100 : 0;

    let categoria: FinancialProfile['categoria'] = 'critico';
    let recomendacoes: string[] = [];

    if (percentualEconomia < 0) {
      categoria = 'critico';
      recomendacoes = [
        'Suas despesas estão maiores que sua renda! É urgente revisar seus gastos.',
        'Identifique despesas não essenciais que podem ser cortadas imediatamente.',
        'Considere buscar fontes de renda extra para equilibrar suas finanças.',
      ];
    } else if (percentualEconomia < 10) {
      categoria = 'atencao';
      recomendacoes = [
        'Você está economizando menos de 10% da sua renda. Tente aumentar essa reserva.',
        'Revise suas despesas variáveis - há espaço para otimização.',
        'Estabeleça metas de economia mensal para criar uma reserva de emergência.',
      ];
    } else if (percentualEconomia < 20) {
      categoria = 'equilibrado';
      recomendacoes = [
        'Suas finanças estão equilibradas! Continue assim.',
        'Tente aumentar sua taxa de economia para 20% ou mais.',
        'Considere começar a investir o dinheiro que está economizando.',
      ];
    } else if (percentualEconomia < 30) {
      categoria = 'saudavel';
      recomendacoes = [
        'Excelente! Você está economizando uma boa parte da sua renda.',
        'Diversifique seus investimentos para fazer seu dinheiro render mais.',
        'Mantenha esse hábito e considere aumentar seus investimentos.',
      ];
    } else {
      categoria = 'excelente';
      recomendacoes = [
        'Parabéns! Você tem um perfil financeiro exemplar!',
        'Continue investindo e diversificando seu patrimônio.',
        'Considere planejar objetivos de longo prazo como aposentadoria.',
      ];
    }

    const profile: FinancialProfile = {
      rendaMensal: renda,
      despesasFixas,
      despesasVariaveis,
      saldoMensal,
      percentualEconomia,
      categoria,
      recomendacoes,
    };

    onComplete(profile);
  };

  const Icon = currentQuestion.icon;
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Pergunta {step + 1} de {questions.length}
          </span>
          <span className="text-sm font-medium text-emerald-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {currentQuestion.title}
            </h2>
            <p className="text-gray-500 mt-1">{currentQuestion.subtitle}</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">
              {currentQuestion.prefix}
            </span>
            <input
              type="number"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) =>
                setAnswers({ ...answers, [currentQuestion.id]: parseFloat(e.target.value) || 0 })
              }
              placeholder={currentQuestion.placeholder}
              className="w-full pl-14 pr-4 py-4 text-xl border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {step > 0 && (
            <button
              onClick={handlePrevious}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {step < questions.length - 1 ? 'Próxima' : 'Ver Resultado'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
