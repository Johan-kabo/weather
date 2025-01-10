import React from 'react';
import { Cloud, Droplets, Wind, Eye, Thermometer } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherDisplayProps {
  data: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  return (
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-xl p-6 text-white">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">{data.name}, {data.sys.country}</h2>
        <div className="flex items-center justify-center mt-4">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
          <div className="text-6xl font-bold ml-4">
            {Math.round(data.main.temp)}°C
          </div>
        </div>
        <p className="text-xl capitalize mt-2">{data.weather[0].description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center p-3 bg-white/5 rounded-lg">
          <Thermometer className="w-6 h-6 mr-2" />
          <div>
            <p className="text-sm opacity-70">Feels like</p>
            <p className="font-semibold">{Math.round(data.main.feels_like)}°C</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-white/5 rounded-lg">
          <Droplets className="w-6 h-6 mr-2" />
          <div>
            <p className="text-sm opacity-70">Humidity</p>
            <p className="font-semibold">{data.main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-white/5 rounded-lg">
          <Wind className="w-6 h-6 mr-2" />
          <div>
            <p className="text-sm opacity-70">Wind Speed</p>
            <p className="font-semibold">{data.wind.speed} m/s</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-white/5 rounded-lg">
          <Eye className="w-6 h-6 mr-2" />
          <div>
            <p className="text-sm opacity-70">Visibility</p>
            <p className="font-semibold">{(data.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
      </div>
    </div>
  );
};