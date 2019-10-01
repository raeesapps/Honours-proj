class HashDictionary {
  constructor() {
    this.dictionary = {};
    this.keyHashToKeyMappings = {};
  }

  add(key, value) {
    const hashCode = key.hashCode();
    this.dictionary[hashCode] = value;
    this.keyHashToKeyMappings[hashCode] = key;
  }

  keyObj(keyHash) {
    return this.keyHashToKeyMappings[keyHash];
  }

  get(key) {
    const hashCode = key.hashCode();
    return this.dictionary[hashCode];
  }

  size() {
    return Object.keys(this.dictionary).length;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  forEach(callback) {
    return Object.keys(this.dictionary).forEach(callback);
  }

  map(callback) {
    return Object.keys(this.dictionary).map(callback);
  }

  toString() {
    return JSON.stringify(this.dictionary, this.keyHashToKeyMappings);
  }
}

export default HashDictionary;
