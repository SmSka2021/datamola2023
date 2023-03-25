/* eslint-disable consistent-return */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-restricted-syntax */
// Задание 2

// Написать функцию createList, которая будет создавать список и отображать его в теге body.
// Функция createList принимает два параметра:
// -title: string - заголовок списка (тег h2)
// -list - список для отображения
// На бонусный балл необходимо реализовать следующее:
// каждый вложенный подпункт списка должен иметь размер шрифта на 10% меньше своего родителя

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
  li.textContent = node.value;
  li.style.fontSize = '0.9em';
  const ul = document.createElement('ul');
  li.append(ul);
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
