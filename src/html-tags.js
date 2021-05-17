// eslint-disable-next-line
import { cons, car, cdr, toString as pairToString } from '@hexlet/pairs';
// eslint-disable-next-line
import { l, isEmpty, head, tail, cons as consList, toString as listToString } from '@hexlet/pairs-data';

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
