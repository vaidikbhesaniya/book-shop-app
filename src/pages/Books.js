import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Suspense } from "react";
const Books = () => {
  const navigate = useNavigate();
  const [books, setbooks] = useState([]);
  const [open, setopen] = useState(false);
  const [index, setindex] = useState(0);
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

  const handledelet = async (id) => {
    try {
      await axios.delete("http://localhost:8080/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleopen = (index) => {
    setopen(() => true);
    setindex(index);
  };
  return (
    <div className="flex flex-col">
      {open ? (
        <div
          className="fixed w-[100vw] h-[100vh] bg-[#3e3e3e6e] flex items-center justify-center"
          onClick={() => setopen(() => false)}
        >
          {" "}
          <div className="flex justify-center  p-4 m-2 w-[50vw] h-[50vh]  bg-[#ffffff] rounded-md">
            {" "}
            <img src={books[index].cover} alt="" />
            <h1 className="p-4">{books[index].desc1}</h1>
          </div>
        </div>
      ) : null}
      <div className="w-[100vw] h-[10vh] flex  items-center text-[#ffffff] bg-[#202020] fixed z-20 mb-[100px]">
        <div className="w-[80%] flex justify-center items-center">
          {" "}
          <h1>Vaidik's Book store</h1>
        </div>
        <div className="w-[20%] flex justify-center items-center">
          <button
            type="button"
            className=" bg-[blue] text-[white] m-2 p-1 rounded-xl"
            onClick={() => navigate("/add")}
          >
            Add new book
          </button>
        </div>
      </div>

      <div className="mt-[15vh] w-[100vw] h-[100%] grid grid-cols-4">
        {books.map((book, i) => (
          <Suspense fallback={<h1>Loading</h1>}>
            <div
              key={book.id}
              className="book p-6 m-4 w-[250px] h-[430px] bg-[#eae8e8] transition-all ease-in duration-100 rounded-2xl hover:shadow hover:shadow-[#202020]"
            >
              {" "}
              <img
                src={book.cover}
                className="w-[100%] h-[70%]"
                onClick={() => handleopen(i)}
                alt=""
              />
              <h2 className="font-sans">{book.title}</h2>
              <h2>&#x20B9;{book.price}</h2>
              <div className="flex justify-around ">
                <button
                  className="bg-[red]  p-1 text-[white] rounded-xl"
                  onClick={() => handledelet(book.id)}
                >
                  Delete
                </button>
                <button className="bg-[green] p-1 text-[white] rounded-xl">
                  <Link to={`/update/${book.id}`}> Update</Link>
                </button>
              </div>
            </div>
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default Books;
