export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  name: string;
  sys: {
    country: string;
  };
}

export interface SearchHistory {
  city: string;
  timestamp: number;
  temp?: number;
  description?: string;
  icon?: string;
}

export interface CityGeoData {
  name: string;
  country: string;
  state?: string;
}

export interface ThemeConfig {
  gradient: string;
  overlay: string;
  image: string;
}