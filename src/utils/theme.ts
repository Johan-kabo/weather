import { WeatherData, ThemeConfig } from '../types/weather';

const weatherBackgrounds: Record<string, ThemeConfig> = {
  // Clear sky
  '01d': {
    gradient: 'from-blue-400 to-blue-600',
    overlay: 'bg-blue-900/20',
    image: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=2000&q=80',
  },
  '01n': {
    gradient: 'from-blue-900 to-indigo-900',
    overlay: 'bg-blue-950/40',
    image: 'https://images.unsplash.com/photo-1532978879514-6cb49237bd23?auto=format&fit=crop&w=2000&q=80',
  },
  // Few clouds
  '02d': {
    gradient: 'from-blue-300 to-blue-500',
    overlay: 'bg-blue-800/20',
    image: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=2000&q=80',
  },
  '02n': {
    gradient: 'from-blue-800 to-indigo-900',
    overlay: 'bg-blue-950/40',
    image: 'https://images.unsplash.com/photo-1532978879514-6cb49237bd23?auto=format&fit=crop&w=2000&q=80',
  },
  // Scattered/broken clouds
  '03d': {
    gradient: 'from-blue-200 to-gray-400',
    overlay: 'bg-gray-800/30',
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80',
  },
  '03n': {
    gradient: 'from-gray-800 to-blue-900',
    overlay: 'bg-gray-950/40',
    image: 'https://images.unsplash.com/photo-1505322101000-19457468a038?auto=format&fit=crop&w=2000&q=80',
  },
  // Rain
  '10d': {
    gradient: 'from-gray-400 to-gray-600',
    overlay: 'bg-gray-800/40',
    image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=2000&q=80',
  },
  '10n': {
    gradient: 'from-gray-800 to-gray-900',
    overlay: 'bg-gray-950/50',
    image: 'https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?auto=format&fit=crop&w=2000&q=80',
  },
  // Thunderstorm
  '11d': {
    gradient: 'from-gray-600 to-gray-800',
    overlay: 'bg-gray-900/50',
    image: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=2000&q=80',
  },
  '11n': {
    gradient: 'from-gray-800 to-gray-900',
    overlay: 'bg-gray-950/60',
    image: 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?auto=format&fit=crop&w=2000&q=80',
  },
};

export const getThemeConfig = (weatherData: WeatherData | null): ThemeConfig => {
  if (!weatherData) {
    return {
      gradient: 'from-blue-600 to-purple-700',
      overlay: 'bg-gray-900/30',
      image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80',
    };
  }

  const icon = weatherData.weather[0].icon;
  const baseIcon = icon.slice(0, 2) + (icon.endsWith('d') ? 'd' : 'n');
  
  return weatherBackgrounds[baseIcon] || weatherBackgrounds['01d'];
};