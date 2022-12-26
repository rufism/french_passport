const crypto = require('crypto');
const dydb = require('./dynamo_db');

/*

  Students

*/
async function getStudent(args) {
  // log
  console.log(`get student ${JSON.stringify(args)}`);

  // validation

  // conversion
  const pass = {
    id: args.pathParams.id
  };

  // call
  const res = await dydb.getAccount(pass);

  // return
  return {
    id: res.id,
    firstName: res.firstName,
    lastName: res.lastName,
    completed: res.completed,
    createdAt: res.createdAt,
    createdBy: res.createdBy,
    updatedAt: res.updatedAt,
    updatedBy: res.updatedBy
  };
}

async function getStudents(args) {
  // log
  console.log(`get all students ${JSON.stringify(args)}`);

  // validate

  // conversion
  const pass = {};

  // call
  const res = await dydb.getAllAccounts(pass);

  // return
  return {
    students: res
      .filter((student) => student.role === 'student')
      .map((student) => ({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        completed: student.completed,
        createdAt: student.createdAt,
        createdBy: student.createdBy,
        updatedAt: student.updatedAt,
        updatedBy: student.updatedBy
      }))
  };
}

async function createStudent(args) {
  // log
  console.log(`create student ${JSON.stringify(args)}`);

  // validation

  // conversion
  const id = crypto.randomUUID();
  const timestamp = Date.now();
  const pass = {
    id,
    role: 'student',
    firstName: args.body.firstName,
    lastName: args.body.lastName,
    completed: [],
    createdAt: timestamp,
    createdBy: '',
    updatedAt: timestamp,
    updatedBy: '',
    deleted: false
  };

  console.log(`passed params ${JSON.stringify(pass)}`);

  await dydb.createAccount(pass);

  // conversion
  return { message: 'successfully created student' };
}

async function updateStudent(args) {
  // log
  console.log(`update student ${JSON.stringify(args)}`);

  // validation

  // conversion
  const timestamp = Date.now();
  const pass = {
    id: args.pathParams.id,
    updatedAt: timestamp,
    updatedBy: ''
  };

  if (args.body.firstName) pass.firstName = args.body.firstName;
  if (args.body.lastName) pass.lastName = args.body.lastName;

  // call
  await dydb.updateAccount(pass);

  // return
  return { message: 'successfully updated student' };
}

async function deleteStudent(args) {
  // log
  console.log(`delete student ${JSON.stringify(args)}`);

  // validation

  // conversion
  const timestamp = Date.now();
  const pass = {
    id: args.pathParams.id,
    updatedAt: timestamp,
    updatedBy: '',
    deleted: true
  };

  // call
  await dydb.updateAccount(pass);

  // return
  return { message: 'successfully deleted student' };
}

/*

  Teachers

*/
async function getTeacher(args) {
  // log
  console.log(`get teacher ${JSON.stringify(args)}`);

  // validation

  // conversion
  const pass = {
    id: args.pathParams.id
  };

  // call
  const res = await dydb.getAccount(pass);

  // return
  return {
    id: res.id,
    firstName: res.firstName,
    lastName: res.lastName,
    completed: res.completed,
    createdAt: res.createdAt,
    createdBy: res.createdBy,
    updatedAt: res.updatedAt,
    updatedBy: res.updatedBy
  };
}

async function getTeachers(args) {
  // log
  console.log(`get all teachers ${JSON.stringify(args)}`);

  // validate

  // conversion
  const pass = {};

  // call
  const res = await dydb.getAllAccounts(pass);

  // return
  return {
    teachers: res
      .filter((student) => student.role === 'teacher')
      .map((student) => ({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        completed: student.completed,
        createdAt: student.createdAt,
        createdBy: student.createdBy,
        updatedAt: student.updatedAt,
        updatedBy: student.updatedBy
      }))
  };
}

async function createTeacher(args) {
  // log
  console.log(`create teacher ${JSON.stringify(args)}`);

  // validation

  // conversion
  const id = crypto.randomUUID();
  const timestamp = Date.now();
  const pass = {
    id,
    role: 'teacher',
    firstName: args.body.firstName,
    lastName: args.body.lastName,
    completed: [],
    createdAt: timestamp,
    createdBy: '',
    updatedAt: timestamp,
    updatedBy: '',
    deleted: false
  };

  console.log(`passed params ${JSON.stringify(pass)}`);

  await dydb.createAccount(pass);

  // conversion
  return { message: 'successfully created teacher' };
}

