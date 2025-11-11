import { MessagesGroup } from "../../../types";
import { loginMessages } from "./login";
import { registerMessages } from "./register";
import { forgotPasswordMessages } from "./forgot-password";
import { resetPasswordMessages } from "./reset-password";

export const formsMessages = new MessagesGroup({
  login: loginMessages,
  register: registerMessages,
  forgotPassword: forgotPasswordMessages,
  resetPassword: resetPasswordMessages,
});
