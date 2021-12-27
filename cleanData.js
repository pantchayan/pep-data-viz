const cleanData = (data) => {
  let womenSalarySum = 0;
  let menSalarySum = 0;
  let missingCount = 0;
  let salaryBasedData = [
    { category: "6LPA+", count: 0 },
    { category: "6 - 10 LPA", count: 0 },
    { category: "10 - 20 LPA", count: 0 },
    { category: "20LPA+", count: 0 },
    { category: "<6LPA", count: 0 },
  ];

  let genderCategoryData = [
    {
      category: "Men",
      count: 0,
      avg: 0,
      max: 0,
      maxPersonName: "",
      maxCompany: "",
    },
    {
      category: "Women",
      count: 0,
      avg: 0,
      max: 0,
      maxPersonName: "",
      maxCompany: "",
    },
  ];

  let summaryData = {
    count: 0,
    avg: 0,
    max: 0,
    maxPersonName: "",
    maxCompany: "",
  };
  data.map((item) => {
    item.CTC = parseInt(item.CTC.split(" ")[0]);
    if (isNaN(item.CTC)) {
      missingCount++;
      return;
    }
    if (item.CTC >= 6) {
      if (item.CTC >= 6 && item.CTC < 10) {
        salaryBasedData[1].count++;
      } else if (item.CTC >= 10 && item.CTC < 20) {
        salaryBasedData[2].count++;
      } else if (item.CTC >= 20) {
        salaryBasedData[3].count++;
      }
      salaryBasedData[0].count++;
    } else {
      salaryBasedData[4].count++;
    }
    let lastChar = item.Name.split(" ")[0].toLowerCase().slice(-1);
    if (lastChar === "a" || lastChar === "i") {
      genderCategoryData[1].count++;

      if (item.CTC > genderCategoryData[1].max) {
        genderCategoryData[1].max = item.CTC;
        genderCategoryData[1].maxCompany = item.Company;
        genderCategoryData[1].maxPersonName = item.Name;
      }

      womenSalarySum += item.CTC;
    } else {
      genderCategoryData[0].count++;
      if (item.CTC > genderCategoryData[0].max) {
        genderCategoryData[0].max = item.CTC;
        genderCategoryData[0].maxCompany = item.Company;
        genderCategoryData[0].maxPersonName = item.Name;
      }
      menSalarySum += item.CTC;
    }
  });

  genderCategoryData[0].avg = Math.round(
    menSalarySum / genderCategoryData[0].count
  );
  genderCategoryData[1].avg = Math.round(
    womenSalarySum / genderCategoryData[1].count
  );

  summaryData.count = genderCategoryData[0].count + genderCategoryData[1].count;
  summaryData.avg = Math.round(
    (menSalarySum + womenSalarySum) / summaryData.count
  );

  if (genderCategoryData[0].max > genderCategoryData[1].max) {
    summaryData.max = genderCategoryData[0].max;
    summaryData.maxPersonName = genderCategoryData[0].maxPersonName;
    summaryData.maxCompany = genderCategoryData[0].maxCompany;
  } else {
    summaryData.max = genderCategoryData[1].max;
    summaryData.maxPersonName = genderCategoryData[1].maxPersonName;
    summaryData.maxCompany = genderCategoryData[1].maxCompany;
  }

  console.log("Missing Count (Salaries) : ", missingCount)
  return {summaryData, genderCategoryData, salaryBasedData}
};
