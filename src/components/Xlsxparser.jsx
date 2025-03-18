import axios from "axios";
import React from "react";
import * as XLSX from "xlsx";


const Xlsxparser = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // Assuming the first sheet contains the data
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON (array of objects)
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log(jsonData);

      if (jsonData.length < 2) {
        console.error("Invalid file format.");
        return;
      }

      // Extract headers (First row - Header Sizes)
      const headerSizes = jsonData[0].slice(1); // Remove first column (Branch Size title)
      console.log(headerSizes);
      
      // Convert rows to structured JSON
      const result = jsonData.slice(1).flatMap((row) => {
        const branchSize = row[0]; // First column value (Branch Size)
        return headerSizes.map((header, index) => ({
          "branchSize": branchSize,
          "headerSize": header,
          Type: row[index + 1] // Corresponding value from data
        }));
      });

      console.log("Converted JSON Data:", result);
      const dataArray=result
      axios
      .post("https://poultas-server-1.onrender.com/saveData", dataArray)
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error saving data:", error));
    };
  };

  return (
    <div className="text-center mt-5">
      <h2>Branch table data</h2>
      <input type="file" className="btn" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  );
};

export default Xlsxparser;