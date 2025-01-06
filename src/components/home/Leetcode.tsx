"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Trophy,
  Award,
  Star,
  Activity,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Keep all your existing interfaces...
interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  acceptanceRate: number;
  contributionPoints: number;
  reputation: number;
}

interface Category {
  id: string;
  title: string;
  solved: number;
  total: number;
  color: string;
}

// Keep your existing components (LoadingSpinner, ErrorDisplay, StatCard, CategoryCard)...
const LoadingSpinner = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <p className="text-gray-600 dark:text-gray-400">Loading stats...</p>
    </div>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4 text-red-500">
      <AlertCircle className="h-8 w-8" />
      <p className="text-center">{message}</p>
    </div>
  </div>
);

const StatCard = ({
  icon: Icon,
  label,
  value,
  iconColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  iconColor: string;
}) => (
  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
    <div className="flex items-center gap-2">
      <Icon className={`h-5 w-5 ${iconColor}`} />
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
    </div>
    <div className="mt-2 text-2xl font-bold">{value}</div>
  </div>
);

const CategoryCard = ({
  category,
  isSelected,
  onClick,
}: {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-lg border transition-all duration-200 ${
      isSelected
        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
        : "border-gray-200 dark:border-gray-700 hover:border-blue-400"
    }`}
  >
    <div className="text-sm text-gray-600 dark:text-gray-400">
      {category.title}
    </div>
    <div className="mt-2 text-2xl font-bold" style={{ color: category.color }}>
      {category.solved}
      <span className="text-base font-normal text-gray-500 dark:text-gray-400">
        /{category.total}
      </span>
    </div>
    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${(category.solved / category.total) * 100}%`,
          backgroundColor: category.color,
        }}
      />
    </div>
  </button>
);

const LeetcodeStats = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://leetcode-stats-api.herokuapp.com/saiNikhilAvula"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch LeetCode statistics");
        }

        const data: LeetCodeStats = await response.json();
        setStats(data);
      } catch (err: unknown) {
        setError((err as Error).message || "An unexpected error occurred");
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const categories: Category[] = stats
    ? [
        {
          id: "all",
          title: "All Problems",
          solved: stats.totalSolved,
          total: stats.totalQuestions,
          color: "#3B82F6",
        },
        {
          id: "easy",
          title: "Easy",
          solved: stats.easySolved,
          total: stats.totalEasy,
          color: "#10B981",
        },
        {
          id: "medium",
          title: "Medium",
          solved: stats.mediumSolved,
          total: stats.totalMedium,
          color: "#F59E0B",
        },
        {
          id: "hard",
          title: "Hard",
          solved: stats.hardSolved,
          total: stats.totalHard,
          color: "#EF4444",
        },
      ]
    : [];

  const chartData = categories.map((cat) => ({
    name: cat.title,
    solved: cat.solved,
    total: cat.total,
  }));

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!stats) return <ErrorDisplay message="No data available" />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          My LeetCode Progress
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track my problem-solving journey on LeetCode
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedLevel === category.id}
            onClick={() => setSelectedLevel(category.id)}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Problem Distribution */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Problem Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="solved" name="Solved" fill="#3B82F6" />
                <Bar dataKey="total" name="Total" fill="#E5E7EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Over Time */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Completion Rate</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="solved"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Trophy}
          label="Ranking"
          value={`#${stats.ranking?.toLocaleString()}`}
          iconColor="text-yellow-500"
        />
        <StatCard
          icon={Activity}
          label="Acceptance Rate"
          value={`${stats.acceptanceRate?.toFixed(1)}%`}
          iconColor="text-green-500"
        />
        <StatCard
          icon={Star}
          label="Contribution Points"
          value={stats.contributionPoints}
          iconColor="text-purple-500"
        />
        <StatCard
          icon={Award}
          label="Reputation"
          value={stats.reputation}
          iconColor="text-blue-500"
        />
      </div>
    </div>
  );
};

export default LeetcodeStats;
