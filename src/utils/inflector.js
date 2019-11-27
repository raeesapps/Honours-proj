// https://stackoverflow.com/questions/796412/how-to-turn-plural-words-singular
function singularise(word) {
  if (word === 'fish') {
    return word;
  }

  if (word === 'sheep') {
    return word;
  }

  if (word === 'radii') {
    return 'radius';
  }

  if (word === 'children') {
    return 'child';
  }

  if (word === 'mongooses') {
    return 'mongoose';
  }

  if (word === 'genies') {
    return 'genie';
  }

  const n = word.length;

  const last3Characters = /(...)$/;
  const last2Characters = /(..)$/;
  const lastCharacter = /(.)$/;

  const matchLast3Characters = word.match(last3Characters);
  const matchLast2Characters = word.match(last2Characters);
  const matchLastCharacter = word.match(lastCharacter);

  if (matchLast3Characters === 'ies') {
    const wordWithoutIes = word.substring(0, n - 3);
    return `${wordWithoutIes}y`;
  }

  if (matchLast2Characters === 'es') {
    return word.substring(0, n - 2);
  }

  if (matchLastCharacter === 's') {
    return word.substring(0, n - 1);
  }

  return undefined;
}

export default singularise;
