import { performance } from "node:perf_hooks";
import { HashTable, Queue, Stack } from "../dist/index.js";

const count = 100_000;

function measure(label, operation) {
  const start = performance.now();
  operation();
  const elapsed = performance.now() - start;
  console.log(`${label.padEnd(34)} ${elapsed.toFixed(2)} ms`);
}

console.log(`dslearn microbenchmarks (${count.toLocaleString()} operations)`);
console.log("Informational only; timings depend on Node.js and hardware.\n");

measure("Stack push/pop", () => {
  const stack = new Stack();
  for (let value = 0; value < count; value++) stack.push(value);
  while (!stack.isEmpty()) stack.pop();
});

measure("Array push/pop", () => {
  const values = [];
  for (let value = 0; value < count; value++) values.push(value);
  while (values.length > 0) values.pop();
});

measure("Queue enqueue/dequeue", () => {
  const queue = new Queue();
  for (let value = 0; value < count; value++) queue.enqueue(value);
  while (!queue.isEmpty()) queue.dequeue();
});

measure("Array push/shift (baseline)", () => {
  const values = [];
  for (let value = 0; value < count; value++) values.push(value);
  while (values.length > 0) values.shift();
});

measure("HashTable set/get", () => {
  const table = new HashTable();
  for (let value = 0; value < count; value++) table.set(value, value);
  for (let value = 0; value < count; value++) table.get(value);
});

measure("Map set/get", () => {
  const map = new Map();
  for (let value = 0; value < count; value++) map.set(value, value);
  for (let value = 0; value < count; value++) map.get(value);
});
