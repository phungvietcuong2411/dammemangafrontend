import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
            <div className="bg-[#F9F8F6] h-screen flex flex-col quicksand-uniquifier">
                <div className="flex justify-center items-center flex-1">
                    <div className="p-10 w-[400px] text-center overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div key="login" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.3 }}>
                                    <h2 className="text-3xl mb-6 font-semibold text-gray-800">Đăng nhập</h2>
                                    <LoginForm onLoginSuccess={() => console.log("Logged in!")} />
                                    <p className="mt-6 text-gray-600">
                                        Chưa có tài khoản?{" "}
                                        <button onClick={() => setIsLogin(false)} className="text-blue-600 hover:underline">Đăng ký ngay</button>
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div key="register" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                    <h2 className="text-3xl mb-6 font-semibold text-gray-800">Đăng ký</h2>
                                    <RegisterForm onRegisterSuccess={() => setIsLogin(true)} />
                                    <p className="mt-6 text-gray-600">
                                        Đã có tài khoản?{" "}
                                        <button onClick={() => setIsLogin(true)} className="text-blue-600 hover:underline">Quay lại đăng nhập</button>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
}
