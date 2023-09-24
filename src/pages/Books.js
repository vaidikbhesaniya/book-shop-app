import React, { useEffect, useState } from "react";
import axios from "axios";
const Books = () => {
  const [books, setbooks] = useState([]);

  useEffect(() => {
    const fatchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/books");
        setbooks(res.data);
        // console.log(books);
      } catch (err) {
        console.log(err);
      }
    };
    fatchBooks();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="w-[100vw] h-[10vh] flex justify-center items-center text-[#ffffff] bg-[#202020] fixed z-20 mb-[100px]">
        <h1>Vaidik's Book store</h1>
      </div>

      <div className="mt-[15vh] w-[100vw] h-[100%] grid grid-cols-3">
        {books.map((book) => (
          <div className="book p-6 m-4 w-[250px] h-[370px] bg-[#eae8e8] transition-all ease-in duration-100 rounded-2xl hover:shadow-lg hover:shadow-black">
            {" "}
            <img src={book.cover} className="w-[100%] h-[80%]" alt="" />
            <h2>{book.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
