const STAR_TYPES = Object.freeze({
  BRONZE_STAR: 'br_st',
  SILVER_STAR: 'sl_st',
  GOLD_STAR: 'go_st',
});

function addStar(starType) {
  const count = localStorage.getItem(starType);

  if (count) {
    localStorage.removeItem(count);
    localStorage.setItem(starType, Number(count) + 1);
  } else {
    localStorage.setItem(starType, 1);
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
