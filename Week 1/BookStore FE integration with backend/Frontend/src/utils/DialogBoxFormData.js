const oldName = {
  type: "text",
  label: "Enter Old Book Name",
  name: "oldName",
  required: true,
};
const newName = {
  type: "text",
  label: "Enter New Book Name",
  name: "newName",
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

const id = {
  type: "string",
  label: "Enter Book Id",
  name: "id",
  required: true,
};

const name = {
  type: "text",
  label: "Enter Book Name",
  name: "name",
  required: true,
};

const author = {
  type: "text",
  label: "Enter  Author Name",
  name: "author",
  required: true,
};

const description = {
  type: "text",
  label: "Enter  Description",
  name: "description",
  required: true,
};

const category = {
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

const price = {
  type: "number",
  label: "Enter Book Price",
  name: "price",
  required: true,
};

const releaseYear = {
  type: "number",
  label: "Enter Released Year",
  name: "releaseYear",
  required: true,
};

const formData = [
  {
    id: 1,
    formData: {
      oldName: oldName,
      newName: newName,
    },
  },
  {
    id: 2,
    formData: {
      oldName: oldName,
      newName: newName,
      oldAuthorName: oldAuthorName,
      newAuthorName: newAuthorName,
    },
  },

  {
    id: 3,
    formData: {
      id: id,
    },
  },
  {
    id: 4,
    formData: {
      name: name,
    },
  },
  {
    id: 5,
    formData: {
      description: description,
      author: author,
    },
  },
  {
    id: 6,
    formData: {
      name: name,
      category: category,
    },
  },
  {
    id: 8,
    formData: {
      id: id,
    },
  },
  {
    id: 9,
    formData: {
      name: name,
    },
  },
  {
    id: 10,
    formData: {
      name: name,
      author: author,
    },
  },
  {
    id: 22,
    formData: {
 
      name: name,
      description: description,
      author: author,
      noOfPage: noOfPage,
      category: category,
      price: price,
      releaseYear: releaseYear,
    },
  },
];

export default formData;