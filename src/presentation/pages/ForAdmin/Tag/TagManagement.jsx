import React, { useState, useMemo, useEffect } from "react";
import SearchAndAddBar from "./SearchAndAddBar";
import TagStats from "./TagStats";
import TagTable from "./TagTable";
import TagModal from "./TagModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ToastNotification from "./ToastNotification";
import Pagination from "./Pagination";
import CategoryRepositoryImpl from "../../../../infrastructure/repositories/CategoryRepository"

const categoryRepo = new CategoryRepositoryImpl();
const ITEMS_PER_PAGE = 9;

export default function TagManagement() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryRepo.getAllCategories();
        const mapped = data.map((c, index) => ({
          id: index + 1,
          realId: c.idCategory,
          name: c.nameCategory,
          description: c.description
        }));
        setGenres(mapped);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchData();
  }, []);

  // Lọc & phân trang
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return genres;
    return genres.filter(g =>
      g.name.toLowerCase().includes(q) ||
      (g.description || "").toLowerCase().includes(q)
    );
  }, [query, genres]);

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
    setSelected({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const openEdit = (genre) => {
    setModalMode("edit");
    setSelected({ ...genre });
    setIsModalOpen(true);
  };

  const saveGenre = async () => {
    if (modalMode === "add") {
      try {
        const res = await categoryRepo.createCategory(selected.name, selected.description);
        const newTag = {
          id: genres.length + 1,
          realId: res.idCategory,
          name: res.nameCategory,
          description: res.description,
        };
        setGenres(prev => [newTag, ...prev]);
        showToast("Thêm thể loại thành công!", "success");
        setIsModalOpen(false);
      } catch (error) {
        console.error(error);
        showToast("Thêm thể loại thất bại!", "error");
      }
    } else {
      await handleUpdate({
        idCategory: selected.realId,
        nameCategory: selected.name,
        description: selected.description
      });
    }
  };


  const handleUpdate = async (category) => {
    try {
      const res = await categoryRepo.updateCategory(category.idCategory, category.nameCategory, category.description);
      setGenres(prev =>
        prev.map(g =>
          g.realId === res.idCategory
            ? { ...g, name: res.nameCategory, description: res.description }
            : g
        )
      );

      showToast("Cập nhật thể loại thành công!", "success");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      showToast("Cập nhật thể loại thất bại!", "error");
    }
  };



  const confirmDelete = (id) => setDeleteId(id);

  const executeDelete = async () => {
    if (deleteId == null) return;

    try {
      const tagToDelete = genres.find(g => g.id === deleteId);
      if (!tagToDelete) return;

      await categoryRepo.deleteCategory(tagToDelete.realId);

      // Cập nhật state cục bộ
      setGenres(prev => prev.filter(g => g.id !== deleteId));
      showToast("Xóa thể loại thành công!", "success");
      setDeleteId(null);

      // Giảm trang nếu cần
      if (paginated.length === 1 && currentPage > 1) setCurrentPage(p => p - 1);
    } catch (error) {
      console.error(error);
      showToast("Xóa thể loại thất bại!", "error");
    }
  };


  const truncate = (text, len = 50) => text?.length > len ? text.slice(0, len) + "..." : text;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6 relative">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý thể loại truyện</h1>
          <SearchAndAddBar query={query} onQueryChange={setQuery} onAdd={openAdd} />
        </header>

        <main>
          <section className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
            <TagStats total={genres.length} filtered={filtered.length} />
            <TagTable
              genres={paginated}
              onEdit={openEdit}
              onDelete={confirmDelete}
              truncate={truncate}
            />
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

        <TagModal
          isOpen={isModalOpen}
          mode={modalMode}
          genre={selected}
          onClose={() => setIsModalOpen(false)}
          onSave={saveGenre}
          onChange={setSelected}
        />

        <DeleteConfirmModal
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
          onConfirm={executeDelete}
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