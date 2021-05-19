export default (word, text) => {
  const re = new RegExp(word, 'g');
  return (text.match(re) || []).length;
};
