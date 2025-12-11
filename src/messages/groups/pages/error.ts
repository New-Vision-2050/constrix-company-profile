import { _m, MessagesGroup } from "../../types";

export const errorPageMessages = new MessagesGroup({
    title: _m("Unexpected Application Error!", "خطأ غير متوقع"),
    message: _m("An unexpected error occurred. Please try again later.", "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقا."),
    buttonText: _m("Go to home", "الرجوع للصفحة الرئيسية"),
});
