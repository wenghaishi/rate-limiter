"use client";

import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handlePostRequest = async () => {
    console.log("clicked");
    axios
      .post("/api/otp", {
        input: userInput,
      })
      .then(function (response) {
        console.log(response);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter text"
      />
      <button onClick={handlePostRequest}>Make POST Request</button>
      <p>Result: {result}</p>
    </main>
  );
};

export default Home;
