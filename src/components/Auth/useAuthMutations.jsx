import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { loginApi, registerApi } from "./auth.api";

export function useLogin() {
  const navigate = useNavigate();
  const { saveUser } = useAuth();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      const token = res.data?.accessToken || res.data?.token || null;
      const user = res.data?.user || res.data || null;
      saveUser(token, user);
      navigate("/");
    },
  });
}


export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      navigate("/login");
    },
  });
}