async function updateTeacher(args) {
  // log
  console.log(`update teacher ${JSON.stringify(args)}`);

  // validation

  // conversion
  const timestamp = Date.now();
  const pass = {
    id: args.pathParams.id,
    updatedAt: timestamp,
    updatedBy: ''
  };

  if (args.body.firstName) pass.firstName = args.body.firstName;
  if (args.body.lastName) pass.lastName = args.body.lastName;

  // call
  await dydb.updateAccount(pass);

  // return
  return { message: 'successfully updated teacher' };
}

async function deleteTeacher(args) {
  // log
  console.log(`delete teacher ${JSON.stringify(args)}`);

  // validation

  // conversion
  const timestamp = Date.now();
  const pass = {
    id: args.pathParams.id,
    updatedAt: timestamp,
    updatedBy: '',
    deleted: true
  };

  // call
  await dydb.updateAccount(pass);

  // return
  return { message: 'successfully deleted teacher' };
}

/*

  Groups

*/
async function getGroup(args) {
  // log
  console.log(`get group ${JSON.stringify(args)}`);

  // validation

  // conversion
  const pass = {
    id: args.pathParams.id
  };

  // call
  const res = await dydb.getGroup(pass);

  // return
  return {
    id: res.id,
    title: res.title,
    createdAt: res.createdAt,
    createdBy: res.createdBy,
    updatedAt: res.updatedAt,
    updatedBy: res.updatedBy
  };
}

async function getGroups(args) {
  // log
  console.log(`get all groups ${JSON.stringify(args)}`);

  // validate

  // conversion
  const pass = {};

  // call
  const res = await dydb.getAllGroups(pass);

  // return
  return {
    groups: res.map((group) => ({
      id: group.id,
      title: group.title,
      createdAt: group.createdAt,
      createdBy: group.createdBy,
      updatedAt: group.updatedAt,
      updatedBy: group.updatedBy
    }))
  };
}

async function createGroup(args) {
  // log
  console.log(`create group ${JSON.stringify(args)}`);

  // validation

  // conversion
  const id = crypto.randomUUID();
  const timestamp = Date.now();
  const pass = {
    id,
    title: args.body.title,
    createdAt: timestamp,
    createdBy: '',
    updatedAt: timestamp,
    updatedBy: '',
    deleted: false
  };

  console.log(`passed params ${JSON.stringify(pass)}`);

  await dydb.createGroup(pass);

  // conversion
  return { message: 'successfully created item' };
}

async function updateGroup(args) {
  // log
  console.log(`update group ${JSON.stringify(args)}`);

  // validation

  // conversion
  const timestamp = Date.now();
  const pass = {
    id: args.pathParams.id,
    updatedAt: timestamp,
    updatedBy: ''
  };

  if (args.body.title) pass.title = args.body.title;

  // call
  await dydb.updateGroup(pass);

  // return
  return { message: 'successfully updated group' };
}

async function deleteGroup(args) {
  // log
  console.log(`delete group ${JSON.stringify(args)}`);

  // validation

  // conversion
  const timestamp = Date.now();
  const pass = {
    id: args.pathParams.id,
    updatedAt: timestamp,
    updatedBy: '',
    deleted: true
  };

  // call
  await dydb.updateGroup(pass);

  // return
  return { message: 'successfully deleted group' };
}

/*

  Items

*/
async function getItem(args) {
  // log
  console.log(`get item ${JSON.stringify(args)}`);

  // validation

  // conversion
  const pass = {
    id: args.pathParams.id
  };

  // call
  const res = await dydb.getItem(pass);

  // return
  return {
    id: res.id,
    title: res.title,
    desc: res.desc,
    icon: res.icon,
    submissionType: res.submissionType,
    submissionMessage: res.submissionMessage,
    groupId: res.groupId,
    createdAt: res.createdAt,
    createdBy: res.createdBy,
    updatedAt: res.updatedAt,
    updatedBy: res.updatedBy
  };
}

