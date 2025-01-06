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
  Search,
  Trophy,
  Award,
  Star,
  Activity,
  AlertCircle,
  Loader2,
} from "lucide-react";

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

interface ChartData {
  name: string;
  solved: number;
  total: number;
}

const LoadingSpinner: React.FC = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <p className="text-gray-600 dark:text-gray-400">Loading stats...</p>
    </div>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4 text-red-500">
      <AlertCircle className="h-8 w-8" />
      <p className="text-center">{message}</p>
    </div>
  </div>
);

const LeetcodeStats: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [username, setUsername] = useState<string>("saiNikhilAvula");
  const [isSearching, setIsSearching] = useState<boolean>(false);

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
            `Unable to fetch data for ${username}. Please check the username and try again.`
          );
        }

        const data: LeetCodeStats = await response.json();
        setStats(data);
      } catch (err: unknown) {
        setError((err as Error).message || "An unexpected error occurred");
        setStats(null);
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    };

    if (username) fetchStats();
  }, [username]);

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

  const selectedCategory =
    categories.find((c) => c.id === selectedLevel) || categories[0];
  const completionRate = selectedCategory
    ? ((selectedCategory.solved / selectedCategory.total) * 100).toFixed(1)
    : "0";

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
  };

  const chartData: ChartData[] = categories.map((cat) => ({
    name: cat.title,
    solved: cat.solved,
    total: cat.total,
  }));

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!stats)
    return <ErrorDisplay message="No data available. Please try again." />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          LeetCode Statistics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your LeetCode progress and achievements
        </p>
      </div>

      {/* Username Search */}
      <form onSubmit={handleUsernameSubmit} className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter LeetCode Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 
                     rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     dark:bg-gray-800 dark:text-white transition-colors duration-200"
            aria-label="LeetCode Username"
          />
        </div>
      </form>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedLevel(cat.id)}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              selectedLevel === cat.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-400"
            }`}
          >
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {cat.title}
            </div>
            <div
              className="mt-2 text-2xl font-bold"
              style={{ color: cat.color }}
            >
              {cat.solved}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                /{cat.total}
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(cat.solved / cat.total) * 100}%`,
                  backgroundColor: cat.color,
                }}
              />
            </div>
          </button>
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
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-gray-600 dark:text-gray-400">Ranking</span>
          </div>
          <div className="mt-2 text-2xl font-bold">
            #{stats.ranking?.toLocaleString()}
          </div>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            <span className="text-gray-600 dark:text-gray-400">
              Acceptance Rate
            </span>
          </div>
          <div className="mt-2 text-2xl font-bold">
            {stats.acceptanceRate?.toFixed(1)}%
          </div>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-500" />
            <span className="text-gray-600 dark:text-gray-400">
              Contribution Points
            </span>
          </div>
          <div className="mt-2 text-2xl font-bold">
            {stats.contributionPoints}
          </div>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-500" />
            <span className="text-gray-600 dark:text-gray-400">Reputation</span>
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.reputation}</div>
        </div>
      </div>
    </div>
  );
};

export default LeetcodeStats;
