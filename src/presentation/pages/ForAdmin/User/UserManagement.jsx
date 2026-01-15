// src/components/user-management/UserManagement.jsx
import React, { useState, useMemo, useEffect } from "react";
import SearchBox from "./SearchBox";
import UserStats from "./UserStats";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import UserRepositoryImpl from "../../../../infrastructure/repositories/AuthRepository";

const ITEMS_PER_PAGE = 9;
const userRepo = new UserRepositoryImpl();

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch user từ API khi component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userRepo.getAllUsers();
        setUsers(data || []);
      } catch (err) {
        console.error("Lỗi khi lấy user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Lọc dữ liệu theo account
  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.account?.toLowerCase().includes(q) // chỉ filter theo account
    );
  }, [users, query]);

  // Phân trang
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  // Reset trang khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
          <SearchBox query={query} onQueryChange={setQuery} />
        </header>

        <main>
          <section className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
            <UserStats total={users.length} filtered={filteredUsers.length} />

            <UserTable users={paginatedUsers} />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredUsers.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
