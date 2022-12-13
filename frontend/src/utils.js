const saveCodeInLocalStorage = (code, savePart, setSavePart, nextPart) => {
  localStorage.setItem(savePart, code);
  setSavePart(nextPart);
};
