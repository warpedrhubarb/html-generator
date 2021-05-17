import { l, head, tail } from '@hexlet/pairs-data';
import {
  make, append, toString, node, getName, getValue,
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
