const getRandomIntMinMax = (min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

const getIdxForMaxItem = (arr) => {
  let idx = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[idx]) idx = i;
  }
  return idx;
};

export { getRandomIntMinMax, getIdxForMaxItem };
