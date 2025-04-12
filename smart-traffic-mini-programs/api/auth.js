import { post } from "@/utils/request";

export function login(data) {
  return post({
    url: "/auth/login",
    data,
  });
}

export function register(data) {
  return post({
    url: "/auth/register",
    data,
  });
}
