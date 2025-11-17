'use client';

import { useState, useEffect } from 'react';
import { 
  Wallet, 
  Target, 
  TrendingUp, 
  PiggyBank, 
  Plus,
  Home,
  BookOpen,
  Users,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import CofreDigital from '../components/CofreDigital';
import GoalsChart from '../components/GoalsChart';
import type { FinancialProfile, SavingsGoal } from '../types';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'cofre' | 'educacao' | 'comunidade'>('cofre');
  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);

  useEffect(() => {
    // Carregar perfil do localStorage
    const savedProfile = localStorage.getItem('financialProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    // Carregar metas do localStorage
    const savedGoals = localStorage.getItem('savingsGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const handleSaveGoals = (newGoals: SavingsGoal[]) => {
    setGoals(newGoals);
    localStorage.setItem('savingsGoals', JSON.stringify(newGoals));
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <Wallet className="w-6 h-6 text-emerald-600" />
                <span className="font-bold text-xl text-gray-800">EconomiaJÁ</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm text-gray-500">Saldo Disponível</p>
                <p className="text-lg font-bold text-emerald-600">
                  R$ {profile?.saldoMensal.toFixed(2) || '0,00'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total Economizado</p>
              <PiggyBank className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              R$ {totalSaved.toFixed(2)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {overallProgress.toFixed(1)}% do objetivo total
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Meta Total</p>
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              R$ {totalTarget.toFixed(2)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {goals.length} {goals.length === 1 ? 'meta ativa' : 'metas ativas'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Falta Economizar</p>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              R$ {(totalTarget - totalSaved).toFixed(2)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Para atingir todas as metas
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-emerald-100">Seu Perfil</p>
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold capitalize">
              {profile?.categoria || 'Não avaliado'}
            </p>
            <p className="text-xs text-emerald-100 mt-1">
              {profile?.percentualEconomia.toFixed(1)}% de economia mensal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-lg p-2 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('cofre')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'cofre'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <PiggyBank className="w-5 h-5" />
            <span className="hidden sm:inline">Cofre Digital</span>
          </button>
          
          <button
            onClick={() => setActiveTab('educacao')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'educacao'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="hidden sm:inline">Educação</span>
          </button>
          
          <button
            onClick={() => setActiveTab('comunidade')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'comunidade'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="hidden sm:inline">Comunidade</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 pb-12">
        {activeTab === 'cofre' && (
          <div className="space-y-6">
            {goals.length > 0 && <GoalsChart goals={goals} />}
            <CofreDigital 
              goals={goals} 
              onSaveGoals={handleSaveGoals}
              availableBalance={profile?.saldoMensal || 0}
            />
          </div>
        )}

        {activeTab === 'educacao' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📚 Biblioteca de Educação Financeira
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Como Criar um Orçamento
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Aprenda a organizar suas finanças e criar um orçamento realista para suas necessidades.
                </p>
                <span className="text-emerald-600 font-medium text-sm">
                  Ler artigo →
                </span>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Investimentos para Iniciantes
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Descubra os primeiros passos para começar a investir seu dinheiro com segurança.
                </p>
                <span className="text-emerald-600 font-medium text-sm">
                  Ler artigo →
                </span>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Fundo de Emergência
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Entenda a importância e como construir seu fundo de emergência passo a passo.
                </p>
                <span className="text-emerald-600 font-medium text-sm">
                  Ler artigo →
                </span>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <PiggyBank className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Dicas de Economia Diária
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Pequenas mudanças que podem gerar grandes economias no seu dia a dia.
                </p>
                <span className="text-emerald-600 font-medium text-sm">
                  Ler artigo →
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comunidade' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              👥 Comunidade EconomiaJÁ
            </h2>
            
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white mb-6">
              <h3 className="text-xl font-bold mb-2">
                🎯 Desafio do Mês: Economia de R$ 500
              </h3>
              <p className="text-emerald-100 mb-4">
                Participe do desafio mensal e economize junto com outros usuários!
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-2xl font-bold">1.234</p>
                  <p className="text-sm text-emerald-100">Participantes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-emerald-100">Dias restantes</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-emerald-600">M</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-gray-800">Maria Silva</span>
                      <span className="text-sm text-gray-500">• há 2 horas</span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Consegui economizar R$ 300 este mês seguindo as dicas do app! 
                      Cortei gastos desnecessários com delivery e já vejo a diferença. 🎉
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button className="hover:text-emerald-600">👍 24 curtidas</button>
                      <button className="hover:text-emerald-600">💬 5 comentários</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">J</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-gray-800">João Santos</span>
                      <span className="text-sm text-gray-500">• há 5 horas</span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Alguém tem dicas de como começar a investir com pouco dinheiro? 
                      Já tenho meu fundo de emergência pronto! 💰
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button className="hover:text-emerald-600">👍 18 curtidas</button>
                      <button className="hover:text-emerald-600">💬 12 comentários</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
