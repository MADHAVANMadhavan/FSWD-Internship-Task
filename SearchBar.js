// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import data from '../data.json'; // Assuming the JSON file is in src folder
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      // Filter the data based on query
      const filtered = data.filter(country =>
        country.name.toLowerCase().includes(query.toLowerCase()) ||
        (country.capital && country.capital.toLowerCase().includes(query.toLowerCase()))
      );
      setSuggestions(filtered);
      setLoading(false);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by country name or capital..."
      />
      {loading && <div className="loading">Loading...</div>}
      <ul className="suggestions">
        {suggestions.map((country, index) => (
          <li key={index}>
            {country.name} {country.capital ? ` - ${country.capital}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
