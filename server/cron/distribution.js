const fs = require("fs");
const util = require("util");
const { join } = require("path");
// const rimraf = require("rimraf");
const cron = require("node-cron");
const chunk = require("lodash/chunk");
const BigNumber = require("bignumber.js");

const { nodeCache } = require("../client/cache");
const { client: redisClient } = require("../client/redis");
const { Sentry } = require("../sentry");
const {
  EXPIRE_24H,
  EXPIRE_1W,
  DISTRIBUTION,
  DELEGATORS,
  DORMANT_FUNDS,
  KNOWN_EXCHANGES,
  REDIS_RICH_LIST,
  STATUS,
} = require("../constants");
const { rawToAdia } = require("../utils");
const { BURN_ACCOUNT } = require("../../src/knownAccounts.json");
const { rpc } = require("../rpc");
const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const rmdir = util.promisify(fs.rm)

const { KNOWN_EXCHANGE_ACCOUNTS } = require("../../src/knownAccounts.json");

const DATA_ROOT_PATH = join(__dirname, "../data");
const TMP_ACCOUNTS_PATH = join(DATA_ROOT_PATH, "/tmp/account");
const DISTRIBUTION_PATH = join(DATA_ROOT_PATH, "/distribution.json");
const TMP_DISTRIBUTION_PATH = join(DATA_ROOT_PATH, "/tmp/distribution");
const DORMANT_FUNDS_PATH = join(DATA_ROOT_PATH, "/dormantFunds.json");
const KNOWN_EXCHANGES_PATH = join(DATA_ROOT_PATH, "knownExchanges.json");
const STATUS_PATH = join(DATA_ROOT_PATH, "/status.json");

