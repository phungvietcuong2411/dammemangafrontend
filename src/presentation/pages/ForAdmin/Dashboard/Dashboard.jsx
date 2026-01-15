import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  BookOpen,
  Users,
  Eye,
  Star,
  Heart,
  Tags
} from "lucide-react";

import UserRepositoryImpl from "../../../../infrastructure/repositories/AuthRepository";
import AuthorService from "../../../../usecases/AuthorService";
import CategoryService from "../../../../usecases/CategoryService";
import MangaService from "../../../../usecases/MangaService";
import FollowService from "../../../../usecases/FollowService";

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [stats, setStats] = useState({
    totalManga: 0,
    totalCategory: 0,
    totalAuthor: 0,
    totalUser: 0,
    totalView: 0,
  });

  const [topStoriesByViews, setTopStoriesByViews] = useState([]);
  const [topStoriesByFollows, setTopStoriesByFollows] = useState([]);

  const userRepo = new UserRepositoryImpl();
  const mangaService = new MangaService();
  const followService = new FollowService();

  const fetchStats = async () => {
    try {
      setIsRefreshing(true);

      const totalUser = await userRepo.getTotalUsers();
      const totalAuthor = await new AuthorService().getTotalAuthors();
      const totalCategory = await new CategoryService().getTotalCategories();
      const totalManga = await mangaService.getTotalMangas();
      const totalView = await mangaService.getTotalViews();

      const allMangas = await mangaService.getAllMangas();

      const sortedTopViews = [...allMangas]
        .sort((a, b) => b.countView - a.countView)
        .slice(0, 5);

      setTopStoriesByViews(sortedTopViews.map((m, i) => ({
        rank: i + 1,
        title: m.name,
        views: m.countView,
        rating: m.rating || 4.9
      })));

      const topFollowedMangas = await followService.getTopMangaFollowed(10);

      setTopStoriesByFollows(topFollowedMangas.slice(0, 3).map((m, i) => ({
        rank: i + 1,
        title: m.nameManga,
        follows: m.followCount
      })));

      setStats({
        totalManga: totalManga,
        totalCategory: totalCategory,
        totalAuthor: totalAuthor,
        totalUser: totalUser,
        totalView: totalView,
      });

    } catch (error) {
      console.error("Failed to load dashboard stats", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statsData = [
    { label: "Tổng truyện", value: stats.totalManga, icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { label: "Thể loại", value: stats.totalCategory, icon: Tags, color: "from-purple-500 to-purple-600" },
    { label: "Tác giả", value: stats.totalAuthor, icon: Users, color: "from-green-500 to-green-600" },
    { label: "Người dùng", value: stats.totalUser, icon: Users, color: "from-yellow-500 to-yellow-600" },
    { label: "Lượt xem", value: stats.totalView, icon: Eye, color: "from-red-500 to-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={fetchStats}
            disabled={isRefreshing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              isRefreshing
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-gray-800 border-gray-700 hover:bg-gray-700"
            }`}
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            <span className="text-sm">Làm mới</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">
                    {isRefreshing ? "—" : stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={20} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phần top truyện */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Eye className="text-red-400" size={18} /> Top truyện đọc nhiều
            </h3>
            <div className="space-y-2">
              {topStoriesByViews.map((story) => (
                <div key={story.rank} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-500 w-8">#{story.rank}</span>
                    <div>
                      <p className="font-medium">{story.title}</p>
                      <p className="text-xs text-gray-400">{story.views.toLocaleString()} lượt xem</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-medium">{story.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Heart className="text-pink-400" size={18} /> Top truyện được theo dõi nhiều
            </h3>
            <div className="space-y-2">
              {topStoriesByFollows.map((story) => (
                <div key={story.rank} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-500 w-8">#{story.rank}</span>
                    <div>
                      <p className="font-medium">{story.title}</p>
                      <p className="text-xs text-gray-400">{story.follows.toLocaleString()} lượt theo dõi</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}