async function getItems(args) {
  // log
  console.log(`get all items ${JSON.stringify(args)}`);

  // validate

  // conversion
  const pass = {};

  // call
  const res = await dydb.getAllItems(pass);

  // return
  return {
    items: res.map((item) => ({
      id: item.id,
      title: item.title,
      desc: item.desc,
      icon: item.icon,
      submissionType: item.submissionType,
      submissionMessage: item.submissionMessage,
      groupId: item.groupId,
      createdAt: item.createdAt,
      createdBy: item.createdBy,
      updatedAt: item.updatedAt,
      updatedBy: item.updatedBy
    }))
  };
}

async function createItem(args) {
  // log
  console.log(`create item ${JSON.stringify(args)}`);

  // validation

  // conversion
  const id = crypto.randomUUID();
  const timestamp = Date.now();
  const pass = {
    id,
    title: args.body.title,
    desc: args.body.desc,
    icon: args.body.icon,
    submissionType: args.body.submissionType,
    submissionMessage: args.body.submissionMessage,
    groupId: args.body.groupId,
    createdAt: timestamp,
    createdBy: '',
    updatedAt: timestamp,
    updatedBy: '',
    deleted: false
  };

  console.log(`passed params ${JSON.stringify(pass)}`);

  await dydb.createItem(pass);

  // conversion
  return { message: 'successfully created item' };
}

async function updateItem(args) {
  // log
  console.log(`update item ${JSON.stringify(args)}`);

  // validation

  // conversion
  const timestamp = Date.now();
  const pass = {
    id: args.pathParams.id,
    updatedAt: timestamp,
    updatedBy: ''
  };

  if (args.body.title) pass.title = args.body.title;
  if (args.body.desc) pass.desc = args.body.desc;
  if (args.body.icon) pass.icon = args.body.icon;
  if (args.body.submissionType) pass.submissionType = args.body.submissionType;
  if (args.body.submissionMessage) pass.submissionMessage = args.body.submissionMessage;
  if (args.body.groupId) pass.groupId = args.body.groupId;

  // call
  await dydb.updateItem(pass);

  // return
  return { message: 'successfully updated item' };
}

async function deleteItem(args) {
  // log
  console.log(`delete item ${JSON.stringify(args)}`);

  // validation

  // conversion
  const timestamp = Date.now();
  const pass = {
    id: args.pathParams.id,
    updatedAt: timestamp,
    updatedBy: '',
    deleted: true
  };

  // call
  await dydb.updateItem(pass);

  // return
  return { message: 'successfully deleted item' };
}

/*

  Submissions

*/
async function getSubmission(args) {
  // log
  console.log(`get submission ${JSON.stringify(args)}`);

  // validation

  // conversion
  const pass = {
    id: args.pathParams.id
  };

  // call
  const res = await dydb.getSubmission(pass);

  // return
  return {
    id: res.id,
    accountId: res.accoundId,
    itemId: res.itemId,
    createdAt: res.createdAt,
    createdBy: res.createdBy,
    updatedAt: res.updatedAt,
    updatedBy: res.updatedBy
  };
}

async function getSubmissions(args) {
  // log
  console.log(`get all submissions ${JSON.stringify(args)}`);

  // validate

  // conversion
  const pass = {};

  // call
  const res = await dydb.getAllSubmissions(pass);

  // return
  return {
    submissions: res.map((sub) => ({
      id: sub.id,
      accountId: sub.accountId,
      itemId: sub.itemId,
      createdAt: sub.createdAt,
      createdBy: sub.createdBy,
      updatedAt: sub.updatedAt,
      updatedBy: sub.updatedBy
    }))
  };
}

async function createSubmission(args) {
  // log
  console.log(`create submission ${JSON.stringify(args)}`);

  // validation

  // conversion
  const id = crypto.randomUUID();
  const timestamp = Date.now();
  const pass = {
    id,
    accountId: args.body.accountId,
    itemId: args.body.itemId,
    createdAt: timestamp,
    createdBy: '',
    updatedAt: timestamp,
    updatedBy: '',
    deleted: false
  };

  console.log(`passed params ${JSON.stringify(pass)}`);

  await dydb.createSubmission(pass);

  // conversion
  return { message: 'successfully created submission' };
}

module.exports = {
  getStudent,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getTeacher,
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getGroup,
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getSubmission,
  getSubmissions,
  createSubmission
};
