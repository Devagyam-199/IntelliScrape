import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Web_scrapper = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState("");
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    if (!input) {
      setError("Input is required");
      return;
    }
    setData("");
    setSummary("");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCAip16wbdgH0LOfEgQrFye3mW3bVcWPIk",
        {
          contents: [
            {
              parts: [
                {
                  text: `Read ${input} and if it is a url then provide the scraped data of all <p>,<article>,<h1>,<h2>,<h3> tags as text and remove any html tags if present, else if the input is any type of text then just provide the text as it is and also do not give any conclusions and if the user tries to access any bad website or if you are unable to provide scrapped data then just simply say "Sorry, Error in scraping the url: Seems like you are trying to reach a dynamic website or an illegal website"`,
                },
              ],
            },
          ],
        }
      );
      if (response.data && response.data.candidates) {
        const scrapedData = response.data.candidates[0].content.parts[0].text;
        setData(scrapedData);

        // Store in history
        const newHistoryEntry = {
          input: input.substring(0, 20) + "...",
          data: scrapedData.substring(0, 30) + "...",
          fullData: scrapedData,
          timestamp: new Date().toLocaleString(),
        };
        setHistory((prevHistory) => [...prevHistory, newHistoryEntry]);
      } else {
        setError("No data received from the API");
      }
    } catch (error) {
      console.error("Error scraping the url:", error);
      setError("Error scraping the url");
    }
  };

  const sumgen = async (lenchose) => {
    setLength(lenchose);
    if (!input) {
      setError("Input is required");
      return;
    }

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCAip16wbdgH0LOfEgQrFye3mW3bVcWPIk",
        {
          contents: [
            {
              parts: [
                {
                  text: `Read ${data} and provide a useful ${lenchose} summary to the user`,
                },
              ],
            },
          ],
        }
      );
      if (response.data && response.data.candidates) {
        const generatedSummary =
          response.data.candidates[0].content.parts[0].text;
        setSummary(generatedSummary);

        // Update summary in the latest history entry
        setHistory((prevHistory) => {
          const updatedHistory = [...prevHistory];
          updatedHistory[prevHistory.length - 1].summary = generatedSummary;
          return updatedHistory;
        });
      } else {
        setError("No summary received from the API");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      setError("Error generating summary");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    history.forEach((entry, index) => {
      let yOffset = 10;
      doc.setFontSize(12);
      doc.text(10, yOffset, `Entry ${index + 1}`);
      yOffset += 10;
      doc.setFontSize(10);
      doc.text(10, yOffset, `Input: ${entry.input}`);
      yOffset += 10;

      // Handling Data
      const dataLines = doc.splitTextToSize(`Data: ${entry.fullData}`, 180);
      doc.text(10, yOffset, dataLines);
      yOffset += dataLines.length * 10;

      // Handling Summary
      if (entry.summary) {
        const summaryLines = doc.splitTextToSize(
          `Summary: ${entry.summary}`,
          180
        );
        doc.text(10, yOffset, summaryLines);
        yOffset += summaryLines.length * 10;
      }

      doc.text(10, yOffset, `Timestamp: ${entry.timestamp}`);
      yOffset += 20;

      if (yOffset > 270) {
        doc.addPage();
      }
    });

    doc.save("data_summary.pdf");
  };

  return (
    <div className="text-white">
      <div className="container mx-auto p-8">
        <div className="flex flex-col items-center mb-20">
          <h1 className="md:text-5xl text-3xl text-center font-bold mb-10">
            Welcome to IntelliScrape
          </h1>
          <h1 className="text-center w-2/3 md:text-xl text-md mb-10 font-semibold">
            Introducing an advanced AI-powered web scraper that not only
            extracts data from websites with precision but also summarizes the
            collected information.
          </h1>
          <p className="text-sm w-2/3 text-center">
            Utilizing machine learning and natural language processing, this
            tool intelligently navigates and gathers relevant data, then
            distills it into concise summaries, providing users with quick,
            actionable insights.
          </p>
        </div>
        <div className="w-full flex justify-center items-center p-8">
          <button className="md:hidden flex space-x-3" onClick={handleToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <p className="text-xl">History</p>
          </button>
        </div>
        <div className="flex flex-col items-center">
          {isOpen && (
            <div className="md:hidden flex flex-col space-y-4 mt-5 justify-center items-center shadow-lg px-4 py-3">
              <h1 className="text-3xl text-center text-gray-100 font-bold">
                History
              </h1>
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="flex overflow-clip font-semibold p-3 text-sm text-gray-100 border flex-col"
                >
                  <p className="overflow-clip">
                    <strong>Input:</strong> {entry.input}
                  </p>
                  <p>
                    <strong>Data:</strong> {entry.data}
                  </p>
                  <p>
                    <strong>Timestamp:</strong> {entry.timestamp}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className=" flex md:flex-row flex-col rounded-lg">
          <div className="md:flex md:border md:space-y-5 md:flex-col md:w-1/4 md:p-3 hidden">
            <h1 className="text-3xl text-center text-gray-100 font-bold">
              History
            </h1>
            {history.map((entry, index) => (
              <div
                key={index}
                className="flex overflow-clip font-semibold p-3 text-sm text-gray-100 border flex-col"
              >
                <p className="overflow-clip">
                  <strong>Input:</strong> {entry.input}
                </p>
                <p>
                  <strong>Data:</strong> {entry.data}
                </p>
                <p>
                  <strong>Timestamp:</strong> {entry.timestamp}
                </p>
              </div>
            ))}
          </div>
          <div className="border-s relative rounded w-full flex flex-col">
            <div className="w-full text-black min-h-96 h-full bg-white flex md:flex-row flex-col rounded-e-md">
              <div className="md:w-1/2 p-5 w-full border-b md:border-e">
                <h1 className="text-xl mb-3 font-bold">
                  Your Data will be shown here:
                </h1>
                {error && (
                  <p className="w-full md:h-full flex justify-center items-center text-xl">
                    {error}
                  </p>
                )}
                <div>
                  {data ? (
                    <p className="text-md overflow-clip p-8">{data}</p>
                  ) : (
                    <p className="w-full md:h-full flex text-black bg-green justify-center items-center text-xl">
                      Loading your data...
                    </p>
                  )}
                </div>
              </div>
              <div className="md:w-1/2 p-5 flex mb-12 flex-col items-center">
                <div className="relative cursor-pointer w-5/6 border border-gray-50 hover:bg-gray-50 text-center py-3 mb-5 menu">
                  Generate Your Summary
                  <div className="absolute dropdown bg-gray-50 my-8">
                    <p onClick={() => sumgen("short")}>short</p>
                    <p onClick={() => sumgen("medium")}>medium</p>
                    <p onClick={() => sumgen("long")}>long</p>
                  </div>
                </div>
                {summary && (
                  <div className="text-center">
                    <h1 className="text-xl mb-3 font-bold">
                      Here is the {length} Generated Summary
                    </h1>
                    <p className="text-md">{summary}</p>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full items-center">
              <input
                className="px-3 w-full py-3 border text-black outline-none"
                type="text"
                placeholder="Enter your url/text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="border text-black bg-white rounded-e-md px-6 py-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="hover:bg-violet-200 hover:text-black flex justify-center items-center mt-5 text-violet-100 border border-violet-100 h-10 font-medium py-6 px-8 rounded-md transition-all duration-150"
            onClick={generatePDF}
          >
            Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Web_scrapper;
