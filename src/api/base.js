const BASE_URL = 'https://9s1hgfaw08.execute-api.us-east-2.amazonaws.com/serverless_lambda_stage';

export async function baseCall(method, path, body, query) {
  console.log(method);
  console.log(path);
  console.log(body);
  console.log(query);
  const queryString = Object.entries(query).reduce((acc, q) => {
    const newAcc = acc === '' ? `?${q[0]}=${q[1]}` : `${acc},${q[0]}=${q[1]}`;
    return newAcc;
  }, '');

  console.log(queryString);

  const fetchResult = await fetch(`${BASE_URL}${path}${queryString}`, {
    mode: 'cors',
    method,
    body: body ? JSON.stringify(body) : undefined
  });

  // handle error
  if (!fetchResult.ok) {
    // do something wild
  }

  const jsonResponse = await fetchResult.json();
  return jsonResponse;
}

export async function getCall(path, query) {
  return baseCall('get', path, null, query || {});
}

export async function postCall(path, body) {
  return baseCall('post', path, body, {});
}

export async function putCall(path, body) {
  return baseCall('put', path, body, {});
}

export async function deleteCall(path) {
  return baseCall('delete', path, null, {});
}

/*
  API
*/

export async function getStudent(id) {
  return getCall(`/students/${id}`);
}
export async function getStudents() {
  return getCall('/students/all');
}
export async function createStudent(body) {
  return postCall('/students', body);
}
export async function updateStudent(id, body) {
  return putCall(`/students/${id}`, body);
}
export async function deleteStudent(id) {
  return deleteCall(`/students/${id}`);
}

export async function getTeacher(id) {
  return getCall(`/teachers/${id}`);
}
export async function getTeachers() {
  return getCall('/teachers/all');
}
export async function createTeacher(body) {
  return postCall('/teachers', body);
}
export async function updateTeacher(id, body) {
  return putCall(`/teachers/${id}`, body);
}
export async function deleteTeacher(id) {
  return deleteCall(`/teachers/${id}`);
}

export async function getItem(id) {
  return getCall(`/items/${id}`);
}
export async function getItems() {
  return getCall('/items/all');
}
export async function createItem(body) {
  return postCall('/items', body);
}
export async function updateItem(id, body) {
  return putCall(`/items/${id}`, body);
}
export async function deleteItem(id) {
  return deleteCall(`/items/${id}`);
}

export async function getSubmission(id) {
  return getCall(`/submissions/${id}`);
}
export async function getSubmissions() {
  return getCall('/submissions/all');
}
export async function getSubmissionsOnStudent(studentId) {
  return getCall('/submissions/all', { studentId });
}
export async function getSubmissionsOnItem(itemId) {
  return getCall('/submissions/all', { itemId });
}
export async function createSubmission() {
  return postCall('/submissions', {});
}
