let makeSalaryBarGraph = (data) => {
  const canvas = document.getElementById("salary-based");
  canvas.setAttribute("height", window.innerHeight * 0.8);
  canvas.setAttribute("width", window.innerWidth * 0.3);
  const myChart = new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: ["6-10 LPA", "10-20 LPA", "20+ LPA"],
      datasets: [
        {
          label: "Count of students",
          data: [
            data.salaryBasedData[1].count,
            data.salaryBasedData[2].count,
            data.salaryBasedData[3].count,
          ],
          backgroundColor: ["rgba(255, 87, 87, 0.7)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

let makeDoughnutGraph = (data) => {
  document.getElementById("doughnut-stat").innerHTML = `>${Math.round(
    (data.salaryBasedData[0].count / data.summaryData.count) * 100
  )} of students placed with a package of 6LPA+`;

  const canvas = document.getElementById("doughnut");
  canvas.setAttribute("height", window.innerHeight * 0.2);
  canvas.setAttribute("width", window.innerWidth * 0.3);
  canvas.setAttribute("transform", "translate(100,100)");

  let visualData = [
    Math.round((data.salaryBasedData[0].count / data.summaryData.count) * 100),
    Math.round(
      100 - (data.salaryBasedData[0].count / data.summaryData.count) * 100
    ),
  ];
  console.log(visualData);

  let chart1 = new Chart(canvas.getContext("2d"), {
    type: "doughnut", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: [visualData[0] + "%", visualData[1] + "%"],
      datasets: [
        {
          label: "Percentage",
          data: visualData,
          //backgroundColor:'green',
          backgroundColor: ["rgba(255, 87, 87, 0.8)", "rgba(10,10,10,0.5)"],
          borderWidth: 1,
          borderColor: "rgba(255, 87, 87, 1)",
          hoverBorderWidth: 3,
        },
      ],
    },
  });
};

let makeAverageGraph = (data) => {
  const canvas = document.getElementById("average-graph");
  canvas.setAttribute("height", window.innerHeight * 0.4);
  canvas.setAttribute("width", window.innerWidth * 0.5);
  const myChart = new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: ["Overall Average", "Women Average", "Men Average"],
      datasets: [
        {
          label: "Salary (LPA)",
          data: [
            data.summaryData.avg,
            data.genderCategoryData[1].avg,
            data.genderCategoryData[0].avg,
          ],
          backgroundColor: ["rgba(255, 87, 87, 0.7)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

let makeGraphics = (data) => {
  makeSalaryBarGraph(data);
  makeDoughnutGraph(data);

  makeAverageGraph(data);

  document.querySelector(
    ".highest-salary"
  ).innerHTML = `<h1> Highest Package - ${data.summaryData.max} LPA </h1>`;
};

d3.csv("./data/placement-data.csv").then((data) => {
  //   cleanData => summaryData, genderCategoryData, salaryBasedData
  let cleanedData = cleanData(data);

  console.table(cleanedData.summaryData);
  console.table(cleanedData.genderCategoryData);
  console.table(cleanedData.salaryBasedData);

  makeGraphics(cleanedData);
});