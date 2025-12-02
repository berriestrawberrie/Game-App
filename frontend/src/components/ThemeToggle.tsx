import { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 text-center cursor-pointer select-none dark:text-darkaccent-600"
    >
      {darkMode ? "Light" : "Dark"} Mode <br />
      {darkMode ? (
        <i className="fa-solid fa-toggle-on text-darkaccent-600 text-4xl"></i>
      ) : (
        <i className="fa-solid fa-toggle-off  text-4xl"></i>
      )}
    </div>
  );
};

export default ThemeToggle;
