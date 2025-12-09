import React, { useState } from "react";

// --- Weather API ---
async function fetchWeather(city: string): Promise<string> {
  try {
    const res = await fetch(`https://wttr.in/${city}?format=3`);
    return await res.text();
  } catch {
    return "⚠️ Weather unavailable";
  }
}

// --- Weather Widget Component ---
const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city!");
      return;
    }
    setLoading(true);
    const result = await fetchWeather(city.trim());
    setWeather("📍 " + result);
    setLoading(false);
    setCity("");
  };

  return (
    <div className="mx-auto max-w-3xl p-4 m-3">
      {/* WEATHER INPUT & BUTTON */}
      <div className="flex relative">
        <h2 className="text-base absolute -top-[22px] font-semibold flex items-center gap-2 mb-2">
          <i className="fa-solid text-xl fa-cloud-sun text-lightaccent-600 dark:text-darkaccent-600 mb-1"></i>{" "}
          Weather
        </h2>

        <div className="flex flex-col md:flex-row gap-3 w-full">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 bg-white rounded-md p-2 disabled:opacity-50 dark:bg-dark-300"
            placeholder={loading ? "Loading..." : "Enter your city"}
            disabled={loading}
          />
          <button
            className="gmBtn bg-lightaccent-600 text-white rounded-lg  px-2 transition w-full md:w-auto disabled:opacity-50 dark:bg-darkaccent-600 dark:text-dark-200"
            onClick={handleGetWeather}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Get Weather"}
          </button>
        </div>
      </div>

      {/* WEATHER RESPONSE */}
      <p className="mt-2">{weather}</p>
    </div>
  );
};

export default WeatherWidget;
