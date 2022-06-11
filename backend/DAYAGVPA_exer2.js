const validatePassword = (input1, input2) => {
  if (input1.length !== input2.length) {
    return false;
  }else if (input1.length < 8) {
    return false;
  }

  let containsNumber = false;
  let containsUpperCase = false;
  let containsLowerCase = false;

  for (let i = 0; i < input1.length; i++) {
    if (input1[i] !== input2[i]) {
      return false;
    }else if (parseInt(input1[i])) {
      containsNumber = true;
    } else if (input1[i] === input1[i].toUpperCase()) {
      containsUpperCase = true;
    } else if (input1[i] === input1[i].toLowerCase()) {
      containsLowerCase = true;
    }
  }

  if (containsNumber && containsUpperCase && containsLowerCase) {
    return true;
  }
  return false;
};

const validateUser = (user) => {
  const keys = ["firstName", "lastName", "email", "age"];
  for (let i = 0; i < keys.length; i++) {
    if (typeof user[keys[i]] === "undefined" || user[keys[i]] === "") {
      return false;
    } else if (keys[i] === "age") {
      if (typeof user["age"] !== "number") {
        return false;
      } else if (user["age"] < 18) {
        return false;
      }
    }
  }
  return true;
};

export { validateUser }