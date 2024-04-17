function logvalueFunction(initialValues, newValues) {
  let changes = "";
  let changeCount = 0;

  for (const key in initialValues) {
    if (initialValues.hasOwnProperty(key) && newValues.hasOwnProperty(key)) {
      if (initialValues[key] !== newValues[key]) {
        if (changeCount > 0) {
          changes += ", ";
        }
        changes += `${key} from ${initialValues[key]} to ${newValues[key]}`;
        changeCount++;
      }
    }
  }
  if (changeCount === 0) {
    return "There is no changes";
  } else if (changeCount === 1) {
    return `There is ${changes}`;
  } else {
    const lastIndex = changes.lastIndexOf(", ");
    return `There are ${changes.slice(0, lastIndex)} and ${changes.slice(
      lastIndex + 2
    )}`;
  }
}

module.exports = logvalueFunction;
