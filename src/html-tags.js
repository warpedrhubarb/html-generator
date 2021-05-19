import { cons, car, cdr } from '@hexlet/pairs';
import {
  l, isEmpty, head, tail, cons as consList,
} from '@hexlet/pairs-data';
import { is } from '@hexlet/html-tags';
import { reverse as reverseStr } from './strings.js';
import wc from './utils.js';

export const make = () => l();
export const node = (tag, body) => cons(tag, body);
export const getName = (item) => car(item);
export const getValue = (item) => cdr(item);
export const append = (dom, item) => consList(item, dom);
export const toString = (dom) => {
  if (isEmpty(dom)) {
    return '';
  }

  const tag = getName(head(dom));
  const body = getValue(head(dom));
  const rest = toString(tail(dom));
  return `${rest}<${tag}>${body}</${tag}>`;
};

export const map = (func, elements) => {
  if (isEmpty(elements)) {
    return l();
  }

  const newElement = func(head(elements));
  return consList(newElement, map(func, tail(elements)));
};

export const mirror = (elements) => (
  map((element) => node(getName(element), reverseStr(getValue(element))), elements)
);

export const b2p = (elements) => {
  if (isEmpty(elements)) {
    return l();
  }

  let newElement;
  const element = head(elements);
  if (is('blockquote', element)) {
    newElement = node('p', getValue(element));
  } else {
    newElement = element;
  }

  return consList(newElement, b2p(tail(elements)));
};

export const filter = (func, elements) => {
  if (isEmpty(elements)) {
    return l();
  }

  const current = head(elements);
  const tailElements = tail(elements);

  if (func(current)) {
    return consList(current, filter(func, tailElements));
  }

  return filter(func, tailElements);
};

export const quotes = (elements) => {
  const filtered = filter((element) => is('blockquote', element), elements);

  return map((element) => getValue(element), filtered);
};

export const removeHeaders = (elements) => {
  if (isEmpty(elements)) {
    return l();
  }

  const element = head(elements);
  const tailElements = tail(elements);
  if (is('h1', element)) {
    return removeHeaders(tailElements);
  }
  return consList(element, removeHeaders(tailElements));
};

export const reduce = (func, acc, elements) => {
  if (isEmpty(elements)) {
    return acc;
  }

  const current = head(elements);
  const tailElements = tail(elements);
  const newAcc = func(current, acc) ? func(current, acc) : acc;

  return reduce(func, newAcc, tailElements);
};

export const emptyTagsCount = (tag, elements) => {
  const countEmpty = (element, acc) => (is(tag, element) && getValue(element) === '' ? acc + 1 : acc);
  return reduce(countEmpty, 0, elements);
};

export const headersCount = (tagName, elements) => {
  const iter = (items, acc) => {
    if (isEmpty(items)) {
      return acc;
    }

    const item = head(items);
    const newAcc = is(tagName, item) ? acc + 1 : acc;
    return iter(tail(items), newAcc);
  };
  return iter(elements, 0);
};

export const extractHeaders = (elements) => {
  const filtered = filter((element) => is('h2', element), elements);
  return map((element) => node('p', getValue(element)), filtered);
};

export const wordsCount = (tag, word, elements) => {
  const filtered = filter((element) => is(tag, element), elements);
  const inside = (element) => wc(word, getValue(element));
  return reduce((element, acc) => acc + inside(element), 0, filtered);
};
