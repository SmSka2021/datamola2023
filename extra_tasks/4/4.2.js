// Задание 2
// Реализовать арифметику в функциональном стиле.
// Написать функции для простейших операций с двумя числами add, sub, mul, div, так что
// 1. Если их вызвать с двумя аргументами, возвращается результат операции
// let a = add(1,2); // 3
// let b = mul(a, 10); // 30

// 2. Если их вызвать с одним аргументом (arg1),
// возвращается функция, которая совершает данную операцию со своим аргументом (arg2)
// и аргументом первой функции (arg1) let sub1 = sub(1); // sub1 отнимает от любого числа единицу

// let c = sub1(b); // 29
// let d = mul(sub(a,1), c); // 58

// 3. Написать универсальный метод pipe, принимающий любое число параметров,
// реализующий последовательность арифметических операций с данным числом.
// let doSmth = pipe(add(d), sub(c), mul(b), div(a));
// функция, последовательно выполняющая эти операции.
// let result = doSmth(0); // (((0 + 58) - 29) * 30) / 3 = 290
// let x = pipe(add(1), mul(2))(3); // 8

// 4. Выполнить проверку написанных методов.

function add(a, b) {
  if (arguments.length > 1) return a + b;
  return (y) => a + y;
}

function sub(a, b) {
  if (arguments.length > 1) return a - b;
  return (y) => y - a;
}

function mul(a, b) {
  if (arguments.length > 1) return a * b;
  return (y) => a * y;
}

function div(a, b) {
  if (arguments.length > 1) return a / b;
  return (y) => y / a;
}
const sum = add(1, 2);
const sub1 = sub(1);
const add5 = add(5);
const divNumber2 = div(2);
const mul10 = mul(10);
const mul50 = mul10(5);

console.log(typeof mul10); // function
console.log(sum); // 3
console.log(divNumber2(div(15, 5))); // 1.5
console.log(div(5, 5)); // 1
console.log(sub(4, 1)); // 3
console.log(mul(add5(7), 10)); // 120
console.log(mul50); // 50
console.log(mul(sum, 10)); // 30
console.log(sub1(30)); // 29
console.log(sub(4, 1)); // 3
console.log(add(add(4, 1), 3)); // 8
console.log(mul(sub(4, 1), 2)); // 6

function pipe(...args) {
  function pipeFn(x) {
    // eslint-disable-next-line no-param-reassign
    args.forEach((func) => { x = func(x); });

    return x;
  }
  return pipeFn;
}

// Testing
const num1 = 3;
const num2 = 30;
const num3 = 29;
const num4 = 58;
const doSmth = pipe(add(num4), sub(num3), mul(num2), div(num1));
console.log(doSmth(0)); // (((0 + 58) - 29) * 30) / 3 => выход 290
console.log(pipe(add(1), mul(2))(3)); // ((3 + 1) * 2) =>  выход 8
console.log(pipe(add(10), mul(2), sub(4), div(2))(3)); // (((3 + 10) * 2) - 4) / 2 => выход  11
