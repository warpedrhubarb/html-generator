// eslint-disable-next-line
import { l, cons as consList, head, tail, isEmpty, toString as listToString } from '@hexlet/pairs-data';

export const has = (list, item) => listToString(list).includes(item);

export const reverse = (list) => {
  const iter = (items, acc) => {
    if (isEmpty(items)) {
      return acc;
    }
    return iter(tail(items), consList(head(items), acc));
  };

  return iter(list, l());
};

export const concat = (list1, list2) => {
  if (isEmpty(list1)) {
    return list2;
  }

  return consList(head(list1), concat(tail(list1), list2));
};
