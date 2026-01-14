type UserRegistrationProps = {
  type: "email" | "text" | "password";
  inputType: "select" | "input";
  options?: {
    value: string;
    label: string;
    id: string;
  }[];
  label?: string;
  placeholder: string;
  name: string;
};

export const USER_REGISTRATION_FORM: UserRegistrationProps[] = [
  {
    inputType: "input",
    placeholder: "Enter your first name",
    name: "firstName",
    type: "text",
    label: "First name",
  },
  {
    inputType: "input",
    placeholder: "Enter your last name",
    name: "lastName",
    type: "text",
    label: "Last name",
  },
  {
    inputType: "input",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    inputType: "input",
    placeholder: "Enter your confirm email",
    name: "confirmEmail",
    type: "email",
    label: "Confirm email",
  },
  {
    inputType: "input",
    placeholder: "Enter your password",
    name: "password",
    type: "password",
    label: "Password",
  },
  {
    inputType: "input",
    placeholder: "Enter your confirm password",
    name: "confirmPassword",
    type: "password",
    label: "Confirm password",
  },
];

export const USER_LOGIN_FORM: UserRegistrationProps[] = [
  {
    inputType: "input",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
    // label: "Email",
  },
  {
    inputType: "input",
    placeholder: "Enter your password",
    name: "password",
    type: "password",
    // label: "Password",
  },
];
