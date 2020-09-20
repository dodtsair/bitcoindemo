/* Amplify Params - DO NOT EDIT
	API_BITCOINWATCH_GRAPHQLAPIENDPOINTOUTPUT
	API_BITCOINWATCH_GRAPHQLAPIIDOUTPUT
	API_BITCOINWATCH_GRAPHQLAPIKEYOUTPUT
	API_BITCOINWATCH_WATCHTABLE_ARN
	API_BITCOINWATCH_WATCHTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const balance = require('crypto-balances');
const {print} = graphql;

const listWatches = gql`
    query ListWatchs(
        $filter: ModelWatchFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listWatchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                name
                bitcoinaddress
            }
            nextToken
        }
    }
`
exports.handler = async (event) => {
    const graphqlData = await axios({
        url: process.env.API_BITCOINWATCH_GRAPHQLAPIENDPOINTOUTPUT,
        method: 'post',
        headers: {
            'x-api-key': process.env.API_BITCOINWATCH_GRAPHQLAPIKEYOUTPUT
        },
        data: {
            query: print(listWatches),
        }
    });
    const balances = graphqlData.data.data.listWatchs.items.reduce((prior, watch) => {
        const previous = prior.length > 0 && prior[prior.length - 1] || Promise.resolve();
        prior.push(previous.then(() => {
            const watchBalance = new Promise((resolve, reject) => {
                balance(watch.bitcoinaddress, (error, result) => {
                    if (error) reject(error);
                    const bitcoinBalance = result && result.find(aBalance => aBalance.asset === 'BTC')
                    if (!bitcoinBalance) {
                        resolve({
                            name: watch.name,
                            bitcoinaddress: watch.bitcoinaddress,
                            balance: null
                        })
                    } else {
                        resolve({
                            name: watch.name,
                            bitcoinaddress: watch.bitcoinaddress,
                            balance: bitcoinBalance.quantity
                        })
                    }

                })
            })
            return watchBalance;

        }));
        return prior;
    }, [])
    return Promise.all(balances)
}

// require('make-runnable/custom')({
//     printOutputFrame: false
// })