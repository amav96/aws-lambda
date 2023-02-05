module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "testeando serveles",
        input: event,
      },
      null,
      2
    ),
  };
};
