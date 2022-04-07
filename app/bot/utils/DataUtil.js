module.exports.arrayToColumnConverter = (array, n) => {
  const dataList = Object.values(array);
  let arr = [];
  dataList.forEach((item, index) => {
    if (Math.floor(index / n) >= arr.length) {
      const arr1 = [];
      arr.push(arr1);
    }
    arr[arr.length - 1].push(item);
  });
  return arr;
};
