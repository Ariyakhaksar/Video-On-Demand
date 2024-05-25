import Cookies from "js-cookie";

const setCookie = (tokens: { access: string; refresh: string }) => {
   document.cookie = `access=${tokens.access}; max-age=${1 * 60 * 60}`;
   document.cookie = `refresh=${tokens.refresh}; max-age=${1 * 24 * 60 * 60}`;
};
const setCookieAuth = (tokens: { access: string; refresh: string }) => {
   Cookies.set("access", tokens.access, {
      expires: 1 / 24, // 1 hour
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
   });

   // تنظیم کوکی 'refresh'
   Cookies.set("refresh", tokens.refresh, {
      expires: 1, // 1 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
   });
};
const getCookie = (cookieName: string) => {
   return document.cookie
      .split(";")
      .find((token) => token.trim().split("=")[0] === cookieName)
      ?.split("=")[1];
};

const removeCookie = (cookieName: string) => {
   Cookies.remove(cookieName);
};

export { setCookie, getCookie, setCookieAuth , removeCookie };
