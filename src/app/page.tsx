'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wallet, TrendingUp, Target, Sparkles, ChevronRight, LogIn, UserPlus } from 'lucide-react';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import type { FinancialProfile } from './types';

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [profile, setProfile] = useState<FinancialProfile | null>(null);

  const handleQuizComplete = (result: FinancialProfile) => {
    setProfile(result);
  };

  const handleRestart = () => {
    setProfile(null);
    setShowQuiz(false);
  };

  if (profile) {
    return (
      <div className="min-h-screen py-8 px-4">
        <QuizResult profile={profile} onRestart={handleRestart} />
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto mb-8">
          <button
            onClick={() => setShowQuiz(false)}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            ← Voltar
          </button>
        </div>
        <Quiz onComplete={handleQuizComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header com Login/Cadastro */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="inline-flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-600" />
            <span className="font-bold text-gray-800 text-xl">EconomiaJÁ</span>
          </div>
          
          <div className="flex gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Entrar</span>
            </Link>
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Cadastrar</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg mb-8">
            <Wallet className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-gray-800">EconomiaJÁ</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Transforme sua
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {' '}Vida Financeira{' '}
            </span>
            Hoje Mesmo
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra seu perfil financeiro, identifique oportunidades de economia e aprenda a gerenciar seu dinheiro de forma inteligente.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowQuiz(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-medium rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Começar Avaliação Gratuita
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-600 text-lg font-medium rounded-xl border-2 border-emerald-500 hover:bg-emerald-50 transition-all"
            >
              Criar Conta Grátis
              <UserPlus className="w-6 h-6" />
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            ✨ Avaliação sem cadastro • Resultado em 2 minutos • 100% gratuito
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Avaliação Personalizada
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Responda perguntas simples sobre seus gastos e receba uma análise completa do seu perfil financeiro.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Dicas Inteligentes
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Receba recomendações personalizadas para otimizar seus gastos e aumentar sua capacidade de economia.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Resultados Imediatos
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Veja instantaneamente quanto você pode economizar por mês e por ano seguindo nossas orientações.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Por que usar o EconomiaJÁ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">2 min</p>
              <p className="text-emerald-100">Tempo de avaliação</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100%</p>
              <p className="text-emerald-100">Gratuito e sem cadastro</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">7+</p>
              <p className="text-emerald-100">Categorias analisadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Pronto para tomar controle das suas finanças?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Comece agora e descubra como pequenas mudanças podem gerar grandes economias.
          </p>
          <button
            onClick={() => setShowQuiz(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-medium rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Iniciar Minha Avaliação
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
