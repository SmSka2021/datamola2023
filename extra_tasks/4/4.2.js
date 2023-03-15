// Реализовать арифметику в функциональном стиле.
//  Написать функции для простейших операций с двумя числами add, sub, mul, div
// (сложить, вычесть, умножить, разделить), так что
// 1. Если их вызвать с двумя аргументами, возвращается результат операции
// let a = add(1,2);

const composition = (...fns) => (arg) => fns.reduceRight((res, fn) => fn(res), arg);

function add(a, b) {
  if (arguments.length === 2) return a + b;
  return composition(a, b);
}

function sub(a, b) {
  if (arguments.length === 2) return a - b;
  return composition(a, b);
}

function sub1(a) {
  return a - 1;
}

function mul(a, b) {
  if (arguments.length === 2) return a * b;
  return composition(a, b);
}

function div(a, b) {
  if (arguments.length === 2) return a / b;
  return composition(a, b);
}

console.log(add(2, 5));
console.log(sub(22, 5));
console.log(mul(22, 5));
console.log(div(22, 5));
console.log(sub1(22));

const a = add(1, 2);
const b = mul(a, 10);
const c = sub1(b);

const d = mul(sub(a, 1))(c);

console.log(a, b, c, d);
