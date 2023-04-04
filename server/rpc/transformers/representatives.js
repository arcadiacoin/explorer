const sortBy = require("lodash/sortBy");
const reverse = require("lodash/reverse");
const { rawToAdia } = require("../../utils");

const representativesTransformer = json => {
  json.representatives = reverse(
    sortBy(
      Object.entries(json.representatives).reduce(
        (acc = {}, [account, weight]) => {
          const weightAsNumber = Number(weight) && rawToAdia(weight);
          if (weightAsNumber > 0.1) {
            acc.push({
              account,
              weight: weightAsNumber,
            });
          }
          return acc;
        },
        [],
      ),
      ["weight"],
    ),
  );

  return json;
};

exports.transformer = representativesTransformer;
