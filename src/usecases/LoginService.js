import  AuthRepository  from "../infrastructure/repositories/AuthRepository";

const authRepo = new AuthRepository();

export async function loginUsecase(account, password) {
    const user = await authRepo.login(account, password);

    // Lưu token và role
    localStorage.setItem("token", user.token);
    localStorage.setItem("account", user.account);
    localStorage.setItem("role", user.role);
    localStorage.setItem("userId", user.idUser);

    return user;
}
