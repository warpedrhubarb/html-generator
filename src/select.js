import { l, cons as consList, concat } from '@hexlet/pairs-data';
import { is, hasChildren, children } from '@hexlet/html-tags';
import { reduce } from './html-tags.js';

const select = (tag, tree) => reduce((element, acc) => {
  const newAcc = hasChildren(element) ? concat(select(tag, children(element)), acc) : acc;
  return is(tag, element) ? consList(element, newAcc) : newAcc;
}, l(), tree);

export default select;
