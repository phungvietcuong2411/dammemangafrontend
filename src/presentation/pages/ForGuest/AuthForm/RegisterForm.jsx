import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterForm({ onRegisterSuccess }) {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        toast.dismiss();

        if (!account.trim()) { toast.error("Vui lòng nhập tên tài khoản!"); return; }
        if (password.length < 6 || password.length > 15) { toast.error("Mật khẩu phải từ 6 đến 15 ký tự!"); return; }
        if (password !== confirmPassword) { toast.error("Mật khẩu nhập lại không khớp!"); return; }

        try {
            const res = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ account: account.trim(), password, role: "guest" }),
            });

            if (!res.ok) { const msg = await res.text(); throw new Error(msg || "Đăng ký thất bại!"); }

            await res.json();
            toast.success("Đăng ký thành công! Đang chuyển sang đăng nhập...", { duration: 3000 });

            setAccount(""); setPassword(""); setConfirmPassword("");
            if (onRegisterSuccess) onRegisterSuccess();
        } catch (err) {
            toast.error(err.message || "Lỗi kết nối server!");
        }
    };

    return (
        <form className="flex flex-col gap-5 text-left" onSubmit={handleRegister}>
            <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="Tên người dùng"
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
                {showPass ? (
                    <EyeOff className="absolute right-3 top-3 cursor-pointer text-gray-500" size={20} onClick={() => setShowPass(false)} />
                ) : (
                    <Eye className="absolute right-3 top-3 cursor-pointer text-gray-500" size={20} onClick={() => setShowPass(true)} />
                )}
            </div>

            <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                    type={showConfirmPass ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
                {showConfirmPass ? (
                    <EyeOff className="absolute right-3 top-3 cursor-pointer text-gray-500" size={20} onClick={() => setShowConfirmPass(false)} />
                ) : (
                    <Eye className="absolute right-3 top-3 cursor-pointer text-gray-500" size={20} onClick={() => setShowConfirmPass(true)} />
                )}
            </div>

            <button
                type="submit"
                className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300 mt-2 w-full"
            >
                Đăng ký
            </button>
        </form>
    );
}
