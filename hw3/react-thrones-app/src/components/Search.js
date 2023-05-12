import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../views/Search.css";

const url = "https://thronesapi.com/api/v2/Characters";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(url);
        setAllCharacters(response.data);
        setDisplayedCharacters(response.data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setError(null);
      setDisplayedCharacters(allCharacters);
    }
  };

  const handleSearchSubmit = () => {
    setError(null);

    const filteredCharacters = allCharacters.filter((character) =>
      character.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredCharacters.length === 0) {
      setError("Character not found.");
    } else {
      setError(null);
    }

    setDisplayedCharacters(filteredCharacters);
  };

  return (
    <div className="search-container">
      <h1 className="search-heading">Search for a character</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        placeholder="Enter character name"
        className="search-input"
      />
      <button onClick={handleSearchSubmit} className="search-button">
        Search
      </button>
      {error && <p className="search-error">{error}</p>}
      <section className="characters-section">
        {displayedCharacters.map((character) => (
          <div key={character.id} className="character">
            <img
              src={character.imageUrl}
              alt={`${character.firstName} ${character.lastName}`}
              className="character-img"
            />
            <h2 className="character-name">
              {character.firstName} {character.lastName}
            </h2>
            <h3 className="character-title">{character.title}</h3>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Search;
