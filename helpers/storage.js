const storageHandler = {
  setValue: (name, value) => {
    window.localStorage.setItem(name, value);
    window.sessionStorage.setItem(name, value);
  },

  getValue: (name) => {
    return (
      window.sessionStorage.getItem(name) || window.localStorage.getItem(name)
    );
  },

  removeValue: (name) => {
    window.localStorage.removeItem(name);
    window.sessionStorage.removeItem(name);
  },
};

export default storageHandler;
