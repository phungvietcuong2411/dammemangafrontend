import { X, Send, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import CommentService from "../../../../usecases/CommetService";

export default function CommentSidebar({ isOpen, onClose }) {
  const { chapterId } = useParams();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);

  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);
  const commentService = new CommentService();

  function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = (now - date) / 1000; // tính bằng giây

    if (diff < 60) return "vừa xong";
    if (diff < 3600) return Math.floor(diff / 60) + " phút trước";
    if (diff < 86400) return Math.floor(diff / 3600) + " giờ trước";
    if (diff < 2592000) return Math.floor(diff / 86400) + " ngày trước";
    if (diff < 31536000) return Math.floor(diff / 2592000) + " tháng trước";
    return Math.floor(diff / 31536000) + " năm trước";
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!chapterId) return;

    const fetchComments = async () => {
      try {
        const data = await commentService.getCommentsByChapter(chapterId);
        setCommentsData(data);
        setTimeout(scrollToBottom, 200);
      } catch (error) {
        console.error("Lỗi tải comment:", error);
      }
    };
    fetchComments();

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/chapter/${chapterId}`, (message) => {
        const incomingData = JSON.parse(message.body);

        setCommentsData((prevComments) => {
          const isDeleted = incomingData.deleted === true;

          if (isDeleted) {
            return prevComments.map((cmt) =>
              cmt.idComment === incomingData.idComment
                ? { ...cmt, deleted: true }
                : cmt
            );
          }

          const exists = prevComments.some(
            (c) => c.idComment === incomingData.idComment
          );
          if (exists) return prevComments;

          return [...prevComments, incomingData];
        });

        if (!incomingData.deleted) {
          setTimeout(scrollToBottom, 100);
        }
      });
    });

    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
    };
  }, [chapterId]);

  useEffect(() => {
    scrollToBottom();
  }, [isOpen]);

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      const formData = {
        idUser: user.idUser,
        idChapter: chapterId,
        title: comment,
      };
      await commentService.createComment(formData);

      setComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleDeleteComment = async (idComment) => {
    try {
      await commentService.deleteComment(idComment);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-none">
          <h3 className="text-lg font-bold">
            Bình luận ({commentsData.length})
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Danh sách bình luận*/}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {commentsData.map((cmt) =>
            cmt.deleted === false ? (
              <div key={cmt.idComment} className="flex gap-3 items-start group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                  {cmt.nameUser?.[0] || "?"}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      {cmt.nameUser}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm mt-1 break-words">
                    {cmt.title}
                  </p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {timeAgo(cmt.createAt)}
                  </span>
                </div>

                {(user.idUser === cmt.idUser || user.role === "admin") && (
                  <div>
                    <button
                      onClick={() => handleDeleteComment(cmt.idComment)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                key={cmt.idComment}
                className="flex gap-3 items-center opacity-60"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500">
                  {/* Có thể dùng icon X hoặc để trống */}
                  <span className="text-lg select-none">×</span>
                </div>

                <div className="flex-1 border border-gray-200 bg-gray-100 rounded-lg px-3 py-2">
                  <p className="text-gray-500 text-sm italic">
                    {cmt.nameUser} đã xóa bình luận này.
                  </p>
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Ô nhập bình luận */}
        <div className="p-4 border-t bg-white flex-none">
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Viết bình luận..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleComment()}
            />
            <button
              onClick={() => handleComment()}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition disabled:bg-gray-400"
              disabled={!comment.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
 