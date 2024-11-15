"use client";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { IoIosStats } from "react-icons/io";
import { GiRibbonMedal } from "react-icons/gi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { BsFillTrophyFill } from "react-icons/bs";
import { PiNotepadFill } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SkillTest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rank, setRank] = useState("0");
  const [percentile, setPercentile] = useState("0");
  const [currentscore, setCurrentScore] = useState("0");
  const [rankError, setRankError] = useState("");
  const [percentileError, setPercentileError] = useState("");
  const [scoreError, setScoreError] = useState("");
  const [questionData, setQuestionData] = useState([
    { name: "Correct", value: 0 },
    { name: "Incorrect", value: 15 },
  ]);

  const handleUpdateClick = () => setIsModalOpen(true);

  const handleRankChange = (e) => {
    const value = e.target.value;
    setRank(value);
    setRankError(/[^0-9]/.test(value) ? "Rank must be a number" : "");
  };

  const handlePercentileChange = (e) => {
    const value = e.target.value;
    setPercentile(value);
    const percentileValue = parseFloat(value);
    setPercentileError(
      isNaN(percentileValue) || percentileValue < 0 || percentileValue > 100
        ? "Percentile must be a number between 0 and 100"
        : ""
    );
  };

  const handleScoreChange = (e) => {
    const value = e.target.value;
    setCurrentScore(value);
    const scoreValue = parseInt(value, 10);

    setScoreError(
      isNaN(scoreValue) || scoreValue < 0 || scoreValue > 15
        ? "Current Score must be a number between 0 and 15"
        : ""
    );

    if (!isNaN(scoreValue) && scoreValue >= 0 && scoreValue <= 15) {
      const correctAnswers = scoreValue;
      const incorrectAnswers = 15 - scoreValue;

      setQuestionData([
        { name: "Correct", value: correctAnswers },
        { name: "Incorrect", value: incorrectAnswers },
      ]);
    }
  };

  const handleSubmit = () => {
    if (!rankError && !percentileError && !scoreError) {
      console.log({ rank, percentile, currentscore });
      setIsModalOpen(false); 
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white-100 p-6">
      <header className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold text-gray-800">WhatBytes</h1>
      </header>
      <hr />
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-2 border-r border-gray-300 pr-4">
          <ul className="space-y-4 mt-12">
            <li className="flex items-center font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-100 py-4 px-3 rounded-full transition">
              <IoIosStats className="mr-3 text-xl" />
              Dashboard
            </li>
            <li className="flex items-center font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-100 py-4 px-3 rounded-full transition">
              <GiRibbonMedal className="mr-3 text-xl" />
              Skill Test
            </li>
            <li className="flex items-center font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-100 py-4 px-3 rounded-full transition">
              <LuFileSpreadsheet className="mr-3 text-xl" />
              Internship
            </li>
          </ul>
        </aside>

{/* Skill Test  */}
        <main className="col-span-12 md:col-span-6 space-y-6"> 
          <h1 className="mt-2">Skill Test</h1>
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png"
                  alt="HTML Logo"
                  className="w-8 h-8"
                />
                <div>
                  <h2 className="text-xl font-bold">Hyper Text Markup Language</h2>
                  <p className="text-sm text-gray-500">
                    Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
                  </p>
                </div>
              </div>
              <button
                className="bg-blue-950 text-white px-4 py-2 rounded-lg"
                onClick={handleUpdateClick}
              >
                Update
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 pr-16 border-r-0 md:border-r-2 border-gray-300">
              <BsFillTrophyFill className="text-yellow-500 text-3xl" />
              <div>
                <div className="text-md font-semibold">{rank}</div>
                <p className="text-sm text-gray-600">Your Rank</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 pr-8 border-r-0 md:border-r-2 border-gray-300">
              <PiNotepadFill className="text-gray-500 text-3xl" />
              <div>
                <div className="text-md font-semibold">{percentile}%</div>
                <p className="text-sm text-gray-600">Percentile</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <TiTick className="text-green-500 text-3xl" />
              <div>
                <div className="text-md font-semibold">{currentscore}/15</div>
                <p className="text-sm text-gray-600">Correct Answers</p>
              </div>
            </div>
          </div>
          
{/* Comparison Graph  */}
          <div className="bg-white border border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Comparison Graph</h3>
            <p className="text-sm text-gray-500">
              You scored 30% percentile which is lower than the average percentile
              72% of all engineers who took this assessment.
            </p>
            <div className="mt-4 bg-gray-100 w-full h-60 flex justify-center items-center">
              <p className="text-gray-500">[Graph Placeholder]</p>
            </div>
          </div>
        </main>

        <div className="col-span-12 md:col-span-4 pl-4 space-y-6 mt-10">
          <div className="bg-white border border-gray-300 p-4 rounded-lg">
          <h3 className="text-md font-semibold mb-5">Syllabus Wise Analysis</h3>
<div className="space-y-6">

{/*Subject wise Analysis*/} 
  <div className="flex flex-col">
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm md:text-base">HTML Tools, Forms, History</span>
    </div>
    <div className="flex items-center">
      <div className="relative w-full md:w-5/6 h-3 rounded-full overflow-hidden bg-blue-200">
        <div className="absolute top-0 left-0 h-full bg-blue-600" style={{ width: '80%' }}></div>
      </div>
      <span className="ml-3 md:ml-5 text-blue-600 font-bold text-xs md:text-sm">80%</span>
    </div>
  </div>

  
  <div className="flex flex-col">
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm md:text-base">Tags & References in HTML</span>
    </div>
    <div className="flex items-center">
      <div className="relative w-full md:w-5/6 h-3 rounded-full overflow-hidden bg-orange-200">
        <div className="absolute top-0 left-0 h-full bg-orange-500" style={{ width: '60%' }}></div>
      </div>
      <span className="ml-3 md:ml-5 text-orange-500 font-bold text-xs md:text-sm">60%</span>
    </div>
  </div>

  
  <div className="flex flex-col">
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm md:text-base">Tables & References in HTML</span>
    </div>
    <div className="flex items-center">
      <div className="relative w-full md:w-5/6 h-3 rounded-full overflow-hidden bg-red-200">
        <div className="absolute top-0 left-0 h-full bg-red-500" style={{ width: '24%' }}></div>
      </div>
      <span className="ml-3 md:ml-5 text-red-500 font-bold text-xs md:text-sm">24%</span>
    </div>
  </div>

 
  <div className="flex flex-col">
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm md:text-base">Tables & CSS Basics</span>
    </div>
    <div className="flex items-center">
      <div className="relative w-full md:w-5/6 h-3 rounded-full overflow-hidden bg-green-200">
        <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: '96%' }}></div>
      </div>
      <span className="ml-3 md:ml-5 text-green-500 font-bold text-xs md:text-sm">96%</span>
    </div>
  </div>
            </div>
          </div>
{/*Question Analysis*/}
          <div className="bg-white border border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Question Analysis</h3>
            <p className="text-sm text-gray-500 mt-2">
              <b>You scored {questionData[0].value} questions correct out of 15.</b> 
              However it still needs some improvement.
            </p>
            <div className="w-full h-40">
              <Doughnut
                data={{
                  labels: questionData.map((item) => item.name),
                  datasets: [
                    {
                      data: questionData.map((item) => item.value),
                      backgroundColor: [
                        "rgba(54, 162, 235, 0.8)",
                        "rgba(173, 216, 230, 0.4)",
                      ],
                      borderColor: [
                        "rgba(54, 162, 235, 1)",
                        "rgba(173, 216, 230, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>

{/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Scores</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Rank"
                value={rank}
                onChange={handleRankChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {rankError && <p className="text-red-500 text-sm">{rankError}</p>}

              <input
                type="text"
                placeholder="Percentile"
                value={percentile}
                onChange={handlePercentileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {percentileError && <p className="text-red-500 text-sm">{percentileError}</p>}

              <input
                type="text"
                placeholder="Current Score"
                value={currentscore}
                onChange={handleScoreChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {scoreError && <p className="text-red-500 text-sm">{scoreError}</p>}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCancel}
                className="mr-2 bg-white text-blue-950 px-4 py-2 rounded"
              >
                cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-950 text-white px-4 py-2 rounded"
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
