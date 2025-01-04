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
  const [selectedLevel, setSelectedLevel] = useState("all");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "https://leetcode-api-faisalshohag.vercel.app/saiNikhilAvula"
        );
        const data = await response.json();
        const acSubmissionNum = data.matchedUserStats?.acSubmissionNum || [];
        const transformedData = {
          totalSolved: data.totalSolved,
          totalQuestions: data.totalQuestions,
          easySolved:
            acSubmissionNum.find((item) => item.difficulty === "Easy")?.count ||
            data.easySolved,
          totalEasy: data.totalEasy,
          mediumSolved:
            acSubmissionNum.find((item) => item.difficulty === "Medium")
              ?.count || data.mediumSolved,
          totalMedium: data.totalMedium,
          hardSolved:
            acSubmissionNum.find((item) => item.difficulty === "Hard")?.count ||
            data.hardSolved,
          totalHard: data.totalHard,
          ranking: data.ranking,
          submissions: data.totalSubmissions || [],
          recentSubmissions: data.recentSubmissions || [],
        };
        setStats(transformedData);
      } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const difficulties = [
    {
      id: "all",
      title: "All Problems",
      solved: stats.totalSolved,
      total: stats.totalQuestions,
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
      textColor: "text-blue-500",
      borderColor: "border-blue-500",
      description: "Overall Progress",
    },
    {
      id: "easy",
      title: "Easy",
      solved: stats.easySolved,
      total: stats.totalEasy,
      color: "bg-green-500",
      lightColor: "bg-green-100",
      textColor: "text-green-500",
      borderColor: "border-green-500",
      description: "Building Basics",
    },
    {
      id: "medium",
      title: "Medium",
      solved: stats.mediumSolved,
      total: stats.totalMedium,
      color: "bg-yellow-500",
      lightColor: "bg-yellow-100",
      textColor: "text-yellow-500",
      borderColor: "border-yellow-500",
      description: "Strengthening Skills",
    },
    {
      id: "hard",
      title: "Hard",
      solved: stats.hardSolved,
      total: stats.totalHard,
      color: "bg-red-500",
      lightColor: "bg-red-100",
      textColor: "text-red-500",
      borderColor: "border-red-500",
      description: "Expert Challenges",
    },
  ];

  const selectedDifficulty = difficulties.find((d) => d.id === selectedLevel);
  const completionRate = (
    (selectedDifficulty.solved / selectedDifficulty.total) *
    100
  ).toFixed(1);

  // Generate some dummy data for the chart
  const chartData = difficulties.map((diff) => ({
    name: diff.title,
    solved: diff.solved,
    total: diff.total,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            LeetCode Journey
          </h2>
          <p className="mt-3 text-xl text-gray-500 dark:text-gray-400">
            Tracking progress and celebrating milestones
          </p>
        </div>

        {/* Main Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedLevel(difficulty.id)}
                  className={`relative p-4 rounded-xl transition-all duration-200 ${
                    selectedLevel === difficulty.id
                      ? `${difficulty.lightColor} ${difficulty.textColor}`
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {difficulty.title}
                    </span>
                    <span
                      className={`text-2xl font-bold ${
                        selectedLevel === difficulty.id
                          ? difficulty.textColor
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {difficulty.solved}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      of {difficulty.total}
                    </span>
                  </div>
                  {selectedLevel === difficulty.id && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${difficulty.color}`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Stats Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Progress Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {selectedDifficulty.title} Progress
            </h3>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">
                  Completion
                </span>
                <span
                  className={`font-semibold ${selectedDifficulty.textColor}`}
                >
                  {completionRate}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${selectedDifficulty.color} transition-all duration-500`}
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Solved Problems
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedDifficulty.solved}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Problems
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedDifficulty.total}
                </span>
              </div>
            </div>
          </div>

          {/* Chart Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Problem Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="solved"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Ranking Card */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Global Ranking
            </h3>
            <div className="text-4xl font-bold text-indigo-500">
              #{stats.ranking?.toLocaleString()}
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Keep pushing to improve your rank!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetcodeStats;
