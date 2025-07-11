const newKeyGen = (
  i: number,
  dynamicFields: {
    [key: string]: string;
  },
) => {
  const generatedKey = `v${Object.keys(dynamicFields).length + i + 1}`;
  if (dynamicFields[generatedKey] != null) {
    return newKeyGen(i + 1, dynamicFields);
  }
  return generatedKey;
};

export default newKeyGen;
