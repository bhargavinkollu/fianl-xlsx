import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Tabl } from "./Table";

export const Upload = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [sheet, setSheet] = useState(null);
  const [data, setData] = useState([]);

       const readfromexcel = (data1) => {
    const workbook = XLSX.readFile(data1);
    let sheetname = workbook.SheetNames;
    var mySheetData = sheetname.map(function (sheet) {
      const worksheet = workbook.Sheets[sheet];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, null, 1);
      return jsonData;
    });
    setData(mySheetData);
  };

    const handleFile = async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          setFileName(file.name);
          setFile(file);
          //read file
          const data1 = await file.arrayBuffer();
          const wb = XLSX.read(data1);
          readfromexcel(data1);
        //   setObjj(wb.Sheets);
        };
        console.log(data);
  return <div>
     <input
        title="selectFile"
        type="file"
        name="file"
        accept=".xlsx"
        required
        onChange={(e) => handleFile(e)}
      />
   {!data?(
<Tabl theadData={Object.keys(data[0])} tbodyData={data}/>

      ):("")}
  </div>;
};
