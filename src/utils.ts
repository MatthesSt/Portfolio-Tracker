export function getCurrentDateTime() {
  return new Date().toLocaleDateString().substring(0, 3) + ' ' + new Date().toLocaleTimeString().substring(0, 5);
}
