import { l, head, tail } from '@hexlet/pairs-data';
import { is } from '@hexlet/html-tags';
import {
  make, append, toString, node, getName, getValue, b2p, map, mirror,
} from '../src/html-tags.js';

describe('dom', () => {
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
