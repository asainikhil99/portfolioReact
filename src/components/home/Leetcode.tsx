"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
}

interface ChartData {
  name: string;
  solved: number;
  total: number;
}

const LeetcodeStats: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [username, setUsername] = useState<string>("saiNikhilAvula");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${username}`
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status}. Unable to fetch data for ${username}`
          );
        }

        const data: LeetCodeStats = await response.json();
        setStats(data);
      } catch (err: unknown) {
        setError((err as Error).message || "An unexpected error occurred");
        setStats(null); // Clear previous stats on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  const categories: Category[] = stats
    ? [
        {
          id: "all",
          title: "All",
          solved: stats.totalSolved,
          total: stats.totalQuestions,
        },
        {
          id: "easy",
          title: "Easy",
          solved: stats.easySolved,
          total: stats.totalEasy,
        },
        {
          id: "medium",
          title: "Medium",
          solved: stats.mediumSolved,
          total: stats.totalMedium,
        },
        {
          id: "hard",
          title: "Hard",
          solved: stats.hardSolved,
          total: stats.totalHard,
        },
      ]
    : [];

  const selectedCategory =
    categories.find((c) => c.id === selectedLevel) || categories[0];

  const completionRate = selectedCategory
    ? ((selectedCategory.solved / selectedCategory.total) * 100).toFixed(1)
    : "0";

  const chartData: ChartData[] = categories.map((cat) => ({
    name: cat.title,
    solved: cat.solved,
    total: cat.total,
  }));

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.trim());
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return <div>No data available. Please try again.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">LeetCode Stats</h1>

      {/* Username Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter LeetCode Username"
          value={username}
          onChange={handleUsernameChange}
          className="p-2 border border-gray-300 rounded w-full"
          aria-label="LeetCode Username"
        />
      </div>

      {/* Difficulty Buttons */}
      <div className="flex gap-4 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedLevel(cat.id)}
            className={`p-2 border ${
              selectedLevel === cat.id
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
            aria-pressed={selectedLevel === cat.id}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Selected Category Progress */}
      <div className="border p-4 mb-4">
        <h2 className="text-lg mb-2">{selectedCategory.title} Progress</h2>
        <div className="mb-2">
          Solved: {selectedCategory.solved} / {selectedCategory.total} (
          {completionRate}%)
        </div>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Problem Distribution Chart */}
      <div className="border p-4 mb-4 h-64">
        <h2 className="text-lg mb-2">Problem Distribution</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="solved" stroke="#3B82F6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Other Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4">
          <div>Ranking: #{stats.ranking?.toLocaleString()}</div>
          <div>Acceptance Rate: {stats.acceptanceRate?.toFixed(1)}%</div>
        </div>
        <div className="border p-4">
          <div>Contribution Points: {stats.contributionPoints}</div>
          <div>Reputation: {stats.reputation}</div>
        </div>
      </div>
    </div>
  );
};

export default LeetcodeStats;
