import { faker } from "@faker-js/faker";
import RandExp from "randexp";

const generateData = () => {
  const display_nameRegex = new RandExp(/^[a-zA-Z_][a-zA-Z0-9_]{0,49}$/);
  const passwordRegex = new RandExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );

  const email = faker.internet.email();
  const display_name = display_nameRegex.gen();
  const password = passwordRegex.gen();
  const confirm_password = password;
  return {
    email: email,
    display_name: display_name,
    password: password,
    confirm_password: confirm_password,
  };
};

export default generateData;
