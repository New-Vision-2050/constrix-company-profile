import { MessagesGroup } from "../../types";
import { formsMessages } from "./forms";
import { validationMessages } from "./validation";

export const authMessages = new MessagesGroup({
  forms: formsMessages,
  validation: validationMessages,
});
