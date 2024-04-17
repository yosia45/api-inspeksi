function successResponseFunction(status, message = null, data = null) {
  if (message === null) {
    return {
      status: status,
      data: data,
    };
  } else if (data === null) {
    return {
      status: status,
      message: message,
    };
  } else {
    return {
      status: status,
      message: message,
      data: data
    }
  }
}
module.exports = successResponseFunction;
