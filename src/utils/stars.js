const STAR_TYPES = Object.freeze({
  BRONZE_STAR: 'br_s',
  SILVER_STAR: 'sl_s',
  GOLD_STAR: 'go_s',
});

function addStar(starType) {
  const count = localStorage.getItem(starType);

  if (count) {
    localStorage.removeItem(count);
    localStorage.setItem(starType, count + 1);
  } else {
    localStorage.setItem(starType, 0);
  }
}

function getStarCount(starType) {
  const count = localStorage.getItem(starType);

  return count || 0;
}

export {
  STAR_TYPES,
  addStar,
  getStarCount,
};