// Balance + pending below this amount will be ignored
const MIN_TOTAL = 0.0000001;
const MIN_DELEGATOR_TOTAL = 0.0000001;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getAccounts = async () => {
  const { count } = await rpc("frontier_count");

  let currentAccountCount = 0;
  let nextAccount = BURN_ACCOUNT;
  let steps = 500000;
  let nextCount = 0;
  let pushedDefault = false;
  let currentPage = 0;

  await rmdir(`${TMP_ACCOUNTS_PATH}`, { recursive: true });
  await mkdir(`${TMP_ACCOUNTS_PATH}`, { recursive: true });

  while (currentAccountCount < count) {
    nextCount =
      currentAccountCount + steps > count ? count - currentAccountCount : steps;

	// Starts looping endlessly at this account.
	if(nextAccount == 'adia_3zzzxxzx1tujybmmom8r59j55u69hucki6xomsm7xzy5kzxu6twh9zce3ni9')
		nextAccount = 'adia_3dsqo7hyqe5ksudikkjg3whotgijbtrqcy4umzxbf3hyyskp38rqrkfxugei';
	
    const { frontiers } = await rpc("frontiers", {
      account: nextAccount,
      count: nextCount + 1,
    });

    console.log(`getting frontier ${nextAccount}, count ${nextCount + 1}`);

    const currentFrontiers = Object.keys(frontiers);
    // As the request was steps + 1, remove the first element which was the nextAccount
    currentFrontiers.shift();
    currentAccountCount += currentFrontiers.length;
    if (currentFrontiers.length) {
      nextAccount = currentFrontiers[currentFrontiers.length - 1];

		if(!pushedDefault)
		{
			currentFrontiers.push("adia_1goodbye11111111111111111111111111111111111111111111icwgd7tn");
			currentFrontiers.push("adia_1ysyxfp9ise6fb76ffi4ub9eyaqez1pjq8gsysjgbnizcbeyysg49h9obht4");
			currentFrontiers.push("adia_1qfe5u7bcm7qrpp9rhk9p7wyqw316om1ts7s4gm466nwy6ueniik1gzwcno8");
			currentFrontiers.push("adia_18eche7ufa7b8z8e3aci1gqz79gkugea4hxi3ci3zfr586t8hnk81n9ko9pk");
			currentFrontiers.push("adia_3qnosbjb1t1e7jxe3xuhy68kzctqcgkdu3ium5sk4ptaut7cbqphbd4whnxc");
			currentFrontiers.push("adia_3e443j3cj8mzrp9fcxho9wquygz98h53wexxmsaexh57w3ht4zpcpzzy13n3");
			currentFrontiers.push("adia_31t4m1ioogtk6kw1g98wf99dr4id4qajgok37iujq4qkwpqday5c1xhai4m4");
			currentFrontiers.push("adia_3emytdw99gtpgt8chjwj71crpmmm59bccsnzcunyw97tih3ajp3duaq39845");
			currentFrontiers.push("adia_3czg5xi369uxfybq55okc4ca7eeam5ik5mmc6hyfx9mwgjp383tsaukc7xpq");
			currentFrontiers.push("adia_1fj6egy61fdii8cg48hyeeq54qkdnocydpbqk7rzpe8h7ibsjk8nutt5o3tb");
			currentFrontiers.push("adia_176got1nmmiiads9etonxugs3k8jqriep3cwyc8urc8egkaooh3w7ncjg4wr");
			currentFrontiers.push("adia_19ap3fhycjro954pucsdkq7ux4dn95e9yxu9yc3z9aaj3h6j1z8th6asa8jk");
			currentFrontiers.push("adia_3czw46c6muaaswpb9crxz9z3seoku4muq3816gmbd6g4q91otou1rr8e9jaq");
			currentFrontiers.push("adia_3bd9iw1py5n9aez8cn86qxtxh45j65jgdar8ow7cqsg87sd4gy5jmy96ob4p");
			currentFrontiers.push("adia_3nx3w8dzmym4otn94hqw4p1r4ztk5hm43xty3jnbtuah6km4hniwasxgtb7x");
			currentFrontiers.push("adia_1re5oi6cxgzj3rqf9cj8a7nbnqhiiie5kyknjrg8es845n8p1tckfpuu8b56");
			currentFrontiers.push("adia_1ggha4iy5im5aa34te47bmtn1hmfbaa1f3qkbfrtnfstqnjwenh3btdkuuyf");
			currentFrontiers.push("adia_13wemmuc616hqtbrhnxrato7ruit799owmnwpady8cgyn845sipmy9bys8rx");
			currentFrontiers.push("adia_3k7ax6z5f9dgh6oo5c54ebzcoz3r8m3dnxnb3h6syc8h3w1jy6owq1kkdktp");
			currentFrontiers.push("adia_1ieybwizw1kdtc1nj3yzidtjmryasz8hxbgruxr1hrshkc7n9bzb37wiw83b");
			currentFrontiers.push("adia_353heao14o8yxxyrozkcqtgghpqi8wijtp1qegidt799exqhesdp3isfb8w1");
			currentFrontiers.push("adia_1c55kj6ptyfoqs7fyad8fsrpd15onjwwyuj6jy5f975keecn5zgr4aeefome");
			currentFrontiers.push("adia_1e7w6e3xfkcbn5s6gx9koug81kj7fynqo959bbndnorkxp4o3dr1nf6hi74b");
			currentFrontiers.push("adia_3zp5ipq4cx75kwurbduekbpk4apa35okg3ge91xjxffzu7peox5r95mcrmun");

			pushedDefault = true;
		}
      fs.writeFileSync(
        `${TMP_ACCOUNTS_PATH}/${currentPage}.json`,
        JSON.stringify(currentFrontiers, null, 2),
      );
      currentPage += 1;
    }
  }
};

const getKnownExchanges = async () => {
  const { balances } = await rpc("accounts_balances", {
    accounts: KNOWN_EXCHANGE_ACCOUNTS,
  });

  return Object.entries(balances).reduce(
    (acc, [account, { balance: rawBalance, pending: rawPending }]) => {
      const balance = rawToAdia(rawBalance);
      const pending = rawToAdia(rawPending);
      const total = new BigNumber(balance).plus(pending).toNumber();

      return {
        ...acc,
        [account]: total,
      };
    },
    {},
  );
};

