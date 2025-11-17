'use client';

import { useState } from 'react';
import { 
  Plus, 
  Target, 
  Plane, 
  Shield, 
  TrendingUp, 
  ShoppingBag, 
  GraduationCap,
  Sparkles,
  Edit2,
  Trash2,
  DollarSign
} from 'lucide-react';
import type { SavingsGoal } from '../types';

interface CofreDigitalProps {
  goals: SavingsGoal[];
  onSaveGoals: (goals: SavingsGoal[]) => void;
  availableBalance: number;
}

const goalTemplates = [
  { name: 'Viagem dos Sonhos', icon: 'plane', color: 'from-blue-500 to-cyan-600', category: 'viagem' as const },
  { name: 'Fundo de Emergência', icon: 'shield', color: 'from-red-500 to-orange-600', category: 'emergencia' as const },
  { name: 'Investimento', icon: 'trending-up', color: 'from-green-500 to-emerald-600', category: 'investimento' as const },
  { name: 'Compra Importante', icon: 'shopping-bag', color: 'from-purple-500 to-pink-600', category: 'compra' as const },
  { name: 'Educação', icon: 'graduation-cap', color: 'from-yellow-500 to-orange-600', category: 'educacao' as const },
  { name: 'Outro', icon: 'sparkles', color: 'from-gray-500 to-slate-600', category: 'outro' as const },
];

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    'plane': Plane,
    'shield': Shield,
    'trending-up': TrendingUp,
    'shopping-bag': ShoppingBag,
    'graduation-cap': GraduationCap,
    'sparkles': Sparkles,
  };
  return icons[iconName] || Target;
};

export default function CofreDigital({ goals, onSaveGoals, availableBalance }: CofreDigitalProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: 0,
    deadline: '',
    template: goalTemplates[0],
  });
  const [depositAmount, setDepositAmount] = useState(0);

  const handleAddGoal = () => {
    if (!newGoal.name || newGoal.targetAmount <= 0 || !newGoal.deadline) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const goal: SavingsGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: newGoal.targetAmount,
      currentAmount: 0,
      deadline: newGoal.deadline,
      icon: newGoal.template.icon,
      color: newGoal.template.color,
      category: newGoal.template.category,
    };

    onSaveGoals([...goals, goal]);
    setShowAddModal(false);
    setNewGoal({
      name: '',
      targetAmount: 0,
      deadline: '',
      template: goalTemplates[0],
    });
  };

  const handleDeposit = () => {
    if (!selectedGoal || depositAmount <= 0) {
      alert('Valor inválido!');
      return;
    }

    const updatedGoals = goals.map(goal => {
      if (goal.id === selectedGoal.id) {
        return {
          ...goal,
          currentAmount: Math.min(goal.currentAmount + depositAmount, goal.targetAmount),
        };
      }
      return goal;
    });

    onSaveGoals(updatedGoals);
    setShowDepositModal(false);
    setDepositAmount(0);
    setSelectedGoal(null);
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm('Tem certeza que deseja excluir esta meta?')) {
      onSaveGoals(goals.filter(g => g.id !== goalId));
    }
  };

  const calculateProgress = (goal: SavingsGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const calculateDaysRemaining = (deadline: string) => {
    const today = new Date();
    const target = new Date(deadline);
    const diff = target.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">💰 Cofre Digital</h2>
          <p className="text-gray-600 mt-1">
            Organize suas economias e acompanhe o progresso das suas metas
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Nova Meta
        </button>
      </div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Nenhuma meta criada ainda
          </h3>
          <p className="text-gray-600 mb-6">
            Comece criando sua primeira meta de economia e acompanhe seu progresso!
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Criar Primeira Meta
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map(goal => {
            const Icon = getIcon(goal.icon);
            const progress = calculateProgress(goal);
            const daysRemaining = calculateDaysRemaining(goal.deadline);
            const isCompleted = progress >= 100;

            return (
              <div
                key={goal.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${goal.color} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedGoal(goal);
                          setShowDepositModal(true);
                        }}
                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                        disabled={isCompleted}
                      >
                        <DollarSign className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{goal.name}</h3>
                  <p className="text-sm text-white/80">
                    {daysRemaining > 0 
                      ? `${daysRemaining} dias restantes` 
                      : daysRemaining === 0 
                      ? 'Prazo hoje!' 
                      : 'Prazo vencido'}
                  </p>
                </div>

                {/* Progress */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Progresso</span>
                      <span className="text-sm font-bold text-gray-800">
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-500`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Economizado</span>
                      <span className="text-lg font-bold text-gray-800">
                        R$ {goal.currentAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Meta</span>
                      <span className="text-lg font-bold text-gray-800">
                        R$ {goal.targetAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Falta</span>
                      <span className="text-lg font-bold text-emerald-600">
                        R$ {(goal.targetAmount - goal.currentAmount).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {isCompleted && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800 text-center">
                        🎉 Meta alcançada! Parabéns!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">Criar Nova Meta</h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Meta
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {goalTemplates.map(template => {
                    const Icon = getIcon(template.icon);
                    const isSelected = newGoal.template.name === template.name;
                    return (
                      <button
                        key={template.name}
                        onClick={() => setNewGoal({ ...newGoal, template, name: template.name })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 bg-gradient-to-r ${template.color} rounded-lg flex items-center justify-center mb-2 mx-auto`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-800 text-center">
                          {template.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Goal Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Meta
                </label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  placeholder="Ex: Viagem para Paris"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Target Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor da Meta (R$)
                </label>
                <input
                  type="number"
                  value={newGoal.targetAmount || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) || 0 })}
                  placeholder="0,00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prazo
                </label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddGoal}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
              >
                Criar Meta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDepositModal && selectedGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">Adicionar Valor</h3>
              <p className="text-gray-600 mt-1">{selectedGoal.name}</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quanto deseja adicionar? (R$)
                </label>
                <input
                  type="number"
                  value={depositAmount || ''}
                  onChange={(e) => setDepositAmount(parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Valor atual</span>
                  <span className="font-bold text-gray-800">
                    R$ {selectedGoal.currentAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Novo valor</span>
                  <span className="font-bold text-emerald-600">
                    R$ {(selectedGoal.currentAmount + depositAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Faltará</span>
                  <span className="font-bold text-gray-800">
                    R$ {Math.max(0, selectedGoal.targetAmount - selectedGoal.currentAmount - depositAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowDepositModal(false);
                  setDepositAmount(0);
                  setSelectedGoal(null);
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeposit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
