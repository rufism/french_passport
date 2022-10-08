import * as dydb from './dynamo_db';

/*

  Students

*/
export async function getStudent(id) {
  return dydb.getAccount(id);
}
export async function getStudents() {
  return dydb.getAllAccounts();
}
export async function createStudent() {
  // validation

  // conversion

  return dydb.createAccount();

  // conversion
}
export async function updateStudent(id) {
  return dydb.updateAccount(id);
}
export async function deleteStudent(id) {
  return dydb.deleteAccount(id);
}

/*

  Teachers

*/
export async function getTeacher(id) {
  return dydb.getAccount(id);
}
export async function getTeachers() {
  return dydb.getAllAccounts();
}
export async function createTeacher(id) {
  return dydb.createAccount(id);
}
export async function updateTeacher(id) {
  return dydb.updateAccount(id);
}
export async function deleteTeacher(id) {
  return dydb.deleteAccount(id);
}

/*

  Items

*/
export async function getItem(id) {
  return dydb.getItem(id);
}
export async function getItems() {
  return dydb.getAllItems();
}
export async function createItem(id) {
  return dydb.createItem(id);
}
export async function updateItem(id) {
  return dydb.updateItem(id);
}
export async function deleteItem(id) {
  return dydb.deleteItem(id);
}

/*

  Submissions

*/
export async function getSubmission(id) {
  return dydb.getSubmission(id);
}
export async function getSubmissions() {
  return dydb.getAllSubmissions();
}
// export async function getSubmissionsOnStudent(studentId) {
//   return dydb.getAllSubmissions(id);
// }
// export async function getSubmissionsOnItem(itemId) {
//   return dydb.getAllSubmissions(id);
// }
export async function createSubmission(id) {
  return dydb.createSubmission(id);
}