const getDistribution = async () => {
  // Distribution pattern
  // 0.0000001 - <0.000001
  // 0.000001 - <0.00001
  // 0.00001 - <0.0001
  // 0.0001 - <0.001
  // 0.01 - <0.1
  // 0.1 - <1
  // 1 - <10
  // 10 - <100
  // 100 - <1000
  // 1000 - <10000
  const distribution = Array.from({ length: 10 }, () => ({
    accounts: 0,
    balance: 0,
  }));

  // Funds that have not moved since X
  const dormantFunds = {};

  // Get the known exchange balance so when they are excluded from the distribution their balance matches the distribution buckets
  // eg. if accountA is in bucket C when the script generates the balances but a few days after accountA's balance now matches bucket D
  const knownExchanges = await getKnownExchanges();

  await rmdir(`${TMP_DISTRIBUTION_PATH}`, { recursive: true });
  await mkdir(`${TMP_DISTRIBUTION_PATH}`, { recursive: true });

  await getAccounts();

  const processedAccounts = {};
  const tmpAccountFiles = await readdir(TMP_ACCOUNTS_PATH);

  for (let y = 0; y < tmpAccountFiles.length; y++) {
    const accounts = JSON.parse(
      fs.readFileSync(`${TMP_ACCOUNTS_PATH}/${tmpAccountFiles[y]}`, "utf8"),
    );
    const balancesChunks = chunk(accounts, 5000);

    for (let i = 0; i < balancesChunks.length; i++) {
      let { balances } = await rpc("accounts_balances", {
        accounts: balancesChunks[i],
      });

      console.log(
        `processing balances: ${tmpAccountFiles[y]} - chunk ${i + 1} of ${
          balancesChunks.length
        }`,
      );

      const richList = {};

      await Promise.all(
        Object.entries(balances).map(
          async ([account, { balance: rawBalance, pending: rawPending }]) => {
            const balance = rawToAdia(rawBalance);
            const pending = rawToAdia(rawPending);
            const total = new BigNumber(balance).plus(pending).toNumber();

            if (total < MIN_TOTAL) return;
			if(typeof(processedAccounts[account]) != 'undefined')
				return;
			else
				processedAccounts[account] = true;
            richList[account] = total;

			let index = 0;
			if(total >= 1000)
				index = 9;
			else if(total >= 100)
				index = 8;
			else if(total >= 10)
				index = 7;
			else if(total >= 1)
				index = 6;
			else if(total >= 0.1)
				index = 5;
			else if(total >= 0.001)
				index = 4;
			else if(total >= 0.0001)
				index = 3;
			else if(total >= 0.00001)
				index = 2;
			else if(total >= 0.000001)
				index = 1;
			
			if(typeof(distribution[index]) == 'undefined')
			{
				distribution[index] = {
				  accounts: 0,
				  balance: 0
				};
			}

            // Add the account as part of the Distribution
            distribution[index] = {
              accounts: (distribution[index].accounts += 1),
              balance: new BigNumber(total)
                .plus(distribution[index].balance)
                .toNumber(),
            };
            if (total > MIN_DELEGATOR_TOTAL) {
              const { representative } = await rpc("account_representative", {
                account,
              });

              redisClient.zadd(
                `${DELEGATORS}_TMP:${representative}`,
                total,
                account,
              );
            }

            // Search for the last transaction date to place the accounts
            // balance and pending into the Dormant funds
            const { history } = await rpc("account_history", {
              account,
              count: 5,
              // Using raw allows to include "change" transactions
              raw: true,
            });

            const result = (history || []).find(
              ({ local_timestamp, subtype = "" }) =>
                ["change", "send", "receive"].includes(subtype) &&
                parseInt(local_timestamp || "0"),
            );

            if (!result) return;

            // if (
            //   result.subtype === "change" &&
            //   parseFloat(result.local_timestamp) >=
            //     Math.floor(Date.now() / 1000) - 3600 * 24 * 2 &&
            //   history[1].subtype === "epoch"
            // ) {
            //   [].push({
            //     account,
            //     balance: total,
            //   });
            // }

            const date = new Date(parseFloat(result.local_timestamp) * 1000);

            const year = date.getFullYear();
            const month = date.getMonth();

            if (!dormantFunds[year]) {
              dormantFunds[year] = [];
            }
            dormantFunds[year][month] =
              (dormantFunds[year][month] || 0) + total;
          },
        ),
      );

      fs.writeFileSync(
        `${TMP_DISTRIBUTION_PATH}/${tmpAccountFiles[y]}`,
        JSON.stringify({ distribution, dormantFunds }, null, 2),
      );

      const richListData = Object.entries(richList).flatMap(acc =>
        acc.reverse(),
      );

      redisClient.zadd(`${REDIS_RICH_LIST}_TMP`, ...richListData);

      // @TODO check if can remove the sleep now that the node is a bit more powerful
      await sleep(100);
    }
  }

  return { distribution, dormantFunds, knownExchanges };
};

