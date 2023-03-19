/* eslint-disable max-classes-per-file */
// Задание 1;
// Реализовать однонаправленный список;

// Элементом списка является Node:
// class Node { next: Node;  value: number; }

// Список List:
// class List { root: Node;  /* methods */ }

// Для списка необходимо реализовать следующие методы:
// Инициализация (конструктор) - создание корневого элемента списка.
//  Принимает единственный параметр - значение корневого элемента.

// Добавление элемента в список - addNode(value: number, i?: number): boolean
//  Добавляет элемент в список со значением value.
//  Если аргумент i передан, то элемент вставляется после i-го (root - 0-ой, его next - 1-ый итд).
// Если указан i, превышающий индекс последнего элемента списка, то элемент не вставляется,
// метод возвращает false.
// Если i не передан, то элемент вставляется в конец списка.
// Если вставка произошла успешно, то метод возвращает true.

// Удаление элемента из списка - removeNode(i?: number): boolean. Удаляет i-ый элемент из списка.
// Если указан i, превышающий индекс последнего элемента списка, то элемент не удаляется,
// метод возвращает false. Если i не передан, то удаляется последний элемент в списке.
// Если удаление произошло успешно,   то метод возвращает true.
// Если список содержит единственный элемент (root),
// то удаление не производится и метод возвращает false.

// Печать (просмотр) однонаправленного списка - print().
// Вывести на консоль значения всех элементов подряд через запятую, начиная с root

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.root = new Node(value);
    this.head = this.root;
    this.tail = this.root;
  }

  addNode(value, i) {
    const newNode = new Node(value);
    if (typeof i !== 'number') {
      this.tail.next = newNode;
      this.tail = newNode;
      return true;
    }
    let currentNode = this.head;
    let count = 0;
    while (currentNode) {
      if (count === i) {
        const tmp = currentNode.next || null;
        currentNode.next = newNode;
        newNode.next = tmp;
        if (!newNode.next.next) this.tail = newNode.next;
        return true;
      }
      currentNode = currentNode.next;
      count += 1;
    }
    return false;
  }

  print() {
    let currentNode = this.head;
    let stringAllValue = `${this.head.value}`;
    while (currentNode.next) {
      stringAllValue += `, ${currentNode.next.value}`;
      currentNode = currentNode.next;
    }
    console.log(stringAllValue);
    return this;
  }

  delete(i) {
    if (this.head.next === null) {
      return false;
    }
    if (typeof i !== 'number') {
      let currentNode = this.head;
      while (currentNode.next) {
        if (currentNode.next === this.tail) {
          this.tail = null;
          currentNode.next = null;
          this.tail = currentNode;
          return true;
        }
        currentNode = currentNode.next;
      }
    }
    let count = 0;
    let currentNode = this.head;
    while (currentNode.next) {
      if (count + 1 === i) {
        const tmp = currentNode.next.next;
        currentNode.next = null;
        currentNode.next = tmp;
        return true;
      }
      currentNode = currentNode.next;
      count += 1;
    }
    return false;
  }
}

const myList = new LinkedList(5);

myList.addNode(3);

myList.addNode(7, 5);
myList.print();

myList.addNode(4, 0);
myList.print();
myList.addNode(2);
myList.print();
myList.addNode(1);
myList.print();
myList.addNode(0, 0);
myList.print();

myList.delete(0);
myList.print();
myList.delete();
myList.print();
myList.delete(1);
myList.print();
myList.delete(2);
myList.print();
myList.delete(7);
myList.print();
