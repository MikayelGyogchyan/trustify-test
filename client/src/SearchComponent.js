import React, { useEffect, useState } from "react";
import "./SearchComponent.css";

const url = "http://localhost:3001";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(url + "/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm }),
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching logs:", error);
    }
  };

  const handleReset = async () => {
    setSearchTerm("");
    try {
      const response = await fetch(url + "/api/search", {
        method: "GET",
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching logs:", error);
    }
  };

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <div className="container">
      <h1 className="header">Interactúa con los datos</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex">
        <button className="primary-btn" onClick={handleSearch}>
          Buscar
        </button>
        <button className="secondary-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="results">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Host</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((log) => (
              <tr key={log._id}>
                <td>{log.dt}</td>
                <td>{log.host}</td>
                <td>{log.message.substring(0, 60)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchComponent;
