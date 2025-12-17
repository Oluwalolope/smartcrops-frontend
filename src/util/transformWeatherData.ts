interface CurrentData {
  time: string;
  temperature_2m: number;
  precipitation: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
}

interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

interface HourlyData {
  time: string[];
  weather_code: number[]
  temperature_2m: number[];
}

interface WeatherApiResponse {
  current: CurrentData;
  daily: DailyData;
  hourly: HourlyData;
}

// Output types
export interface CurrentForecast {
  weatherCondition: string;
  day: string;
  temperature: number;
  precipitation: number;
  windSpeed: number;
  humidity: number;
}


// ==== Helper: Map WMO codes → forecast ====
const getForecastFromWMO = (code: number) => {
  if (code === 0) return { weatherCondition: 'sunny' };
  if ([1, 2, 3].includes(code)) return { weatherCondition: 'partly cloudy' };
  if ([45, 48].includes(code)) return { weatherCondition: 'foggy'};
  if (code >= 51 && code <= 57) return { weatherCondition: 'drizzling'};
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { weatherCondition: 'rainy'};
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return { weatherCondition: 'snowy'};
  if (code >= 95 && code <= 99) return { weatherCondition: 'stormy'};
  return { weatherCondition: 'cloudy' };
};

// ==== Transformer Function ====
const transformWeatherData = (data: WeatherApiResponse): {
  currentForecast: CurrentForecast;
} => {
  // === CURRENT FORECAST ===
  const todayIndex = 0;
  const currentDate = new Date(data.current.time);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  };

  const { weatherCondition } = getForecastFromWMO(data.daily.weather_code[todayIndex]);

  const currentForecast: CurrentForecast = {
    weatherCondition,
    day: currentDate.toLocaleDateString("en-US", options),
    precipitation: Math.round(data.current.precipitation),
    temperature: Math.round(data.current.temperature_2m),
    windSpeed: Math.round(data.current.wind_speed_10m),
    humidity: Math.round(data.current.relative_humidity_2m)
  };


  return { currentForecast };
}

export default transformWeatherData;