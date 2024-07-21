import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://lotrapi.co/api/v1/characters");
      console.log("response: ", response.data.results);
      setData(response.data.results);
    } catch (error) {
      setError(error);
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lord of the Rings Characters</h1>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((character) => (
          <div key={character.id} className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{character.name}</h2>
            <p>
              <strong>Height:</strong> {character.height}
            </p>
            <p>
              <strong>Hair Color:</strong> {character.hair_color}
            </p>
            <p>
              <strong>Eye Color:</strong> {character.eye_color}
            </p>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>         
            <p>
              <strong>Weapons:</strong> {character.weapons.join(", ")}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
