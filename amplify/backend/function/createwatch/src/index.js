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
const { print } = graphql;


exports.handler = async (event) => {
        const createWatch = gql`
            mutation CreateWatch(
                $input: CreateWatchInput!
            ) {
                createWatch(input: $input) {
                    id
                }
            }        
        `
        const name = event.arguments.name
        const bitcoinaddress = event.arguments.bitcoinaddress;
        const graphqlData = await axios({
            url: process.env.API_BITCOINWATCH_GRAPHQLAPIENDPOINTOUTPUT,
            method: 'post',
            headers: {
                'x-api-key': process.env.API_BITCOINWATCH_GRAPHQLAPIKEYOUTPUT
            },
            data: {
                query: print(createWatch),
                variables: {
                    input: {
                        name,
                        bitcoinaddress
                    }
                }
            }
        });
        return {
            id: graphqlData.data.data.createWatch.id
        }
}
