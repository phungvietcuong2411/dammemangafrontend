import React, { useState, useMemo, useEffect } from "react";
import SearchAndAddBar from "./SearchAndAddBar";
import AuthorStats from "./AuthorStats";
import AuthorTable from "./AuthorTable";
import AuthorModal from "./AuthorModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ToastNotification from "./ToastNotification";
import Pagination from "./Pagination";
import AuthorRepositoryImpl from "../../../../infrastructure/repositories/AuthorRepository"


const ITEMS_PER_PAGE = 9;
const authorRepo = new AuthorRepositoryImpl();


export default function AuthorManagement() {
  const [query, setQuery] = useState("");
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await authorRepo.getAllAuthors();
        const mapped = data.map((a, index) => ({
          id: index + 1,
          realId: a.idAuthor,
          nameAuthor: a.nameAuthor
        }));
        setAuthors(mapped);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tác giả:", error);
        showToast("Lấy danh sách tác giả thất bại", "error");
      }
    };

    fetchAuthors();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return authors;
    return authors.filter(a => a.nameAuthor.toLowerCase().includes(q));
  }, [query, authors]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  useEffect(() => setCurrentPage(1), [query]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const openAdd = () => {
    setModalMode("add");
    setSelected({ nameAuthor: "" });
    setIsModalOpen(true);
  };



  const openEdit = (author) => {
    setModalMode("edit");
    setSelected({ ...author });
    setIsModalOpen(true);
  };

  const handleUpdate = async (author) => {
    try {
      const res = await authorRepo.updateAuthor(
        author.realId,
        author.nameAuthor
      );

      // cập nhật UI theo dữ liệu backend trả về
      setAuthors(prev =>
        prev.map(a =>
          a.realId === res.idAuthor
            ? { ...a, nameAuthor: res.nameAuthor }
            : a
        )
      );

      showToast("Cập nhật tác giả thành công!", "success");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      showToast("Cập nhật tác giả thất bại!", "error");
    }
  };

  const handleAdd = async (author) => {
    try {
      const res = await authorRepo.createAuthor(author.nameAuthor);
      const newId = Math.max(0, ...authors.map(a => a.id)) + 1;

      const newAuthor = {
        id: newId,
        realId: res.idAuthor,
        nameAuthor: res.nameAuthor
      };

      setAuthors(prev => [newAuthor, ...prev]);
      showToast("Thêm tác giả thành công!", "success");
      setIsModalOpen(false);

    } catch (error) {
      console.error(error);
      showToast("Thêm tác giả thất bại!", "error");
    }
  };

  const handleDelete = async (author) => {
    try {
      await authorRepo.deleteAuthor(author.realId);

      setAuthors(prev => prev.filter(a => a.realId !== author.realId));

      showToast("Xóa tác giả thành công!", "success");
      setIsConfirmOpen(false);

    } catch (error) {
      console.error(error);
      showToast("Xóa tác giả thất bại!", "error");
    }
  };

  const saveAuthor = () => {
    if (!selected?.nameAuthor?.trim()) {
      showToast("Vui lòng nhập tên tác giả!", "error");
      return;
    }

    if (modalMode === "add") {
      handleAdd(selected);
      return;
    }
    else {
      handleUpdate(selected);
      return;
    }

    setIsModalOpen(false);
  };

  const confirmDelete = (author) => {
    setSelected(author);
    setIsConfirmOpen(true);
  };

  const executeDelete = () => {
    setAuthors(prev => prev.filter(a => a.realId !== deleteId));
    showToast("Xóa tác giả thành công!", "success");
    setDeleteId(null);
    if (paginated.length === 1 && currentPage > 1) setCurrentPage(p => p - 1);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6 relative">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý tác giả</h1>
          <SearchAndAddBar query={query} onQueryChange={setQuery} onAdd={openAdd} />
        </header>

        <main>
          <section className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
            <AuthorStats total={authors.length} filtered={filtered.length} />
            <AuthorTable authors={paginated}
              onEdit={openEdit}
              onDelete={confirmDelete} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filtered.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            )}
          </section>
        </main>

        <AuthorModal
          isOpen={isModalOpen}
          mode={modalMode}
          author={selected}
          onClose={() => setIsModalOpen(false)}
          onSave={saveAuthor}
          onChange={setSelected}
        />

        <DeleteConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => handleDelete(selected)}
        />

        <ToastNotification toast={toast} onClose={() => setToast(prev => ({ ...prev, show: false }))} />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}