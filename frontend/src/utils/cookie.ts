const setCookie = (tokens: { access: string; refresh: string }) => {
   document.cookie = `access=${tokens.access}; max-age=${1 * 60 * 60}`;
   document.cookie = `refresh=${tokens.refresh}; max-age=${1 * 24 * 60 * 60}`;
};

const getCookie = (cookieName: string) => {
   return document.cookie
      .split(";")
      .find((token) => token.trim().split("=")[0] === cookieName)
      ?.split("=")[1];
};

const delCookie = () => {
   const cookies = document.cookie.split(";");

   for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
   }
};

export { setCookie, getCookie };
