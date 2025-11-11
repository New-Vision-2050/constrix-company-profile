import { _m, MessagesGroup } from "../../types";

export const productsMessages = new MessagesGroup({
  title: _m("Products", "المنتجات"),
  addProduct: _m("Add Product", "إضافة منتج"),
  searchPlaceholder: _m("Search products...", "البحث في المنتجات..."),
});

export const blogsMessages = new MessagesGroup({
  pluralTitle: _m("Blogs", "المدونات"),
});

export const formMessages = new MessagesGroup({
  uploadImage: _m("Upload Image", "رفع صورة"),
  chooseFile: _m("Choose File", "اختر ملف"),
  supportedFormats: _m(
    "Supported formats: {formats}",
    "الصيغ المدعومة: {formats}"
  ),
  maxSize: _m("Maximum size: {size}MB", "أقصى حجم: {size}MB"),
});

export const homePageMessages = new MessagesGroup({
  title: _m("Hello world!", "مرحبا يا عالم!"),
});
