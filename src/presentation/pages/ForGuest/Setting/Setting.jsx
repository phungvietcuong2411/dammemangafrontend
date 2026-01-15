import UserRepositoryImpl from "../../../../infrastructure/repositories/AuthRepository";
import toast, { Toaster } from "react-hot-toast";
import "../../../../styles/font.css";
import { useState } from "react";

// Icon từ lucide-react
import { Eye, EyeOff } from "lucide-react";

const userRepo = new UserRepositoryImpl();

function Setting() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // State hiển thị/ẩn mật khẩu
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (newPassword.length < 6 || newPassword.length > 15) {
            toast.error("Mật khẩu mới phải từ 6 đến 15 ký tự");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu nhập lại không khớp");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Bạn chưa đăng nhập");
            return;
        }

        setLoading(true);
        try {
            const result = await userRepo.changePassword(oldPassword, newPassword, token);
            toast.success(result || "Đổi mật khẩu thành công");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            // Reset trạng thái mắt
            setShowOldPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        } catch (err) {
            toast.error(err.response?.data || err.message || "Lỗi kết nối");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="quicksand-uniquifier bg-gray-300">
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="h-120 w-300 flex flex-col items-center justify-center bg-white/40 rounded-2xl p-6 shadow-lg">
                    <div className="text-gray-700 text-2xl uppercase font-bold mb-6">
                        ĐỔI MẬT KHẨU
                    </div>

                    {/* Mật khẩu hiện tại */}
                    <div className="w-full mb-5 relative">
                        <label className="block mb-2 font-bold text-gray-700">Mật khẩu hiện tại</label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                className="rounded-xl w-full p-3 pr-12 bg-white border border-gray-300 focus:outline-none focus:border-blue-500 transition"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Nhập mật khẩu cũ"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Mật khẩu mới */}
                    <div className="w-full mb-5 relative">
                        <label className="block mb-2 font-bold text-gray-700">Mật khẩu mới</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="rounded-xl w-full p-3 pr-12 bg-white border border-gray-300 focus:outline-none focus:border-blue-500 transition"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Từ 6 - 15 ký tự"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Nhập lại mật khẩu */}
                    <div className="w-full mb-6 relative">
                        <label className="block mb-2 font-bold text-gray-700">Nhập lại mật khẩu mới</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="rounded-xl w-full p-3 pr-12 bg-white border border-gray-300 focus:outline-none focus:border-blue-500 transition"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu mới"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleChangePassword}
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                            loading
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600 active:scale-95"
                        }`}
                    >
                        {loading ? "Đang xử lý..." : "ĐỔI MẬT KHẨU"}
                    </button>
                </div>
            </div>

            <Toaster position="top-right" />
        </div>
    );
}

export default Setting;