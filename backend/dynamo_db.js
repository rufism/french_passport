// eslint-disable-next-line
const AWS = require('aws-sdk');

const cognitoClient = new AWS.CognitoIdentityServiceProvider();

const docClient = new AWS.DynamoDB.DocumentClient();

const COGNITO_USER_POOL_ID = 'french_passport_user_pool';
const COGNITO_TEACHER_GROUP = 'techers';
const COGNITO_STUDENT_GROUP = 'students';
const ACCOUNT_TABLE = 'FrenchPassportAccountsTable';
const GROUP_TABLE = 'FrenchPassportGroupsTable';
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

  // cognito - create account
  try {
    const cognitoRes = await cognitoClient
      .adminCreateUser({ UserPoolId: COGNITO_USER_POOL_ID, Username: args.username })
      .promise();
    console.log(cognitoRes);
  } catch (error) {
    console.log(error);
  }

  // cognito - add to group
  try {
    const cognitoGroupRes = await cognitoClient
      .adminAddUserToGroup({
        GroupName: args.role === 'teacher' ? COGNITO_TEACHER_GROUP : COGNITO_STUDENT_GROUP,
        UserPoolId: COGNITO_USER_POOL_ID,
        Username: ''
      })
      .promise();
    console.log(cognitoGroupRes);
  } catch (error) {
    console.log(error);
  }

  // dynamodb
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

async function getGroup(args) {
  // log
  console.log(`[DB] get group ${JSON.stringify(args)}`);

  try {
    const group = await docClient.get({ TableName: GROUP_TABLE, Key: { id: args.id } }).promise();
    return group.Item;
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function getAllGroups(args) {
  // log
  console.log(`[DB] get all groups ${JSON.stringify(args)}`);

  try {
    const groups = await docClient.scan({ TableName: GROUP_TABLE }).promise();
    return groups.Items;
  } catch (error) {
    console.log(error);
  }

  return [];
}

async function createGroup(args) {
  // log
  console.log(`[DB] create group ${JSON.stringify(args)}`);

  try {
    await docClient.put({ TableName: GROUP_TABLE, Item: args }).promise();
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

async function updateGroup(args) {
  // log
  console.log(`[DB] update group ${JSON.stringify(args)}`);

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
        TableName: GROUP_TABLE,
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
  getGroup,
  getAllGroups,
  createGroup,
  updateGroup,
  getItem,
  getAllItems,
  createItem,
  updateItem,
  getSubmission,
  getAllSubmissions,
  createSubmission
};
