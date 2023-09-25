import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc1: "",

    cover: "",
    price: null,
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(book);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form flex justify-center items-center flex-col w-[100vw] h-[100vh] bg-[#202020] p-10">
      <div className="flex flex-col w-[50%] h-[100%] bg-[#dedede] rounded-xl overflow-auto">
        <h1 className="text-center text-[white] ">Add New Book</h1>
        <input
          type="text"
          placeholder="Book title"
          name="title"
          onChange={handleChange}
          className="m-6 outline-none p-2 rounded-3xl"
        />
        <textarea
          rows={5}
          type="text"
          placeholder="Book desc"
          name="desc1"
          onChange={handleChange}
          className="m-6 outline-none p-2 rounded-3xl"
        />

        <input
          type="text"
          placeholder="Book cover"
          name="cover"
          onChange={handleChange}
          className="m-6 outline-none p-2 rounded-3xl"
        />
        <input
          type="number"
          placeholder="Book price"
          name="price"
          onChange={handleChange}
          className="m-6 outline-none p-2 rounded-3xl"
        />
        <button
          onClick={handleClick}
          className="bg-[green] text-[white] transition-all duration-150 ease-in-out hover:bg-[white] hover:text-[green] h-[200px]"
        >
          Add
        </button>
      </div>
      {error && "Something went wrong!"}
      <Link
        to="/"
        className="hover:text-[red] transition-all duration-150 ease-in-out"
      >
        See all books
      </Link>
    </div>
  );
};

export default Add;
