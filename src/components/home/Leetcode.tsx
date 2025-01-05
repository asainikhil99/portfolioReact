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

const LeetcodeStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("all");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const username = "saiNikhilAvula"; // Replace with your username
        const response = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${username}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return null;

  const categories = [
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
  ];

  const selectedCategory = categories.find((c) => c.id === selectedLevel);
  const completionRate = (
    (selectedCategory.solved / selectedCategory.total) *
    100
  ).toFixed(1);

  const chartData = categories.map((cat) => ({
    name: cat.title,
    solved: cat.solved,
    total: cat.total,
  }));

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">LeetCode Stats</h1>

      {/* Category Selection */}
      <div className="flex gap-4 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedLevel(cat.id)}
            className={`p-2 border ${
              selectedLevel === cat.id ? "border-blue-500" : "border-gray-300"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Stats Display */}
      <div className="border p-4 mb-4">
        <h2 className="text-lg mb-2">{selectedCategory.title} Progress</h2>
        <div className="mb-2">
          Solved: {selectedCategory.solved} / {selectedCategory.total} (
          {completionRate}%)
        </div>
        <div className="w-full bg-gray-200 h-2">
          <div
            className="bg-blue-500 h-2"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Chart */}
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

      {/* Additional Stats */}
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
