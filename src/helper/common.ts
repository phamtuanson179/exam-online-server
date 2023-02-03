export const filterAddAndRemoveElement = (
  curListElements: string[],
  changedListElements: string[]
): {
  add: string[];
  delete: string[];
} => {
  const res = {
    add: [],
    delete: [],
  };

  return {
    add: changedListElements.filter(
      (element: string) => !curListElements.includes(element)
    ),
    delete: curListElements.filter(
      (element: string) => !changedListElements.includes(element)
    ),
  };
};

export const isTwoStringArraySimilar = (arr1: string[], arr2: string[]) => {
  if (arr1?.length === arr2?.length) {
    const amountElementOfArr = arr1?.length;
    let count = 0;
    arr1?.forEach((element1) => {
      if (arr2.find((element2) => element2 == element1)) {
        count++;
      }
    });
    if (count === amountElementOfArr) {
      return true;
    } else return false;
  } else return false;
};

export const s2ab = (s:string) => {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};
