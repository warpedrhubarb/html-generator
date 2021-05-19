import {
  l, head, tail, toString as listToString,
} from '@hexlet/pairs-data';
import { is } from '@hexlet/html-tags';
import {
  make, append, toString, node, getName, getValue,
  b2p, map, mirror, filter, quotes, removeHeaders,
  reduce, emptyTagsCount, headersCount, extractHeaders,
  wordsCount,
} from '../src/html-tags.js';

describe('dom 1', () => {
  it('#make', () => {
    const dom1 = make();
    expect(dom1).toBe(l());
  });

  it('#node', () => {
    const node1 = node('h1', 'hello, world');
    expect(getName(node1)).toBe('h1');
    expect(getValue(node1)).toBe('hello, world');
  });

  it('#append', () => {
    const dom1 = make();

    const dom2 = append(dom1, node('h1', 'hello, world'));
    expect(getName(head(dom2))).toBe('h1');
    expect(getValue(head(dom2))).toBe('hello, world');

    const dom = append(dom2, node('h2', 'header2'));
    expect(getName(head(dom))).toBe('h2');
    expect(getValue(head(dom))).toBe('header2');
    expect(getName(head(tail(dom)))).toBe('h1');
    expect(getValue(head(tail(dom)))).toBe('hello, world');
  });

  it('#toString 1', () => {
    const result = '';
    expect(toString(make())).toEqual(result);
  });

  it('#toString 2', () => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'hello, world'));

    const result = '<h1>hello, world</h1>';
    expect(toString(dom2)).toEqual(result);
  });

  it('#toString 3', () => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'hello, world'));
    const dom = append(dom2, node('h2', 'header2'));

    const result = '<h1>hello, world</h1><h2>header2</h2>';
    expect(toString(dom)).toEqual(result);
  });

  it('#toString 4', () => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'hello, world'));
    const dom3 = append(dom2, node('h2', 'hello, world'));
    const dom4 = append(dom3, node('h3', 'hello, world'));
    const dom5 = append(dom4, node('h4', 'hello, world'));
    const dom = append(dom5, node('h5', 'bye-bye!'));

    const result = '<h1>hello, world</h1><h2>hello, world</h2><h3>hello, world</h3><h4>hello, world</h4><h5>bye-bye!</h5>';
    expect(toString(dom)).toEqual(result);
  });
});

describe('dom 2', () => {
  let dom;

  beforeEach(() => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'scheme'));
    const dom3 = append(dom2, node('p', 'is a lisp'));

    const dom4 = append(dom3, node('h1', 'haskell'));
    const dom5 = append(dom4, node('p', 'is a functional language'));

    const dom6 = append(dom5, node('h1', 'prolog'));
    dom = append(dom6, node('p', 'is about logic'));
  });

  it('#b2p', () => {
    const dom1 = append(make(), node('blockquote', 'quote'));
    const processedDom = b2p(dom1);

    const result = '<p>quote</p>';
    expect(toString(processedDom)).toBe(result);
  });

  it('#mapAsB2p', () => {
    const dom1 = append(make(), node('blockquote', 'quote'));
    const processedDom = map((element) => {
      if (is('blockquote', element)) {
        return node('p', getValue(element));
      }
      return element;
    }, dom1);

    const result = '<p>quote</p>';
    expect(toString(processedDom)).toBe(result);
  });

  it('#map', () => {
    const result = map(() => {}, make());
    expect(toString(result)).toBe('');
    const processedDom = map((element) => {
      if (is('h1', element)) {
        return node('h2', getValue(element));
      }
      return element;
    }, dom);

    const result2 = '<h2>scheme</h2><p>is a lisp</p><h2>haskell</h2><p>is a functional language</p><h2>prolog</h2><p>is about logic</p>';
    expect(toString(processedDom)).toBe(result2);
  });

  it('#mirror', () => {
    const result = '<h1>emehcs</h1><p>psil a si</p><h1>lleksah</h1><p>egaugnal lanoitcnuf a si</p><h1>golorp</h1><p>cigol tuoba si</p>';
    expect(toString(mirror(dom))).toBe(result);
  });
});

