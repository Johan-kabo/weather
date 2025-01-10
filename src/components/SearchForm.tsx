import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { CityGeoData } from '../types/weather';
import axios from 'axios';

interface SearchFormProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  API_KEY: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading, API_KEY }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<CityGeoData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [city, API_KEY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: CityGeoData) => {
    const cityName = suggestion.state 
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    setCity(cityName);
    onSearch(cityName);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md relative" ref={suggestionRef}>
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white/90 backdrop-blur-md rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4 text-blue-500" />
              <div>
                <span className="text-gray-800">{suggestion.name}</span>
                {suggestion.state && (
                  <span className="text-gray-600">, {suggestion.state}</span>
                )}
                <span className="text-gray-600">, {suggestion.country}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </form>
  );
};