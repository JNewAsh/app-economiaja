'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { SavingsGoal } from '../types';

interface GoalsChartProps {
  goals: SavingsGoal[];
}

const COLORS = [
  '#10b981', // emerald
  '#3b82f6', // blue
  '#f59e0b', // amber
  '#ec4899', // pink
  '#8b5cf6', // purple
  '#06b6d4', // cyan
];

export default function GoalsChart({ goals }: GoalsChartProps) {
  if (goals.length === 0) {
    return null;
  }

  const data = goals.map((goal, index) => ({
    name: goal.name,
    value: goal.currentAmount,
    target: goal.targetAmount,
    percentage: (goal.currentAmount / goal.targetAmount) * 100,
    color: COLORS[index % COLORS.length],
  }));

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-bold text-gray-800 mb-2">{data.name}</p>
          <p className="text-sm text-gray-600">
            Economizado: <span className="font-bold text-emerald-600">R$ {data.value.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600">
            Meta: <span className="font-bold">R$ {data.target.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600">
            Progresso: <span className="font-bold">{data.percentage.toFixed(1)}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        📈 Visão Geral das Metas
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage.toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <p className="text-sm text-gray-600 mb-1">Total Economizado</p>
            <p className="text-3xl font-bold text-emerald-600">
              R$ {totalSaved.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {((totalSaved / totalTarget) * 100).toFixed(1)}% do total das metas
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Meta Total</p>
            <p className="text-3xl font-bold text-blue-600">
              R$ {totalTarget.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Soma de todas as {goals.length} metas
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
            <p className="text-sm text-gray-600 mb-1">Falta Economizar</p>
            <p className="text-3xl font-bold text-orange-600">
              R$ {(totalTarget - totalSaved).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Para completar todas as metas
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-bold text-gray-800 mb-4">Detalhamento por Meta</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{item.name}</p>
                <p className="text-sm text-gray-600">
                  R$ {item.value.toFixed(2)} / R$ {item.target.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{item.percentage.toFixed(0)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