describe('dom 3', () => {
  let dom;

  beforeEach(() => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'scheme'));
    const dom3 = append(dom2, node('p', 'is a lisp'));

    const dom4 = append(dom3, node('h1', 'haskell'));
    const dom5 = append(dom4, node('p', 'is a functional language'));

    const dom6 = append(dom5, node('h1', 'prolog'));
    dom = append(dom6, node('p', 'is about logic'));
  });

  it('#removeHeaders', () => {
    const processedDom = removeHeaders(dom);

    const result = '<p>is a lisp</p><p>is a functional language</p><p>is about logic</p>';
    expect(toString(processedDom)).toBe(result);
  });

  it('#filter', () => {
    const processedDom = filter((element) => is('h1', element), dom);

    const result = '<h1>scheme</h1><h1>haskell</h1><h1>prolog</h1>';
    expect(toString(processedDom)).toBe(result);

    const processedDom2 = filter((element) => is('p', element), dom);
    const result2 = '<p>is a lisp</p><p>is a functional language</p><p>is about logic</p>';
    expect(toString(processedDom2)).toBe(result2);

    expect(toString(make())).toBe('');
  });

  it('#quotes', () => {
    const dom0 = make();
    const dom1 = append(dom0, node('h1', 'scheme'));
    const dom2 = append(dom1, node('blockquote', 'live is life'));
    const dom3 = append(dom2, node('p', 'is a lisp'));
    const dom4 = append(dom3, node('blockquote', 'i am sexy, and i know it'));
    const result = l('i am sexy, and i know it', 'live is life');
    expect(listToString(quotes(dom4))).toBe(listToString(result));
  });
});

describe('dom 4', () => {
  let dom;

  beforeAll(() => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'scheme'));
    const dom3 = append(dom2, node('p', 'is a lisp'));

    const dom4 = append(dom3, node('h1', 'haskell'));
    const dom5 = append(dom4, node('p', 'is a functional language'));

    const dom6 = append(dom5, node('h1', 'prolog'));

    const dom7 = append(dom6, node('h2', ''));
    const dom8 = append(dom7, node('span', ''));
    dom = append(dom8, node('p', 'is about logic'));
  });

  describe('#headersCount', () => {
    it('should calculate headers count', () => {
      const count = headersCount('h1', dom);
      expect(count).toBe(3);
    });
  });

  describe('#reduce', () => {
    it('should count h1 tags', () => {
      const count = reduce((element, acc) => (is('h1', element) ? acc + 1 : acc), 0, dom);
      expect(count).toBe(3);
    });

    it('should count span tags', () => {
      const count2 = reduce((element, acc) => (is('span', element) ? acc + 1 : acc), 0, dom);
      expect(count2).toBe(1);
    });

    it('should reduce to string', () => {
      const count3 = reduce((element, acc) => {
        const content = getValue(element);
        return is('h1', element) ? `${acc} ${content}` : acc;
      }, 'Languages:', dom);

      const expected3 = 'Languages: prolog haskell scheme';
      expect(count3).toBe(expected3);
    });

    it('should calculate tags count', () => {
      const func = (_element, acc) => acc + 1;
      const count = reduce(func, 0, dom);
      expect(count).toBe(8);
    });
  });

  describe('#emptyTagsCount', () => {
    it('should calculate empty tags count', () => {
      const dom1 = append(dom, node('blockquote', ''));
      const dom2 = append(dom1, node('blockquote', ''));
      const dom3 = append(dom2, node('blockquote', 'quote'));
      const dom4 = append(dom3, node('blockquote', ''));
      const dom5 = append(make(), node('blockquote', 'smth'));
      expect(emptyTagsCount('blockquote', dom3)).toBe(2);
      expect(emptyTagsCount('blockquote', dom4)).toBe(3);
      expect(emptyTagsCount('blockquote', dom5)).toBe(0);
      expect(emptyTagsCount('p', dom4)).toBe(0);
    });
  });
});

describe('dom 5', () => {
  const dom1 = make();
  const dom2 = append(dom1, node('h1', 'scheme'));
  const dom3 = append(dom2, node('p', 'is a lisp'));

  const dom4 = append(dom3, node('h2', 'haskell'));
  const dom5 = append(dom4, node('p', 'is a functional language'));

  const dom6 = append(dom5, node('h2', 'prolog'));
  const dom7 = append(dom6, node('p', 'sicp'));
  const dom8 = append(dom7, node('blockquote', 'haskell haskell'));
  const dom9 = append(dom8, node('blockquote', 'quote'));
  const dom10 = append(dom9, node('h2', 'haskell'));
  const dom = append(dom10, node('p', 'is about logic haskell'));

  it('#extractHeaders', () => {
    const headersAsP = extractHeaders(dom);
    const result = '<p>haskell</p><p>prolog</p><p>haskell</p>';
    expect(toString(headersAsP)).toBe(result);
  });

  it('#wordsCount', () => {
    expect(wordsCount('i', 'scheme', dom)).toBe(0);
    expect(wordsCount('h1', 'undefined', dom)).toBe(0);
    expect(wordsCount('h1', 'scheme', dom)).toBe(1);
    expect(wordsCount('blockquote', 'haskell', dom)).toBe(2);
    expect(wordsCount('h2', 'haskell', dom)).toBe(2);
    expect(wordsCount('h2', 'h2', dom)).toBe(0);
  });
});
