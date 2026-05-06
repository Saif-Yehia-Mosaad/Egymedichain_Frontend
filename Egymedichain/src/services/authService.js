import { api } from "./http";

export const googleLogin = async (credential) => {
  const res = await api.post("/auth/google", {
    token: credential,
  });
  return res.data;
};