const BigNumber = require("bignumber.js");
const { rawToAdia } = require("../../utils");

const confirmationQuorumTransformer = confirmationQuorum => {
  const minWeight = rawToAdia(
    new BigNumber(confirmationQuorum.online_stake_total)
      .times(0.001)
      .toNumber(),
  );

  confirmationQuorum.principal_representative_min_weight = minWeight;

  return confirmationQuorum;
};

exports.transformer = confirmationQuorumTransformer;
