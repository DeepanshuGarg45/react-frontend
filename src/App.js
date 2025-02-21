import { useState } from "react";
import { Select, Button, Input } from "@/components/ui";

export default function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await fetch("https://fastapi-backend-pxh3.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON or API error");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">ABCD123</h1>
      <Input
        placeholder="Enter JSON here"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      {response && (
        <Select
          multiple
          options={["Alphabets", "Numbers", "Highest Alphabet"]}
          onChange={setSelectedOptions}
        />
      )}
      <div>
        {selectedOptions.includes("Numbers") && (
          <p>Numbers: {JSON.stringify(response?.numbers)}</p>
        )}
        {selectedOptions.includes("Alphabets") && (
          <p>Alphabets: {JSON.stringify(response?.alphabets)}</p>
        )}
        {selectedOptions.includes("Highest Alphabet") && (
          <p>Highest Alphabet: {JSON.stringify(response?.highest_alphabet)}</p>
        )}
      </div>
    </div>
  );
}
