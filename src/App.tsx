import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, AlertCircle, Sun, Moon, Backpack } from 'lucide-react';
import { SearchForm } from './components/SearchForm';
import { WeatherDisplay } from './components/WeatherDisplay';
import { SearchHistory } from './components/SearchHistory';
import { WeatherData, SearchHistory as SearchHistoryType } from './types/weather';
import { getThemeConfig } from './utils/theme';

const API_KEY = '83a8ca2f1b1cf2e3a67ceb317456b535';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [searchHistory, setSearchHistory] = useState<SearchHistoryType[]>(() => {
    const saved = localStorage.getItem('weatherSearchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addToHistory = (city: string, data: WeatherData) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.city.toLowerCase() !== city.toLowerCase());
      return [{
        city,
        timestamp: Date.now(),
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      }, ...filtered].slice(0, 5);
    });
  };

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });
      setWeatherData(response.data);
      addToHistory(city, response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const theme = getThemeConfig(weatherData);

  return (
    <div 
      className={`min-h-screen transition-all duration-1000 ease-in-out bg-gradient-to-br ${theme.gradient} ${
        darkMode ? 'dark' : ''
      }`}
    >
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${theme.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <div className={`absolute inset-0 ${theme.overlay} backdrop-blur-sm transition-colors duration-1000 ease-in-out`} />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center p-4 md:p-8">
        <div className="w-full max-w-4xl flex flex-col items-center gap-6">
          <div className="w-full flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Cloud className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Weather App</h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </div>

          <SearchForm onSearch={fetchWeather} isLoading={loading} API_KEY={API_KEY} />
          
          {error && (
            <div className="flex items-center gap-2 text-red-300 bg-red-500/10 px-4 py-2 rounded-lg animate-fadeIn">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {weatherData && (
            <div className="animate-fadeIn">
              <WeatherDisplay data={weatherData} />
            </div>
          )}

          {searchHistory.length > 0 && (
            <div className="animate-fadeIn">
              <SearchHistory 
                history={searchHistory} 
                onSelect={fetchWeather} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;