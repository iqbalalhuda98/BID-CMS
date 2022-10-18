import cookies from "js-cookie";
import nextCookie from "next-cookies";
import Router from "next/router";

export const login = (token = undefined) => {
  if (!token) return;

  cookies.set("token", token, { expires: 1 });
  Router.replace("/events");
};

export const auth = (ctx) => {
  const cookie = nextCookie(ctx);

  if (!cookie) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    } else {
      return Router.push("/");
    }
  }

  return cookie;
};

export const logout = () => {
  cookies.remove("token");
  cookies.remove("user");

  Router.replace("/");
};
