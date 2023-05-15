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
    const response = await fetch(url);
    const characters = await response.json();
    return characters;
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const countHouseMembers = (characters) => {
  const houseCounts = {};

  characters.forEach((character) => {
    let house = character.family.toLowerCase();

    house = house.replace("house ", "");

    if (houseCounts[house]) {
      houseCounts[house]++;
    } else {
      houseCounts[house] = 1;
    }
  });

  return houseCounts;
};

const renderChart = (houseCounts) => {
  const donutChart = document.querySelector(".donut-chart");
  const houseNames = Object.keys(houseCounts);
  const baseColor = [0, 128, 255];
  const borderColor = "rgba(0, 0, 0, 1)";
  const backgroundColors = generateColorVariations(
    baseColor,
    0.8,
    houseNames.length
  );
  const borderColors = new Array(houseNames.length).fill(borderColor);

  new Chart(donutChart, {
    type: "doughnut",
    data: {
      labels: houseNames,
      datasets: [
        {
          label: "House Members",
          data: Object.values(houseCounts),
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        position: "left",
        align: "start",
        labels: {
          boxWidth: 10,
          padding: 10,
        },
      },
    },
  });
};

const init = async () => {
  const characters = await fetchCharacters();
  const houseCounts = countHouseMembers(characters);
  const sortedHouseCounts = Object.entries(houseCounts)
    .sort((a, b) => b[1] - a[1])
    .reduce((accumulator, [key, value]) => {
      accumulator[key] = value;
      return accumulator;
    }, {});

  renderChart(sortedHouseCounts);
};

init();
