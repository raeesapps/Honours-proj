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

  if (word === 'people') {
    return 'person';
  }

  const n = word.length;

  const last3Characters = word.substring(n - 3, n);
  const last2Characters = word.substring(n - 2, n);
  const lastCharacter = word.substring(n - 1, n);

  if (last3Characters === 'ies') {
    const wordWithoutIes = word.substring(0, n - 3);
    return `${wordWithoutIes}y`;
  }

  if (last2Characters === 'en') {
    const wordWithoutEn = word.substring(0, n - 2);
    return `${wordWithoutEn}an`;
  }

  if (last2Characters === 'es') {
    return word.substring(0, n - 2);
  }

  if (lastCharacter === 's') {
    return word.substring(0, n - 1);
  }

  return undefined;
}

export default singularise;
