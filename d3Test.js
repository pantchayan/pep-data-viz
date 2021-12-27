let cleanedData;
const size = { height: window.innerHeight, width: window.innerWidth };
let fontSize = window.innerWidth < 600 ? 12 : 27;
window.addEventListener("resize", (e) => {
  size.height = window.innerHeight;
  size.width = window.innerWidth;
  if (window.innerWidth < 600) {
    fontSize = 12;
  }

  makeGraphics(cleanedData);
});

const svg = d3
  .select("main")
  .append("svg")
  .attr("height", size.height)
  .attr("width", size.width);
const salaryGraph = svg
  .append("g")
  .attr("height", size.height * 0.8)
  .attr("width", size.width * 0.3)
  .attr("transform", `translate(40, 70)`);

let categoryLabelsGroup = salaryGraph
  .append("g")
  .attr("class", "category-labels");

let countLabelsGroup = salaryGraph.append("g").attr("class", "count-labels");

let makeSalaryBarGraph = (salaryBasedData) => {
  let data = [
    salaryBasedData[1].count,
    salaryBasedData[2].count,
    salaryBasedData[3].count,
  ];

  // .attr("class", "salary-based, 1");

  const yScale = d3
    .scaleLinear()
    .range([0, salaryGraph.attr("height")])
    .domain([0, d3.max(data)]);

  console.log(data);

  let rects = salaryGraph.selectAll("rect").data(data);
  rects.exit().remove();
  rects
    .attr("height", (d, i) => {
      return yScale(d);
    })
    .attr("width", salaryGraph.attr("width") / 4)
    .attr("y", (d) => salaryGraph.attr("height") - yScale(d))
    .attr("x", (d, i) => i * (salaryGraph.attr("width") / 4 + 20))
    .attr("fill", "#ff5757");
  rects
    .enter()
    .append("rect")
    .attr("height", (d, i) => {
      return yScale(d);
    })
    .attr("width", salaryGraph.attr("width") / 4)
    .attr("y", (d) => salaryGraph.attr("height") - yScale(d))
    .attr("x", (d, i) => i * (salaryGraph.attr("width") / 4 + 20))
    .attr("fill", "#ff5757");

  let countLabels = countLabelsGroup.selectAll("text").data(data);
  countLabels.exit().remove();
  countLabels
    .text((d) => d)
    .attr("text-anchor", "middle")
    .attr("y", (d) => salaryGraph.attr("height") - yScale(d) - 10)
    .attr(
      "x",
      (d, i) =>
        i * (salaryGraph.attr("width") / 4 + 20) + salaryGraph.attr("width") / 8
    )
    .attr("font-weight", 700)
    .attr("font-size", fontSize);
  countLabels
    .enter()
    .append("text")
    .text((d) => d)
    .attr("text-anchor", "middle")
    .attr("y", (d) => salaryGraph.attr("height") - yScale(d) - 10)
    .attr(
      "x",
      (d, i) =>
        i * (salaryGraph.attr("width") / 4 + 20) + salaryGraph.attr("width") / 8
    )
    .attr("font-weight", 700)
    .attr("font-size", fontSize);
  let categoryLabels = categoryLabelsGroup.selectAll("text").data(data);
  let categoryNames = ["6-10 LPA", "10-20 LPA", "20+ LPA"];
  categoryLabels.exit().remove();
  categoryLabels
    .text((d, i) => categoryNames[i].split(" ")[0] + " LPA")
    .attr("text-anchor", "middle")
    .attr("y", (d) => parseInt(salaryGraph.attr("height")) + 30)
    .attr(
      "x",
      (d, i) =>
        i * (salaryGraph.attr("width") / 4 + 20) + salaryGraph.attr("width") / 8
    )
    .attr("font-weight", 700)
    .attr("font-size", fontSize);
  categoryLabels
    .enter()
    .append("text")
    .text((d, i) => categoryNames[i].split(" ")[0] + " LPA")
    .attr("text-anchor", "middle")
    .attr("y", (d) => parseInt(salaryGraph.attr("height")) + 30)
    .attr(
      "x",
      (d, i) =>
        i * (salaryGraph.attr("width") / 4 + 20) + salaryGraph.attr("width") / 8
    )
    .attr("font-weight", 700)
    .attr("font-size", fontSize);
};

let makeBgWheel = () => {
  let paths = bgWheel.selectAll("path").data(pie([1]));
  let bgWheel = svg.append("g").attr("class", "");

  paths
    .enter()
    .append("path")
    .attr("d", (d) => arc(d))
    .attr("fill", "#00b359")
    .attr("opacity", 0.3);
};

let makePieChart = (data) => {
  let visual = [data.summaryData.count, data.salaryBasedData[0].count];

  let pie = d3
    .pie()
    .sort(null)
    .value((d) => d);

  let arc = d3.arc().outerRadius(115).innerRadius(95).cornerRadius(20);

  makeBgWheel();
};

let makeGraphics = (data) => {
  makeSalaryBarGraph(data.salaryBasedData);
  makePieChart(data);
  // makeAverageSalaryBarGraph(data.genderCategoryData, data.summaryData);
};

d3.csv("./data/placement-data.csv").then((data) => {
  //   cleanData => summaryData, genderCategoryData, salaryBasedData
  cleanedData = cleanData(data);

  console.table(cleanedData.summaryData);
  console.table(cleanedData.genderCategoryData);
  console.table(cleanedData.salaryBasedData);

  makeGraphics(cleanedData);
});
