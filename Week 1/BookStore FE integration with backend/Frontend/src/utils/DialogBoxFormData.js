const oldBookName = {
  type: "text",
  label: "Enter Old Book Name",
  name: "oldBookName",
  required: true,
};
const newBookName = {
  type: "text",
  label: "Enter New Book Name",
  name: "newBookName",
  required: true,
};

const oldAuthorName = {
  type: "text",
  label: "Enter Old Author Name",
  name: "oldAuthorName",
  required: true,
};

const newAuthorName = {
  type: "text",
  label: "Enter New Author Name",
  name: "newAuthorName",
  required: true,
};

const bookId = {
  type: "number",
  label: "Enter Book Id",
  name: "bookId",
  required: true,
};

const bookName = {
  type: "text",
  label: "Enter Book Name",
  name: "bookName",
  required: true,
};

const bookAuthor = {
  type: "text",
  label: "Enter  Author Name",
  name: "author",
  required: true,
};

const bookDesc = {
  type: "text",
  label: "Enter  Description",
  name: "desc",
  required: true,
};

const bookCategory = {
  type: "text",
  label: "Enter  Book Category",
  name: "category",
  required: true,
};
const noOfPage = {
  type: "number",
  label: "Enter Number of Pages",
  name: "noOfPage",
  required: true,
};

const bookPrice = {
  type: "number",
  label: "Enter Book Price",
  name: "bookPrice",
  required: true,
};

const releasedYear = {
  type: "number",
  label: "Enter Released Year",
  name: "releasedYear",
  required: true,
};

const formData = [
  {
    id: 1,
    formData: {
      oldBookName: oldBookName,
      newBookName: newBookName,
    },
  },
  {
    id: 2,
    formData: {
      oldBookName: oldBookName,
      newBookName: newBookName,
      oldAuthorName: oldAuthorName,
      newAuthorName: newAuthorName,
    },
  },

  {
    id: 3,
    formData: {
      bookId: bookId,
    },
  },
  {
    id: 4,
    formData: {
      bookName: bookName,
    },
  },
  {
    id: 5,
    formData: {
      bookDesc: bookDesc,
      bookAuthor: bookAuthor,
    },
  },
  {
    id: 6,
    formData: {
      bookName: bookName,
      bookCategory: bookCategory,
    },
  },
  {
    id: 8,
    formData: {
      bookId: bookId,
    },
  },
  {
    id: 9,
    formData: {
      bookName: bookName,
    },
  },
  {
    id: 10,
    formData: {
      bookName: bookName,
      bookAuthor: bookAuthor,
    },
  },
  {
    id: 22,
    formData: {
      bookId: bookId,
      bookName: bookName,
      bookDesc: bookDesc,
      bookAuthor: bookAuthor,
      noOfPage: noOfPage,
      bookCategory: bookCategory,
      bookPrice: bookPrice,
      releasedYear: releasedYear,
    },
  },
];

export default formData;