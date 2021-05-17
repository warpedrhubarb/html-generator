import { cons, car, cdr } from '@hexlet/pairs';
import {
  l, isEmpty, head, tail, cons as consList,
} from '@hexlet/pairs-data';
import { is } from '@hexlet/html-tags';
import { reverse as reverseStr } from './strings.js';

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