const doDistributionCron = async () => {
  try {
    const startTime = new Date();
    console.log("Distribution cron started");

    const { distribution, dormantFunds, knownExchanges } =
      await getDistribution();

    fs.writeFileSync(DISTRIBUTION_PATH, JSON.stringify(distribution, null, 2));
    fs.writeFileSync(DORMANT_FUNDS_PATH, JSON.stringify(dormantFunds, null, 2));
    fs.writeFileSync(
      KNOWN_EXCHANGES_PATH,
      JSON.stringify(knownExchanges, null, 2),
    );
    fs.writeFileSync(
      STATUS_PATH,
      JSON.stringify(
        {
          executionTime: (new Date() - startTime) / 1000,
          date: new Date(),
        },
        null,
        2,
      ),
    );

    console.log(
      `Distribution cron finished in ${(new Date() - startTime) / 1000}s`,
    );

    nodeCache.set(DISTRIBUTION, distribution, EXPIRE_1W);
    nodeCache.set(DORMANT_FUNDS, dormantFunds, EXPIRE_1W);
    nodeCache.set(KNOWN_EXCHANGES, knownExchanges, EXPIRE_24H);

    // @NOTE manual add for now
    redisClient.zadd(`${REDIS_RICH_LIST}_TMP`, 16110.510723, BURN_ACCOUNT);
    redisClient.rename(`${REDIS_RICH_LIST}_TMP`, REDIS_RICH_LIST);

    // Replace previously generated delegators by new ones
    redisClient.keys(`${DELEGATORS}:*`, (err, res) => {
      if (err) {
        Sentry.captureException(err);
        return;
      }

      redisClient.del(...res, () => {
        redisClient.keys(`${DELEGATORS}_TMP:*`, (err, res) => {
          if (err) {
            Sentry.captureException(err);
            return;
          }

          res.forEach(key => {
            redisClient.rename(key, key.replace("_TMP", ""));
          });
        });
      });
    });

    // rimraf(TMP_ACCOUNTS_PATH, () => {});
  } catch (err) {
    console.log("Error", err);
    Sentry.captureException(err);
  }
};

// https://crontab.guru/#15_5_*_*_*
// “At 05:15”
cron.schedule("15 5 * * *", async () => {
  if (process.env.NODE_ENV !== "production") return;
  // Disable cron until amounts are sorted out
  doDistributionCron();
});


// if (
//   process.env.NODE_ENV === "production" &&
//   !fs.existsSync(DISTRIBUTION_PATH) &&
//   !fs.existsSync(DORMANT_FUNDS_PATH) &&
//   !fs.existsSync(KNOWN_EXCHANGES_PATH) &&
//   !fs.existsSync(STATUS_PATH)
// ) {
// doDistributionCron();
// }

const getDistributionData = () => {
  let distribution = nodeCache.get(DISTRIBUTION);
  let dormantFunds = nodeCache.get(DORMANT_FUNDS);
  let knownExchanges = nodeCache.get(KNOWN_EXCHANGES);
  let status = nodeCache.get(STATUS);

  if (!distribution) {
    distribution = fs.existsSync(DISTRIBUTION_PATH)
      ? JSON.parse(fs.readFileSync(DISTRIBUTION_PATH, "utf8"))
      : [];
    nodeCache.set(DISTRIBUTION, distribution, EXPIRE_1W);
  }

  if (!dormantFunds) {
    dormantFunds = fs.existsSync(DORMANT_FUNDS_PATH)
      ? JSON.parse(fs.readFileSync(DORMANT_FUNDS_PATH, "utf8"))
      : {};
    nodeCache.set(DORMANT_FUNDS, dormantFunds, EXPIRE_1W);
  }

  if (!knownExchanges) {
    knownExchanges = fs.existsSync(KNOWN_EXCHANGES_PATH)
      ? JSON.parse(fs.readFileSync(KNOWN_EXCHANGES_PATH, "utf8"))
      : {};
    nodeCache.set(KNOWN_EXCHANGES, knownExchanges, EXPIRE_24H);
  }

  if (!status) {
    status = fs.existsSync(STATUS_PATH)
      ? JSON.parse(fs.readFileSync(STATUS_PATH, "utf8"))
      : {};
    nodeCache.set(STATUS, status, EXPIRE_1W);
  }

  return {
    status,
    distribution,
    dormantFunds,
    knownExchanges,
  };
};

module.exports = {
  getDistributionData,
};
