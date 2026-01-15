import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute({ children }) {
  const { currentUser } = useUser();

  // nếu user chưa load xong
  if (!currentUser) return null;

  // chỉ cho admin vào
  if (currentUser.role !== "admin") return <Navigate to="/" />;

  return children;
}
