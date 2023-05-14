import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { ArcElement, DoughnutController } from "chart.js";

Chart.register(ArcElement, DoughnutController);

const url = "https://thronesapi.com/api/v2/Characters";

const generateColorVariations = (baseColor, alpha, steps) => {
  const [r, g, b] = baseColor;
  const result = [];

  for (let i = 1; i <= steps; i++) {
    const factor = i / steps;
    result.push(
      `rgba(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(
        b * factor
      )}, ${alpha})`
    );
  }

  return result;
};

const fetchCharacters = async () => {
  try {
    const response = await axios.get(url);
    const characters = response.data;
    return characters;
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const countHouseMembers = (characters) => {
  const houseCounts = {};

  characters.forEach((character) => {
    let house = character.family.toLowerCase();
    if (houseCounts[house]) {
      houseCounts[house]++;
    } else {
      houseCounts[house] = 1;
    }
  });

  return houseCounts;
};

const sortHouseCounts = (houseCounts) => {
  return Object.entries(houseCounts)
    .sort((a, b) => b[1] - a[1])
    .reduce((accumulator, [key, value]) => {
      accumulator[key] = value;
      return accumulator;
    }, {});
};

const Houses = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      const characters = await fetchCharacters();
      const houseCounts = countHouseMembers(characters);
      const sortedHouseCounts = sortHouseCounts(houseCounts);
      const houseNames = Object.keys(sortedHouseCounts);
      const baseColor = [150, 75, 0];
      const borderColor = "rgba(0, 0, 0, 1)";
      const backgroundColors = generateColorVariations(
        baseColor,
        0.8,
        houseNames.length
      );
      const borderColors = new Array(houseNames.length).fill(borderColor);

      setChartData({
        labels: houseNames,
        datasets: [
          {
            label: "House Members",
            data: Object.values(sortedHouseCounts),
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      });
    };

    fetchDataAndRenderChart();
  }, []);

  if (!chartData) return <div>Loading...</div>;

  const renderLegend = () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {chartData.labels.map((house, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                  marginRight: "10px",
                }}
              ></div>
              <div>{house}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "600px",
          position: "relative",
          margin: "30px",
        }}
      >
        <div
          style={{
            width: "600px",
            height: "600px",
            position: "relative",
          }}
        >
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
            }}
          />
        </div>
      </div>
      {renderLegend()}
    </div>
  );
};

export default Houses;
