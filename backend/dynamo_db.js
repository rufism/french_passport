// eslint-disable-next-line
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const ACCOUNT_TABLE = 'FrenchPassportAccountsTable';
const ITEM_TABLE = 'FrenchPassportItemsTable';
const SUBMISSION_TABLE = 'FrenchPassportSubmissionsTable';

async function getAccount(args) {
  // log
  console.log(`[DB] get account ${JSON.stringify(args)}`);

  try {
    const account = await docClient
      .get({ TableName: ACCOUNT_TABLE, Key: { id: args.id } })
      .promise();
    return account.Item;
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function getAllAccounts(args) {
  // log
  console.log(`[DB] get all accounts ${JSON.stringify(args)}`);

  try {
    const accounts = await docClient.scan({ TableName: ACCOUNT_TABLE }).promise();
    // console.log(accounts);
    return accounts.Items;
  } catch (error) {
    console.log(error);
  }

  return [];
}

async function createAccount(args) {
  // log
  console.log(`[DB] create account ${JSON.stringify(args)}`);

  try {
    const res = await docClient.put({ TableName: ACCOUNT_TABLE, Item: args }).promise();
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

async function updateAccount(args) {
  // log
  console.log(`[DB] update account ${JSON.stringify(args)}`);

  const updates = { ...args };
  delete updates.id; // everything except the id

  const updateExpression = [];
  const expressionAttributeValues = {};

  for (const [key, value] of Object.entries(updates)) {
    updateExpression.push(`${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = value;
  }

  try {
    const res = await docClient
      .update({
        TableName: ACCOUNT_TABLE,
        Key: { id: args.id },
        UpdateExpression: `set ${updateExpression.join(', ')}`,
        ExpressionAttributeValues: expressionAttributeValues
      })
      .promise();
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

async function getItem(args) {
  // log
  console.log(`[DB] get item ${JSON.stringify(args)}`);

  try {
    const item = await docClient.get({ TableName: ITEM_TABLE, Key: { id: args.id } }).promise();
    return item.Item;
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function getAllItems(args) {
  // log
  console.log(`[DB] get all items ${JSON.stringify(args)}`);

  try {
    const items = await docClient.scan({ TableName: ITEM_TABLE }).promise();
    return items.Items;
  } catch (error) {
    console.log(error);
  }

  return [];
}

async function createItem(args) {
  // log
  console.log(`[DB] create item ${JSON.stringify(args)}`);

  try {
    await docClient.put({ TableName: ITEM_TABLE, Item: args }).promise();
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

async function updateItem(args) {
  // log
  console.log(`[DB] update item ${JSON.stringify(args)}`);

  const updates = { ...args };
  delete updates.id; // everything except the id

  const updateExpression = [];
  const expressionAttributeValues = {};

  for (const [key, value] of Object.entries(updates)) {
    updateExpression.push(`${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = value;
  }

  try {
    const res = await docClient
      .update({
        TableName: ITEM_TABLE,
        Key: { id: args.id },
        UpdateExpression: `set ${updateExpression.join(', ')}`,
        ExpressionAttributeValues: expressionAttributeValues
      })
      .promise();
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

async function getSubmission(args) {
  // log
  console.log(`[DB] get submission ${JSON.stringify(args)}`);

  try {
    const submission = await docClient
      .get({ TableName: SUBMISSION_TABLE, Key: { id: args.id } })
      .promise();
    return submission.Item;
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function getAllSubmissions(args) {
  // log
  console.log(`[DB] get all submissions ${JSON.stringify(args)}`);

  try {
    const submissions = await docClient.scan({ TableName: SUBMISSION_TABLE }).promise();
    return submissions.Items;
  } catch (error) {
    console.log(error);
  }

  return [];
}

async function createSubmission(args) {
  // log
  console.log(`[DB] create submission ${JSON.stringify(args)}`);

  try {
    await docClient.put({ TableName: SUBMISSION_TABLE, Item: args }).promise();
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

module.exports = {
  getAccount,
  getAllAccounts,
  createAccount,
  updateAccount,
  getItem,
  getAllItems,
  createItem,
  updateItem,
  getSubmission,
  getAllSubmissions,
  createSubmission
};
