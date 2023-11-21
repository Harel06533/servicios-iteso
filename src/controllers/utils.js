// checks if a string is compossed of only numeric characters
function isNumericString(string) {
  return /^\d+$/.test(string);
}

// normalizes a string (removes accents, sets to lowercase, etc.);
function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export { isNumericString, normalizeString };
