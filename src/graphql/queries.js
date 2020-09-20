/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWatchList = /* GraphQL */ `
  query GetWatchList {
    getWatchList {
      name
      bitcoinaddress
      balance
    }
  }
`;
export const getWatch = /* GraphQL */ `
  query GetWatch($id: ID!) {
    getWatch(id: $id) {
      id
      name
      bitcoinaddress
      createdAt
      updatedAt
    }
  }
`;
export const listWatchs = /* GraphQL */ `
  query ListWatchs(
    $filter: ModelWatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWatchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        bitcoinaddress
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
