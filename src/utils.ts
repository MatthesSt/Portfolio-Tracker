export function getCurrentDateTime() {
  return new Date().toLocaleDateString().substring(0, 3) + ' ' + new Date().toLocaleTimeString().substring(0, 5);
}

export const reduceSum=(arr:{value:string}[])=>arr.reduce((a:number, b:{value:string}) => a + +b.value.replace(',', '.'), 0);
