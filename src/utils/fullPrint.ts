/* eslint-disable @typescript-eslint/no-explicit-any */
function objectAsString(obj: any) {
  return JSON.stringify(obj);
}

export default function fullPrint(obj: any) {
  console.log(objectAsString(obj));
}
