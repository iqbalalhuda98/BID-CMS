const cookie = require("js-cookie");

export const cookies = {
  set: (name, value) => {
    cookie.set(name, value, { expires: 1 });
  },

  get: (name) => {
    return cookie.get(name);
  },

  remove: (name) => {
    cookie.remove(name);
  },
};
