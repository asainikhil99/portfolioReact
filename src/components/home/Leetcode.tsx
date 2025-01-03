"use client";
import React, { useEffect, useState } from "react";

const LeetcodeStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "https://leetcode-api-faisalshohag.vercel.app/saiNikhilAvula"
        );
        const data = await response.json();
        setStats(data);
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
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: "Total Problems",
      value: stats.totalSolved,
      total: stats.totalQuestions,
      color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    },
    {
      title: "Easy",
      value: stats.easySolved,
      total: stats.totalEasy,
      color: "bg-gradient-to-r from-green-500 to-emerald-400",
    },
    {
      title: "Medium",
      value: stats.mediumSolved,
      total: stats.totalMedium,
      color: "bg-gradient-to-r from-yellow-500 to-amber-400",
    },
    {
      title: "Hard",
      value: stats.hardSolved,
      total: stats.totalHard,
      color: "bg-gradient-to-r from-red-500 to-rose-400",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            LeetCode Progress
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <div
                key={index}
                className="group hover:scale-105 transition-all duration-300"
              >
                <div className={`${stat.color} p-[2px] rounded-2xl`}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      {stat.title}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        / {stat.total}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className={`h-full rounded-full ${stat.color}`}
                        style={{ width: `${(stat.value / stat.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div
              className={`bg-gradient-to-r from-purple-500 to-pink-400 p-[2px] rounded-2xl`}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
                <div className="flex justify-center items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Global Ranking
                    </h3>
                    <p className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                      #{stats.ranking}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetcodeStats;
