import { l, toString as listToString } from '@hexlet/pairs-data';
import { has, reverse, concat } from '../src/list.js';

describe('Data', () => {
  it('#has', () => {
    const numbers = l(3, 4, 5, 8);
    expect(has(numbers, 3)).toBe(true);
    expect(has(numbers, 8)).toBe(true);
    expect(has(numbers, 0)).toBe(false);
    expect(has(numbers, 7)).toBe(false);
  });

  it('#reverse', () => {
    const numbers = l(3, 4, 5);
    const numbers2 = l(1, 5, 2, 8);
    expect(listToString(reverse(numbers))).toBe('(5, 4, 3)');
    expect(listToString(reverse(numbers2))).toBe('(8, 2, 5, 1)');
    expect(listToString(reverse(l()))).toBe('()');
    expect(listToString(reverse(l(1)))).toBe('(1)');
    expect(listToString(reverse(l(1, 2)))).toBe('(2, 1)');
  });

  it('#concat', () => {
    const numbers = l(3, 4, 5, 8);
    const numbers2 = l(3, 2, 9);
    expect(listToString(concat(numbers, numbers2))).toBe('(3, 4, 5, 8, 3, 2, 9)');
    expect(listToString(concat(numbers, l()))).toBe('(3, 4, 5, 8)');
    expect(listToString(concat(l(), numbers2))).toBe('(3, 2, 9)');
    expect(listToString(concat(l(1, 7, 8, 13, 5, 17, 22, 99, 53, 19), numbers2)))
      .toBe('(1, 7, 8, 13, 5, 17, 22, 99, 53, 19, 3, 2, 9)');
  });
});
