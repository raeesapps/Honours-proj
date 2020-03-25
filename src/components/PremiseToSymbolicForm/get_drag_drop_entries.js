function getDragDropEntries(firstAtom, secondAtom, thirdAtom, fourthAtom) {
  const entries = [
    {
      id: 'item-3',
      content: `¬${firstAtom}`,
    },
    {
      id: 'item-4',
      content: `¬${secondAtom}`,
    },
    {
      id: 'item-5',
      content: `${firstAtom}`,
    },
    {
      id: 'item-6',
      content: `${secondAtom}`,
    },
  ];

  if (thirdAtom) {
    entries.push(
      {
        id: 'item-7',
        content: `${thirdAtom}`,
      },
      {
        id: 'item-8',
        content: `¬${thirdAtom}`,
      },
    );
  }

  if (fourthAtom) {
    entries.push(
      {
        id: 'item-9',
        content: `${fourthAtom}`,
      },
      {
        id: 'item-10',
        content: `¬${fourthAtom}`,
      },
    );
  }

  return entries;
}

export default getDragDropEntries;
