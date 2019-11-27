import singularise from '../../utils/inflector';

function premiseToFunctions(premise) {
  const {
    firstTerm,
    secondTerm,
  } = premise.getTerms();

  const singularisedFirstTerm = singularise(firstTerm);

  if (!singularisedFirstTerm) {
    throw new Error(`Inflector cannot singularise the word ${firstTerm}`);
  }

  return [
    {
      id: 'item-3',
      content: `not (is${singularisedFirstTerm} x)`,
    },
    {
      id: 'item-4',
      content: `is${singularisedFirstTerm} x`,
    },
    {
      id: 'item-5',
      content: `is${secondTerm} x`,
    },
    {
      id: 'item-6',
      content: `not (is${secondTerm} x)`,
    },
  ];
}

export default premiseToFunctions;
