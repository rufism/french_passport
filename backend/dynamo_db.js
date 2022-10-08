// eslint-disable-next-line
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const ACCOUNT_TABLE = 'FrenchPassportAccountsTable';
const ITEM_TABLE = 'FrenchPassportItemsTable';
const SUBMISSION_TABLE = 'FrenchPassportSubmissionsTable';

export async function getAccount(id) {
  try {
    const account = await docClient.get({ TableName: ACCOUNT_TABLE, Key: { id } }).promise();
    return account;
  } catch (error) {
    console.error(error);
  }

  return null;
}

export async function getAllAccounts() {
  try {
    const accounts = await docClient.scan({ TableName: ACCOUNT_TABLE }).promise();
    return accounts;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export async function createAccount(id) {
  try {
    await docClient.put({ TableName: ACCOUNT_TABLE, Item: { id } }).promise();
    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export async function updateStudent(id) {
  try {
    await docClient.put({ TableName: ACCOUNT_TABLE, Item: { id } }).promise();
    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export async function deleteStudent(id) {
  try {
    await docClient.delete({ TableName: ACCOUNT_TABLE, Item: { id } }).promise();
    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export async function getItem(id) {
  try {
    const item = await docClient.get({ TableName: ITEM_TABLE, Key: { id } }).promise();
    return item;
  } catch (error) {
    console.error(error);
  }

  return null;
}

export async function getAllItems() {
  try {
    const items = await docClient.scan({ TableName: ITEM_TABLE }).promise();
    return items;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export async function createItem(id) {
  try {
    await docClient.put({ TableName: ITEM_TABLE, Item: { id } }).promise();
    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export async function updateItem(id) {
  try {
    await docClient.put({ TableName: ITEM_TABLE, Item: { id } }).promise();
    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export async function deleteItem(id) {
  try {
    await docClient.delete({ TableName: ITEM_TABLE, Item: { id } }).promise();
    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export async function getSubmission(id) {
  try {
    const submission = await docClient.get({ TableName: SUBMISSION_TABLE, Key: { id } }).promise();
    return submission;
  } catch (error) {
    console.error(error);
  }

  return null;
}

export async function getAllSubmissions() {
  try {
    const submissions = await docClient.scan({ TableName: SUBMISSION_TABLE }).promise();
    return submissions;
  } catch (error) {
    console.error(error);
  }

  return [];
}

// export async function getSubmissionsOnStudent(studentId) {
//   try {
//     const submissions = await docClient.scan({ TableName: SUBMISSION_TABLE }).promise();
//     return submissions;
//   } catch (error) {
//     console.error(error);
//   }

//   return [];
// }
// export async function getSubmissionsOnItem(itemId) {
//   try {
//     const submissions = await docClient.scan({ TableName: SUBMISSION_TABLE }).promise();
//     return submissions;
//   } catch (error) {
//     console.error(error);
//   }

//   return [];
// }

export async function createSubmission(id) {
  try {
    await docClient.put({ TableName: SUBMISSION_TABLE, Item: { id } }).promise();
    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}
