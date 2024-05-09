const setCookie = (tokens: { access: string; refresh: string }) => {
   document.cookie = `access=${tokens.access}; max-age=${1 * 60 * 60}`;
   document.cookie = `refresh=${tokens.access}; max-age=${1 * 24 * 60 * 60}`;
};

export {setCookie}