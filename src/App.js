import React, { useState } from "react";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  // API URL (Make sure it's correct)
  const API_URL = "https://fastapi-backend-pxh3.onrender.com"; // Change this to your actual backend URL

  // Function to handle JSON input change
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
    setError(""); // Clear previous errors
  };

  // Validate and send request
  const handleSubmit = async () => {
    try {
      const cleanedInput = jsonInput.replace(/[“”]/g, '"'); // Convert curly quotes to straight quotes
      const parsedData = JSON.parse(cleanedInput);

      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format. Expected { data: [...] }");
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const data = await response.json();
      setResponseData(data);
      setError(""); // Clear errors
    } catch (err) {
      setError(err.message);
      setResponseData(null);
    }
  };

  // Function to handle dropdown selection
  const handleFilterChange = (event) => {
    const { value } = event.target;
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Function to filter response data
  const getFilteredResponse = () => {
    if (!responseData) return null;

    let filteredData = {};
    if (selectedFilters.includes("Numbers")) filteredData.numbers = responseData.numbers;
    if (selectedFilters.includes("Alphabets")) filteredData.alphabets = responseData.alphabets;
    if (selectedFilters.includes("Highest Alphabet"))
      filteredData.highest_alphabet = responseData.highest_alphabet;

    return filteredData;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Backend Data Processor</h1>
      <textarea
        placeholder='Enter JSON here...'
        value={jsonInput}
        onChange={handleInputChange}
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <>
          <h3>Filter Response</h3>
          <select onChange={handleFilterChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>

          <pre>{JSON.stringify(getFilteredResponse(), null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default App;
