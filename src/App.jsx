import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Clipboard } from "lucide-react";

function App() {
  const [startTach, setStartTach] = useState(0.0);
  const [endTach, setEndTach] = useState(0.0);
  const [totalTach, setTotalTach] = useState(0.0);
  const [copySuccess, setCopySuccess] = useState(false);

  // Generic handler for any numeric input
  const handleNumericInput = (e, setterFunction) => {
    const inputValue = e.target.value;
    setterFunction(inputValue);
  };

  // Calculate total tach whenever start or end tach changes
  useEffect(() => {
    const start = startTach === "" ? 0 : parseFloat(startTach);
    const end = endTach === "" ? 0 : parseFloat(endTach);

    // Calculate the difference and round to nearest 10th
    const difference = end - start;
    const roundedDifference = Math.round(difference * 10) / 10;

    setTotalTach(roundedDifference);
  }, [startTach, endTach]);

  // Calculate check-in time for person 1
  const checkInTimePerson1 =
    parseFloat(startTach) + parseFloat(totalTach / 2) || 0;
  const perPersonTach = totalTach / 2;

  // Function to copy check-in time to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(checkInTimePerson1.toFixed(1))
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  // Prevent any content from overflowing
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden bg-gradient-to-b from-indigo-50 to-blue-100 fixed inset-0">
      <div className="w-full h-full max-w-md max-h-screen p-6 mx-auto bg-white rounded-3xl shadow-lg flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">
            Tach Splitter
          </h1>
        </div>

        <div className="space-y-6 flex-grow overflow-y-auto">
          <div className="space-y-2">
            <label
              htmlFor="start-tach-input"
              className="block text-sm font-medium text-gray-700"
            >
              Checkout Tach Time
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="start-tach-input"
                type="text"
                value={startTach}
                onChange={(e) => handleNumericInput(e, setStartTach)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 py-3 rounded-xl text-lg placeholder-black"
                placeholder="0.0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-lg">hrs</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="end-tach-input"
              className="block text-sm font-medium text-gray-700"
            >
              End Tach Time
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="end-tach-input"
                type="text"
                value={endTach}
                onChange={(e) => handleNumericInput(e, setEndTach)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 py-3 rounded-xl text-lg"
                placeholder="0.0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-lg">hrs</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-2xl p-4">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">
                Flight Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Time:</span>
                  <span className="text-lg font-bold text-blue-900">
                    {totalTach} hrs
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time Per Person:</span>
                  <span className="text-lg font-bold text-blue-900">
                    {perPersonTach.toFixed(1)} hrs
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Person 1 Check-in Time:</span>
                  <span className="text-lg font-bold text-blue-900">
                    {checkInTimePerson1.toFixed(1)} hrs
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className="mt-4 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white py-3.5 px-4 rounded-xl font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <Clipboard size={18} />
              Copy Person 1 Check-in Time
            </button>

            {copySuccess && (
              <div className="mt-2 text-center text-sm text-green-500 font-medium">
                Check-in time copied to clipboard!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
