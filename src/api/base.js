const BASE_URL = '';

export async function baseCall(method, path, body, query) {
  const queryString = Object.entries(query).reduce((acc, q) => {
    const newAcc = acc === '' ? `?${q[0]}=${q[1]}` : `${acc},${q[0]}=${q[1]}`;
    return newAcc;
  }, '');

  const fetchResult = await fetch({
    mode: 'cors',
    method,
    url: `${BASE_URL}${path}${queryString}`,
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
  return baseCall('get', path, null, query);
}

export async function postCall(path, body) {
  return baseCall('post', path, body, null);
}

export async function putCall(path, body) {
  return baseCall('put', path, body, null);
}

export async function deleteCall(path) {
  return baseCall('delete', path, null, null);
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
export async function createStudent() {
  return postCall('/students', {});
}
export async function updateStudent(id) {
  return putCall(`/students/${id}`, {});
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
export async function createTeacher() {
  return postCall('/teachers', {});
}
export async function updateTeacher(id) {
  return putCall(`/teachers/${id}`);
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
export async function createItem() {
  return postCall('/items', {});
}
export async function updateItem(id) {
  return putCall(`/items/${id}`, {});
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
