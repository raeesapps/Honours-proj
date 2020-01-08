// https://github.com/blakeembrey/pluralize/blob/master/pluralize.js#L364
const singularisationRules = [
  [/s$/i, ''],
  [/(ss)$/i, '$1'],
  [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
  [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
  [/ies$/i, 'y'],
  [/(dg|ss|ois|lk|ok|wn|mb|th|ch|ec|oal|is|ec|ck|ix|sser|ts|wb)ies$/i, '$1ie'],
  [/\b(l|(?:neck|cross|hog|aun)?t|coll|faer|food|gen|goon|group|hipp|junk|vegg|(?:pork)?p|charl|calor|cut)ies$/i, '$1ie'],
  [/\b(mon|smil)ies$/i, '$1ey'],
  [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
  [/(seraph|cherub)im$/i, '$1'],
  [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, '$1'],
  [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, '$1sis'],
  [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
  [/(test)(?:is|es)$/i, '$1is'],
  [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
  [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
  [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
  [/(alumn|alg|vertebr)ae$/i, '$1a'],
  [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
  [/(matr|append)ices$/i, '$1ix'],
  [/(pe)(rson|ople)$/i, '$1rson'],
  [/(child)ren$/i, '$1'],
  [/(eau)x?$/i, '$1'],
  [/men$/i, 'man'],
];

const edgeCases = [
  ['I', 'we'],
  ['me', 'us'],
  ['he', 'they'],
  ['she', 'they'],
  ['them', 'them'],
  ['myself', 'ourselves'],
  ['yourself', 'yourselves'],
  ['itself', 'themselves'],
  ['herself', 'themselves'],
  ['himself', 'themselves'],
  ['themself', 'themselves'],
  ['is', 'are'],
  ['was', 'were'],
  ['has', 'have'],
  ['this', 'these'],
  ['that', 'those'],
  // Words ending in with a consonant and `o`.
  ['echo', 'echoes'],
  ['dingo', 'dingoes'],
  ['volcano', 'volcanoes'],
  ['tornado', 'tornadoes'],
  ['torpedo', 'torpedoes'],
  // Ends with `us`.
  ['genus', 'genera'],
  ['viscus', 'viscera'],
  // Ends with `ma`.
  ['stigma', 'stigmata'],
  ['stoma', 'stomata'],
  ['dogma', 'dogmata'],
  ['lemma', 'lemmata'],
  ['schema', 'schemata'],
  ['anathema', 'anathemata'],
  // Other irregular rules.
  ['ox', 'oxen'],
  ['axe', 'axes'],
  ['die', 'dice'],
  ['yes', 'yeses'],
  ['foot', 'feet'],
  ['eave', 'eaves'],
  ['goose', 'geese'],
  ['tooth', 'teeth'],
  ['quiz', 'quizzes'],
  ['human', 'humans'],
  ['proof', 'proofs'],
  ['carve', 'carves'],
  ['valve', 'valves'],
  ['looey', 'looies'],
  ['thief', 'thieves'],
  ['groove', 'grooves'],
  ['pickaxe', 'pickaxes'],
  ['passerby', 'passersby'],
];

function singularise(word) {
  if (!word) {
    return null;
  }

  const filteredEdgeCases = edgeCases.filter((edgeCase) => {
    const [singular, plural] = edgeCase;
    return plural === word;
  });

  if (filteredEdgeCases.length) {
    return filteredEdgeCases.map((edgeCase) => {
      const [singular, plural] = edgeCase;
      return singular;
    })[0];
  }

  let idx = singularisationRules.length - 1;

  while (idx >= 0) {
    const rule = singularisationRules[idx];
    if (rule[0].test(word)) {
      return word.replace(rule[0], () => rule[1].replace(/\$(\d{1,2})/g));
    }
    idx -= 1;
  }

  return word;
}

export default singularise;
