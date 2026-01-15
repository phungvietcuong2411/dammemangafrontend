import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUsecase } from "../../../../usecases/LoginService";
import { User, Lock, Eye, EyeOff } from "lucide-react";

// 👉 Import UserContext
import { useUser } from "../../../context/UserContext";

export default function LoginForm() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  // 👉 Lấy hàm login từ UserContext
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.dismiss();

    try {
      const user = await loginUsecase(account.trim(), password);

      login({
        account: user.account,
        role: user.role,
        token: user.token,
        idUser: user.idUser,
      });

      toast.success("Đăng nhập thành công!");

      navigate("/");
      window.location.reload();

      setAccount("");
      setPassword("");
    } catch (err) {
      const message =
        err.response?.data || err.message || "Lỗi kết nối server!";
      toast.error(message);
    }
  };

  return (
    <form className="flex flex-col gap-5 text-left" onSubmit={handleLogin}>
      <div className="relative">
        <User className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="Tên người dùng"
          className="w-full border border-gray-300 rounded-lg p-3 pl-10"
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
          className="w-full border border-gray-300 rounded-lg p-3 pl-10 pr-10"
          required
        />
        {showPass ? (
          <EyeOff
            size={20}
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPass(false)}
          />
        ) : (
          <Eye
            size={20}
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPass(true)}
          />
        )}
      </div>

      <button type="submit" className="bg-black text-white py-3 rounded-lg">
        Đăng nhập
      </button>
    </form>
  );
}
