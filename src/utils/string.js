function capitaliseAndRemoveWhitespace(str) {
  return str.split(' ').map((substr) => substr.charAt(0).toUpperCase() + substr.substring(1)).join('');
}

export default capitaliseAndRemoveWhitespace;
