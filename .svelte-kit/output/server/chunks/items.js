import { w as writable } from "./index2.js";
import { v4 } from "uuid";
const items = writable([]);
const addItem = (item) => {
  const id = v4();
  const newItem = { ...item, id };
  items.update((i) => [...i, newItem]);
  return id;
};
export {
  addItem as a,
  items as i
};
