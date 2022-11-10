import { Query } from "../models/Query";

export const resolveFilter = (filterString: string | undefined) => {
  let res: { [key: string]: any } = {};
  console.log({ filterString });
  if (filterString) {
    const filterArr = filterString.split(",");

    filterArr.forEach((queryString) => {
      const query = resolveQuery(queryString);
      if (query)
        if (query.operator == "!=") {
          res[query.key] = { ...res[query.key], ...{ $ne: query.value } };
        } else if (query.operator == ">") {
          res[query.key] = { ...res[query.key], ...{ $gt: query.value } };
        } else if (query.operator == "<") {
          res[query.key] = { ...res[query.key], ...{ $lt: query.value } };
        } else if (query.operator == ">=") {
          res[query.key] = { ...res[query.key], ...{ $gte: query.value } };
        } else if (query.operator == "<=") {
          res[query.key] = { ...res[query.key], ...{ $lte: query.value } };
        } else if (query.operator == "==") {
          res[query.key] = query.value;
        } else if (query.operator == "*=") {
          res[query.key] = {
            ...res[query.key],
            ...{ $regex: new RegExp(query.value) },
          };
        }
    });
  }
  return res;
};

const resolveQuery = (queryString: string) => {
  const regex = /(\w+\s*)(==|>=|<=|!=|\*=|>|<)(.*)/;
  const matcher = queryString.match(regex);
  if (matcher)
    return new Query({
      key: matcher[1],
      operator: matcher[2],
      value: matcher[3],
    });
  else return null;
};
