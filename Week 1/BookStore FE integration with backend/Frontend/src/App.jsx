import Header from "./components/Header";
import BooksSection from "./components/Books/BooksSection";
import { useEffect, useState } from "react";

import { fetchAllData } from "./helperFunctions/showFunctions";
import  { Toaster } from "react-hot-toast";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllData(setData);
  }, []);

  return (
    <>
      <div className="m-4">
        <Header setData={setData} />
        <BooksSection booksData={data} />
      </div>

      <Toaster />
    </>
  );
}

export default App;
