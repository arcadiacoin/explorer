const BigNumber = require("bignumber.js");

const rawToAdia = raw => {
  const value = new BigNumber(raw.toString());
  return value.shiftedBy(34 * -1).toNumber();
};

const adiaToRaw = rai => {
  const value = new BigNumber(rai.toString());
  return value.shiftedBy(34).toNumber();
};

// 02LV are not present in addresses
const ACCOUNT_REGEX = /((adia|paw)_)?[13][13-9a-km-uw-z]{59}/;

const isValidAccountAddress = address =>
  new RegExp(`^${ACCOUNT_REGEX.toString().replace(/\//g, "")}$`, "i").test(
    address,
  );

const toBoolean = value =>
  typeof value === "string"
    ? value.toLowerCase() === "true" ||
      !["", "0", "false"].includes(value.toLowerCase())
    : typeof value === "number"
    ? value !== 0
    : !!value;

module.exports = {
  rawToAdia,
  adiaToRaw,
  toBoolean,
  isValidAccountAddress,
};
