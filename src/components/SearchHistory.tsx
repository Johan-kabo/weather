import React from 'react';
import { History, ThermometerIcon } from 'lucide-react';
import { SearchHistory as SearchHistoryType } from '../types/weather';

interface SearchHistoryProps {
  history: SearchHistoryType[];
  onSelect: (city: string) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect }) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2 mb-2 text-white/80">
        <History className="w-4 h-4" />
        <h3 className="text-sm font-medium">Recent Searches</h3>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item.city)}
            className="flex items-center justify-between w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors group"
          >
            <span className="flex items-center gap-2">
              {item.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                  alt=""
                  className="w-8 h-8"
                />
              )}
              <span>{item.city}</span>
            </span>
            {item.temp !== undefined && (
              <span className="flex items-center gap-1 text-sm opacity-80 group-hover:opacity-100">
                <ThermometerIcon className="w-4 h-4" />
                {Math.round(item.temp)}°C
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};