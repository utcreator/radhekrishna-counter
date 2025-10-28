import React, { useState, useEffect } from "react";
import { Moon, Sun, RotateCcw, History } from "lucide-react";

export default function TapCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedCount = localStorage.getItem("count");
    const storedHistory = localStorage.getItem("history");
    const storedTheme = localStorage.getItem("darkMode");
    if (storedCount) setCount(parseInt(storedCount));
    if (storedHistory) setHistory(JSON.parse(storedHistory));
    if (storedTheme === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.className = darkMode ? "bg-gray-900 text-white" : "bg-white text-black";
  }, [darkMode]);

  const handleTap = () => {
    setCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setHistory((prev) => [
      ...prev,
      { date: new Date().toLocaleString(), value: count },
    ]);
    setCount(0);
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  // Detect if the tap was on a button (to avoid counting on button clicks)
  const handleScreenClick = (e) => {
    if (
      e.target.closest("button") ||
      e.target.closest("#history-box") ||
      e.target.tagName === "svg"
    ) {
      return;
    }
    handleTap();
  };

  return (
    <div
      onClick={handleScreenClick}
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 select-none relative ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header Buttons */}
      <div className="absolute top-4 right-4 flex space-x-3">
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <button
          onClick={handleReset}
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          <RotateCcw size={22} />
        </button>

        <button
          onClick={toggleHistory}
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          <History size={22} />
        </button>
      </div>

      {/* Counter Display */}
      <div className="text-center">
        <h1 className="text-8xl font-extrabold mb-4">{count}</h1>
        <p
          className={`text-lg transition-colors duration-500 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Tap anywhere (or press +) to count
        </p>
      </div>

      {/* History Box */}
      {showHistory && (
        <div
          id="history-box"
          className={`absolute bottom-4 w-11/12 max-w-md max-h-64 overflow-y-auto rounded-2xl p-4 shadow-lg border ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-gray-100 border-gray-300 text-black"
          }`}
        >
          <h2 className="text-lg font-semibold mb-2">History</h2>
          {history.length === 0 ? (
            <p className="text-sm opacity-70">No history yet</p>
          ) : (
            <ul className="space-y-1">
              {history
                .slice()
                .reverse()
                .map((item, index) => (
                  <li
                    key={index}
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.date}: <span className="font-semibold">{item.value}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
