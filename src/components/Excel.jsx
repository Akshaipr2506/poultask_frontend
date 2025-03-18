import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const Excel = () => {
  const [data, setData] = useState([]); // Store parsed data
  const [headers, setHeaders] = useState([]); // Store column headers
  const [RetrivedData, setRetrivedData] = useState([]);
  console.log(RetrivedData);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Get first sheet
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log(jsonData);
      

      // Extract headers from first row
      const extractedHeaders = jsonData[0];
      setHeaders(extractedHeaders);

      // Extract data (excluding headers row)
      const extractedData = jsonData.slice(1);
      console.log(extractedData)
      setData(extractedData);
      sendDataToBackend(extractedData); // Send data to backend

    };
    const sendDataToBackend = async (data) => {
        try {
          const response = await axios.post("https://poultas-server-1.onrender.com/uploadData", { data });
          alert("Data uploaded successfully!");
          console.log("Backend Response:", response.data);
        } catch (error) {
          console.error("Error sending data:", error);
          alert("Failed to upload data.");
        }
      };
  };
  useEffect(() => {
    axios
      .get("https://poultas-server-1.onrender.com/combineData") // Update with your actual backend API endpoint
      .then((response) => {
        console.log(response.data.matchedData);
        
        setRetrivedData(response.data.matchedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <div>

      <div className="text-center mt-5 p-5 ">
        <h1>Material Data</h1>
        <input type="file" accept=".xlsx, .csv" onChange={handleFileUpload} />
      </div>
      
      
      {data.length > 0 && (
        <table className="table" border="1"  style={{ marginTop: "20px", width: "100%", textAlign: "left" }}>
          <thead className="table-dark">
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>{row[colIndex] || ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    <div>
      <h2 className="mt-5 ">Data List</h2>
      <table className="table table-bordered table-striped mt-3"  border="1">
        <thead>
          <tr>
           
            <th>Item Type</th>
            
            <th>Geometric Standard</th>
            <th>End Connection 1</th>
            <th>End Connection 2</th>
            <th>Material Description</th>
            <th>MDS</th>
            <th>Schedule</th>
            <th>Notes</th>
            <th>Type</th>
            <th>Header Size</th>
            <th>Branch Size</th>
          </tr>
        </thead>
        <tbody>
          {RetrivedData.map((item) => (
            <tr key={item._id}>
     
              <td>{item.ITEM_TYPE}</td>
            
              <td>{item.GEOMETRIC_STANDARD}</td>
              <td>{item.END_CONN1}</td>
              <td>{item.END_CONN2}</td>
              <td>{item.MATERIAL_DESCR}</td>
              <td>{item.MDS}</td>
              <td>{item.SCHD}</td>
              <td>{item.NOTES}</td>
              <td>{item.Type}</td>
              <td>{item.Headersize}</td>
              <td>{item.branchSize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Excel;