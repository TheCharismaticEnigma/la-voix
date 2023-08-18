// Generic Doubly Linked list for storing the songs/tracks.
// Implement a Queue for the songs. Under the hood, implemented w/ linked list.

type ListNodeType<T> = ListNode<T> | null;

interface ILinkedList<T> {
  next: ListNodeType<T>;
  prev: ListNodeType<T>;
  data: T;
}

class ListNode<T> implements ILinkedList<T> {
  public next: ListNodeType<T> = null;
  public prev: ListNodeType<T> = null;

  constructor(public data: T) {
    if (!this.prev) this.prev = null;
    if (!this.next) this.next = null;
  }
}

interface LinkedListInterface<T> {
  insertInBegin: (data: T) => T;
  insertAtEnd: (data: T) => T;
  deleteInBegin: () => void;
  deleteAtEnd: () => void;
  toArray: () => T[];
  size: () => number;
  //   search: (comparator: (data: T) => boolean) => ListNodeType<T>;
  //   isNull: (node: ListNode<T>) => boolean;
}

class LinkedList<T> implements LinkedListInterface<T> {
  #totalElements = 0;
  #first: ListNodeType<T> = null;
  #last: ListNodeType<T> = null;

  // O(n) TC | O(1) SC
  insertAtEnd(data: T) {
    const newNode = new ListNode<T>(data);

    if (!this.#last) this.#first = this.#last = newNode;
    else {
      this.#last.next = newNode;
      newNode.prev = this.#last;
      this.#last = newNode; // set a new pointer to the tail.
    }

    this.#totalElements++; // increment the total

    return data;
  }

  // O(1) TC & SC
  insertInBegin(data: T) {
    const newNode = new ListNode<T>(data);

    if (!this.#first) this.#first = this.#last = newNode;
    else {
      this.#first.prev = newNode;
      newNode.next = this.#first;
      this.#first = newNode;
    }

    this.#totalElements++; // increment the total

    return data;
  }

  deleteInBegin() {
    if (!this.#first) return; // No Element

    if (this.#first === this.#last && !this.#first.next)
      this.#first = null; // Single Element
    else {
      // Multiple Elements.
      const newHead = this.#first.next;

      newHead && (newHead.prev = null);
      this.#first.next = null;
      this.#first = newHead;
    }

    this.#totalElements--; // regardless of the scenario.
  }

  deleteAtEnd() {
    if (!this.#first) return;

    this.#totalElements--;

    if (!this.#first.next) {
      this.#first = null;
      return;
    }

    if (this.#last && this.#last.prev) {
      const secondLast = this.#last.prev;

      secondLast.next = null;
      this.#last.prev = null;
      this.#last = secondLast;
    }

    return;
  }

  size() {
    return this.#totalElements;
  }

  toArray() {
    if (!this.#first) return [];
    if (!this.#first.next) return [this.#first.data];

    const elements = [] as T[];
    let current: ListNodeType<T> = this.#first;

    while (current) {
      elements.push(current.data);
      current = current.next;
    }

    return elements;
  }
}

export default LinkedList;
