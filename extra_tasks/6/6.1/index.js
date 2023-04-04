/* eslint-disable consistent-return */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-restricted-syntax */

// ЗАДАНИЕ 1

// Сделать список, который создается функцией createList из дополнительного задания 5.2 выпадающим.
//  Сначала список должен отрисоваться так же, как и в задании 5.2, но теперь,
//  если пользователь кликнет на заголовок какого-то списка, данный список должен исчезнуть.
//  При повторном клике на заголовок исчезнувшего списка список должен вновь появиться.
// Важные требования:
// 1. Использовать только один обработчик событий (применить делегирование)
// 2. Клик вне текста заголовка (на пустом месте) ничего делать не должен

const list = [{
  value: 'Пункт 1.',
  children: null,
},

{
  value: 'Пункт 2.',
  children: [{
    value: 'Подпункт 2.1.',
    children: null,
  },
  {
    value: 'Подпункт 2.2.',
    children: [
      {
        value: 'Подпункт 2.2.1.',
        children: null,
      },
      {
        value: 'Подпункт 2.2.2.',
        children: [
          {
            value: 'Подпункт 2.2.2.1',
            children: null,
          }],
      },
    ],
  },
  {
    value: 'Подпункт 2.3.',
    children: [
      {
        value: 'Подпункт 2.3.1',
        children: [
          {
            value: 'Подпункт 2.3.1.1',
            children: null,
          },
          {
            value: 'Подпункт 2.3.1.2',
            children: null,
          },
        ],
      },
    ],
  },
  ],
},
{
  value: 'Пункт 3.',
  children: [{
    value: 'Подпункт 3.1.',
    children: null,
  },
  {
    value: 'Подпункт 3.2.',
    children: [
      {
        value: 'Подпункт 3.2.1.',
        children: null,
      },
      {
        value: 'Подпункт 3.2.2.',
        children: [
          {
            value: 'Подпункт 3.2.2.1',
            children: null,
          }],
      },
    ],
  },
  {
    value: 'Подпункт 3.3.',
    children: [
      {
        value: 'Подпункт 3.3.1',
        children: [
          {
            value: 'Подпункт 3.3.1.1',
            children: null,
          },
          {
            value: 'Подпункт 3.3.1.2',
            children: null,
          },
        ],
      },
    ],
  },
  {
    value: 'Подпункт 3.4.',
    children: null,
  },
  ],
},
];

function createElement(node, parent) {
  const li = document.createElement('li');
  const txt = document.createElement('span');
  txt.textContent = node.value;
  li.style.fontSize = '0.9em';
  txt.style.fontSize = '1em';
  txt.classList.add('li');
  const ul = document.createElement('ul');
  li.append(txt, ul);
  parent.append(li);
  if (!node.children) return;
  if (node.children) {
    for (const nod of node.children) {
      createElement(nod, ul);
    }
  }
}

function createList(nodes, title) {
  const root = document.getElementById('main');
  root.style.fontSize = '24px';
  const titleList = document.createElement('h2');
  titleList.textContent = title;
  const root1 = document.createElement('ul');
  root.append(titleList, root1);
  if (!nodes.length) return;
  nodes.forEach((node) => createElement(node, root1));
}
createList(list, 'My list');

function hideFunction(e) {
  e.stopPropagation();
  e.target.nextElementSibling.classList.toggle('display_none');
}
document.querySelectorAll('.li').forEach((el) => el.addEventListener('click', hideFunction));
