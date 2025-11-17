'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, TrendingUp, TrendingDown, AlertCircle, Target, ArrowRight } from 'lucide-react';
import type { FinancialProfile } from '../types';
import { useRouter } from 'next/navigation';

interface QuizResultProps {
  profile: FinancialProfile;
  onRestart: () => void;
}

export default function QuizResult({ profile, onRestart }: QuizResultProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  // Salvar perfil no localStorage para usar no dashboard
  const handleGoToDashboard = () => {
    localStorage.setItem('financialProfile', JSON.stringify(profile));
    router.push('/dashboard');
  };

  const getCategoryInfo = (categoria: string) => {
    const categories = {
      critico: {
        color: 'from-red-500 to-orange-600',
        icon: XCircle,
        title: 'Situação Crítica',
        description: 'Suas despesas excedem sua renda. É urgente revisar seus gastos!',
      },
      atencao: {
        color: 'from-orange-500 to-yellow-600',
        icon: AlertCircle,
        title: 'Atenção Necessária',
        description: 'Você está gastando quase tudo que ganha. Pequenas mudanças podem fazer diferença.',
      },
      equilibrado: {
        color: 'from-yellow-500 to-green-600',
        icon: Target,
        title: 'Situação Equilibrada',
        description: 'Você consegue economizar um pouco. Com ajustes, pode melhorar ainda mais!',
      },
      saudavel: {
        color: 'from-green-500 to-emerald-600',
        icon: TrendingUp,
        title: 'Situação Saudável',
        description: 'Parabéns! Você tem bons hábitos financeiros e consegue economizar.',
      },
      excelente: {
        color: 'from-emerald-500 to-teal-600',
        icon: CheckCircle,
        title: 'Situação Excelente',
        description: 'Excepcional! Você tem controle total das suas finanças e economiza muito bem.',
      },
    };
    return categories[categoria as keyof typeof categories];
  };

  const categoryInfo = getCategoryInfo(profile.categoria);
  const Icon = categoryInfo.icon;

  // Calcular economia anual
  const economiaAnual = profile.saldoMensal * 12;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Card */}
      <div className={`bg-gradient-to-r ${categoryInfo.color} rounded-2xl shadow-2xl p-8 md:p-12 text-white mb-8`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Icon className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">{categoryInfo.title}</h2>
            <p className="text-white/90 mt-1">{categoryInfo.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-white/80 text-sm mb-1">Renda Mensal</p>
            <p className="text-2xl font-bold">R$ {profile.rendaMensal.toFixed(2)}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-white/80 text-sm mb-1">Despesas Totais</p>
            <p className="text-2xl font-bold">
              R$ {(profile.despesasFixas + profile.despesasVariaveis).toFixed(2)}
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-white/80 text-sm mb-1">Saldo Mensal</p>
            <p className="text-2xl font-bold">R$ {profile.saldoMensal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Economia Potencial */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-emerald-600" />
          Potencial de Economia
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <p className="text-gray-600 mb-2">Você pode economizar por mês</p>
            <p className="text-4xl font-bold text-emerald-600 mb-1">
              R$ {profile.saldoMensal.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              {profile.percentualEconomia.toFixed(1)}% da sua renda
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <p className="text-gray-600 mb-2">Economia anual potencial</p>
            <p className="text-4xl font-bold text-blue-600 mb-1">
              R$ {economiaAnual.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Em 1 ano seguindo as dicas
            </p>
          </div>
        </div>
      </div>

      {/* Distribuição de Gastos */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          📊 Distribuição dos Seus Gastos
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Despesas Fixas</span>
              <span className="font-bold text-gray-800">
                R$ {profile.despesasFixas.toFixed(2)} (
                {((profile.despesasFixas / profile.rendaMensal) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-orange-600"
                style={{ width: `${(profile.despesasFixas / profile.rendaMensal) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Despesas Variáveis</span>
              <span className="font-bold text-gray-800">
                R$ {profile.despesasVariaveis.toFixed(2)} (
                {((profile.despesasVariaveis / profile.rendaMensal) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-600"
                style={{ width: `${(profile.despesasVariaveis / profile.rendaMensal) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Saldo Disponível</span>
              <span className="font-bold text-emerald-600">
                R$ {profile.saldoMensal.toFixed(2)} (
                {profile.percentualEconomia.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                style={{ width: `${profile.percentualEconomia}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recomendações */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          💡 Recomendações Personalizadas
        </h3>

        <div className="space-y-4">
          {profile.recomendacoes.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
            >
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Dashboard */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-8 text-white mb-8">
        <h3 className="text-2xl font-bold mb-3">
          🎯 Pronto para começar a economizar?
        </h3>
        <p className="text-emerald-100 mb-6">
          Acesse seu dashboard personalizado e crie metas de economia para alcançar seus objetivos financeiros!
        </p>
        <button
          onClick={handleGoToDashboard}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          Acessar Meu Dashboard
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRestart}
          className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
        >
          Refazer Avaliação
        </button>
        <button
          onClick={handleGoToDashboard}
          className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
        >
          Ir para Dashboard
        </button>
      </div>
    </div>
  );
}
