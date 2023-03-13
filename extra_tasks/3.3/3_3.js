//Задание 1
//Дан массив чисел. Нужно написать функцию, которая найдет непрерывный подмассив (содержащий как минимум одно число) с наибольшей суммой элементов и вернет эту сумму.
//Пример: Входной массив: [-2,1,-3,4,-1,2,1,-5,4] Ответ: 6
//Обоснование: Подмассив [4,-1,2,1] имеет наибольшую сумму элементов.


function maxResArraySlice(arr) {
  let arrSumStart = [arr[0]];
  let max_value = arr[0];
  let max_idx = [0, 0];

  for (let i = 1; i < arr.length; i++) {
    let sum = arrSumStart[arrSumStart.length - 1] + arr[i];
    arrSumStart.push(sum);
  }

  for (let l = 0; l < arr.length; ++l) {
    for (let r = 0; r < arr.length; ++r) {
      if (r > l && arrSumStart[r] - arrSumStart[l] > max_value) {
        max_value = arrSumStart[r] - arrSumStart[l];
        max_idx = [l + 1, r + 1];
      }
    }
  }

  return max_value;
}

console.log('maxSummSlice:', maxResArraySlice([-2, 1, -3, 4, -1, 2, 1, -5, 4]));


//Задание 2

//Дан массив чисел (prices), в котором i-ый элемент это цена данной акции в i-ый день. Нужно написать функцию, которая вычисляет максимальную возможную прибыль брокера, если он может купить или продать одну акцию в любой день сколько угодно раз, но он обязан продать акцию до того, как купит следующую (в любой момент времени у него не более одной акции).

//Пример 1: Входной массив: [7,1,5,3,6,4] 
//Ответ: 7   Обоснование: Покупаем во второй день (цена = 1) и продаем в третий день (цена = 5), выгода = 5 - 1 = 4. Затем покупаем в 4 день (цена = 3) и продаем в пятый день (цена = 6). Выгода = 6 - 3 = 3. Итого, 4 + 3 = 7.

//Пример 2: Входной массив: [1,2,3,4,5]
//  Ответ: 4 Обоснование: Покупаем в первый день (цена = 1) и продаем в пятый день (цена = 5), выгода = 5 - 1 = 4.

//Пример 3: Входной массив: [7,6,4,3,1] 
//Ответ: 0 Обоснование: Ничего не покупаем и не продаем, так что выгода = 0.

//Ограничения:  1 <= prices.length <= 3 * 10 ^ 4  ; 0 <= prices[i] <= 10 ^ 4

function myProfit(arr) {
  let hasAction = false;
  let profit = 0;

  for (let i = 0; i < arr.length; i++) {
    if (isLocMax(arr, i) && hasAction) {
      profit += arr[i];
      hasAction = false;
    }
    if (isLocMin(arr, i) && !hasAction) {
      profit -= arr[i];
      hasAction = true;
    }
  }
  return profit;
}

function isLocMax(arr, ind) {
  if (arr.length < 2) return false;
  if (ind === arr.length - 1) return true;
  if (ind === 0) return arr[0] > arr[1];

  return arr[ind - 1] < arr[ind] && arr[ind] > arr[ind + 1];
}
function isLocMin(arr, ind) {
  if (arr.length < 2) return false;
  if (ind === arr.length - 1) return false;
  if (ind === 0) return arr[0] < arr[1];

  return arr[ind - 1] > arr[ind] && arr[ind] < arr[ind + 1];
}

console.log('myProfit: ', myProfit([7, 6, 4, 3, 1]));
console.log('myProfit: ', myProfit([1, 2, 3, 4, 5]));
console.log('myProfit: ', myProfit([7, 1, 5, 3, 6, 4]));
