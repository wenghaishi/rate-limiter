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

    try {
      const response = await axios.post("/api/otp", {
        input: userInput,
      });
      console.log(response);
      console.log(response.data);

      setResult(response.data);
    } catch (error) {
      setResult(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-20 p-24">
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter OTP"
        className="p-4 rounded-lg focus:outline-none"
      />
      <button
        className="bg-green-300 p-6 rounded-lg"
        onClick={handlePostRequest}
      >
        Make POST Request
      </button>
      <p className="text-2xl">Result: {result}</p>
    </main>
  );
};

export default Home;
