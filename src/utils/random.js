function getRandom(items) {
  return items[Math.floor(items.length * Math.random())];
}

export default getRandom;
