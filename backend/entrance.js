const router = require('./router');
const middle = require('./middle');

const routes = router.init();
routes.addGet('/students/all', middle.getStudents);
routes.addGet('/students/{id}', middle.getStudent);
routes.addPost('/students', middle.createStudent);
routes.addPut('/students/{id}', middle.updateStudent);
routes.addDelete('/students/{id}', middle.deleteStudent);

routes.addGet('/teachers/all', middle.getTeachers);
routes.addGet('/teachers/{id}', middle.getTeacher);
routes.addPost('/teachers', middle.createTeacher);
routes.addPut('/teachers/{id}', middle.updateTeacher);
routes.addDelete('/teachers/{id}', middle.deleteTeacher);

routes.addGet('/items/all', middle.getItems);
routes.addGet('/items/{id}', middle.getItem);
routes.addPost('/items', middle.createItem);
routes.addPut('/items/{id}', middle.updateItem);
routes.addDelete('/items/{id}', middle.deleteItem);

routes.addGet('/submissions/all', middle.getSubmissions);
routes.addGet('/submissions/{id}', middle.getSubmission);
routes.addPost('/submissions', middle.createSubmission);

routes.setError(() => {});

routes.setNotFound(() => {});

module.exports.handler = async (event) => {
  console.log('Event: ', event);

  let response = {};
  try {
    const payload = await routes.handle(
      event.httpMethod.toLowerCase(),
      event.resource,
      event.pathParameters,
      event.queryStringParameters,
      JSON.parse(event.body)
    );

    response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };
  } catch (err) {
    response = {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: err
      })
    };
  }

  return response;
};
