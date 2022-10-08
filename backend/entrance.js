module.exports.handler = async (event) => {
  console.log('Event: ', event);
  const responseMessage = 'Hello, World!';

  // naive routing

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: responseMessage
    })
  };
};
