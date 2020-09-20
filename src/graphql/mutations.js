/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNewWatch = /* GraphQL */ `
  mutation CreateNewWatch($name: String!, $bitcoinaddress: String!) {
    createNewWatch(name: $name, bitcoinaddress: $bitcoinaddress)
  }
`;
export const createWatch = /* GraphQL */ `
  mutation CreateWatch(
    $input: CreateWatchInput!
    $condition: ModelWatchConditionInput
  ) {
    createWatch(input: $input, condition: $condition) {
      id
      name
      bitcoinaddress
      createdAt
      updatedAt
    }
  }
`;
export const updateWatch = /* GraphQL */ `
  mutation UpdateWatch(
    $input: UpdateWatchInput!
    $condition: ModelWatchConditionInput
  ) {
    updateWatch(input: $input, condition: $condition) {
      id
      name
      bitcoinaddress
      createdAt
      updatedAt
    }
  }
`;
export const deleteWatch = /* GraphQL */ `
  mutation DeleteWatch(
    $input: DeleteWatchInput!
    $condition: ModelWatchConditionInput
  ) {
    deleteWatch(input: $input, condition: $condition) {
      id
      name
      bitcoinaddress
      createdAt
      updatedAt
    }
  }
`;
