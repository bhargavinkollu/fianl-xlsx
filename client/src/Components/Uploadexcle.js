import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Row, Col, Table, DropdownButton, Dropdown } from "react-bootstrap";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";
export const Uploadexcle = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [objj, setObjj] = useState(null);

  // const [data, setData] = useState([]);
  const data = [
    {
      "S.No": "1",
      "SHG Name": " బాబా",
      "Slum Name": " మక్కరావుకాలని",
      "Ward No": " 4",
      "SLF Name": " 0",
      Muncipality: " ఏలేశ్వరం",
      "Bank Name": " యూనియన్ బ్యాంక్",
      "Account Number": " 328501010017590",
      "No.of Members": "12",
      "Opening Savings": "132360.00",
      "Current Year Savings": "13200.00",
      "Total Savings": "145560.00",
      "Opening Loans": "   0.00",
      "Current Year Sanctioned": "   0.00",
      "Current Year Recovery": "   0.00",
      "Total  Loan Outstanding": "0",
      "Opening Bank Loan": "109,684.00",
      "Current Year Sanctioned_1": "1,000,000.00",
      "C.Y Recovery": "207,995.00",
      "Total  Loan Outstanding_1": "901689.00",
      "Opening Loans_1": "   0.00",
      "Current Year Sanctioned_2": "   0.00",
      "Current Year Recovery_1": "   0.00",
      "Total  Loan Outstanding_2": "0",
      "Opening Loans_2": "   0.00",
      "Current Year Sanctioned_3": "   0.00",
      "Current Year Recovery_2": "   0.00",
      "Total  Loan Outstanding_3": "0",
      "Opening Loans_3": "   0.00",
      "Current Year Sanctioned_4": "   0.00",
      "Current Year Recovery_3": "   0.00",
      "Total  Loan Outstanding_4": "0",
      "Opening Loans_4": "   0.00",
      "Current Year Sanctioned_5": "   0.00",
      "Current Year Recovery_4": "   0.00",
      "Total  Loan Outstanding_5": "0",
      "Opening Loans_5": "109,684.00",
      "Current Year Sanctioned_6": "1,000,000.00",
      "Current Year Recovery_5": "220,136.00",
      "Total  Loan Outstanding_6": "889548.00",
      "Opening Loans_6": "   0.00",
      "Current Year Sanctioned_7": "   0.00",
      "Current Year Recovery_6": "   0.00",
      "Total  Loan Outstanding_7": "0",
      "Opening Loans_7": "   0.00",
      "Current Year Sanctioned_8": "   0.00",
      "Current Year Recovery_7": "   0.00",
      "Total  Loan Outstanding_8": "0",
      "Opening Bank Balances": "144,121.00",
      "Opening Cash Balance": "   0.00",
      "Closing Bank Balance": "174,271.00",
      "Closing Cash in Hand": "19,501.00",
      Grade: "A",
      "Total Funds Received": " -   ",
      "Total Funds Available": " 193,772.00 ",
      Variation: " 193,772.00 ",
      "Bank Linkage Variation": " -   ",
    },
    {
      "S.No": "2",
      "SHG Name": " సత్య",
      "Slum Name": " 0",
      "Ward No": " 0",
      "SLF Name": " 0",
      Muncipality: " ఏలేశ్వరం",
      "Bank Name": " యూనియన్ బ్యాంక్",
      "Account Number": " 065110011013751",
      "No.of Members": "10",
      "Opening Savings": "200000.00",
      "Current Year Savings": "10000.00",
      "Total Savings": "210000.00",
      "Opening Loans": "   0.00",
      "Current Year Sanctioned": "   0.00",
      "Current Year Recovery": "   0.00",
      "Total  Loan Outstanding": "0",
      "Opening Bank Loan": "929,028.00",
      "Current Year Sanctioned_1": "   0.00",
      "C.Y Recovery": "311,092.00",
      "Total  Loan Outstanding_1": "617936.00",
      "Opening Loans_1": "   0.00",
      "Current Year Sanctioned_2": "   0.00",
      "Current Year Recovery_1": "   0.00",
      "Total  Loan Outstanding_2": "0",
      "Opening Loans_2": "   0.00",
      "Current Year Sanctioned_3": "   0.00",
      "Current Year Recovery_2": "   0.00",
      "Total  Loan Outstanding_3": "0",
      "Opening Loans_3": "   0.00",
      "Current Year Sanctioned_4": "   0.00",
      "Current Year Recovery_3": "   0.00",
      "Total  Loan Outstanding_4": "0",
      "Opening Loans_4": "   0.00",
      "Current Year Sanctioned_5": "   0.00",
      "Current Year Recovery_4": "   0.00",
      "Total  Loan Outstanding_5": "0",
      "Opening Loans_5": "929,028.00",
      "Current Year Sanctioned_6": "   0.00",
      "Current Year Recovery_5": "210,392.00",
      "Total  Loan Outstanding_6": "718636.00",
      "Opening Loans_6": "   0.00",
      "Current Year Sanctioned_7": "   0.00",
      "Current Year Recovery_6": "   0.00",
      "Total  Loan Outstanding_7": "0",
      "Opening Loans_7": "   0.00",
      "Current Year Sanctioned_8": "   0.00",
      "Current Year Recovery_7": "   0.00",
      "Total  Loan Outstanding_8": "0",
      "Opening Bank Balances": "325,572.00",
      "Opening Cash Balance": "   0.00",
      "Closing Bank Balance": "244,832.00",
      "Closing Cash in Hand": "54,464.00",
      Grade: "A",
      "Total Funds Received": " -   ",
      "Total Funds Available": " 299,296.00 ",
      Variation: " 299,296.00 ",
      "Bank Linkage Variation": " -   ",
    },
    {
      "S.No": "3",
      "SHG Name": " శ్రీదుర్గ",
      "Slum Name": " 0",
      "Ward No": " 0",
      "SLF Name": " 0",
      Muncipality: " ఏలేశ్వరం",
      "Bank Name": " యూనియన్ బ్యాంక్",
      "Account Number": " 065113100017326",
      "No.of Members": "10",
      "Opening Savings": "148000.00",
      "Current Year Savings": "10800.00",
      "Total Savings": "158800.00",
      "Opening Loans": "   0.00",
      "Current Year Sanctioned": "   0.00",
      "Current Year Recovery": "   0.00",
      "Total  Loan Outstanding": "0",
      "Opening Bank Loan": "522,370.00",
      "Current Year Sanctioned_1": "   0.00",
      "C.Y Recovery": "310,914.00",
      "Total  Loan Outstanding_1": "211456.00",
      "Opening Loans_1": "   0.00",
      "Current Year Sanctioned_2": "   0.00",
      "Current Year Recovery_1": "   0.00",
      "Total  Loan Outstanding_2": "0",
      "Opening Loans_2": "   0.00",
      "Current Year Sanctioned_3": "   0.00",
      "Current Year Recovery_2": "   0.00",
      "Total  Loan Outstanding_3": "0",
      "Opening Loans_3": "   0.00",
      "Current Year Sanctioned_4": "   0.00",
      "Current Year Recovery_3": "   0.00",
      "Total  Loan Outstanding_4": "0",
      "Opening Loans_4": "   0.00",
      "Current Year Sanctioned_5": "   0.00",
      "Current Year Recovery_4": "   0.00",
      "Total  Loan Outstanding_5": "0",
      "Opening Loans_5": "523,000.00",
      "Current Year Sanctioned_6": "   0.00",
      "Current Year Recovery_5": "308,019.00",
      "Total  Loan Outstanding_6": "214981.00",
      "Opening Loans_6": "   0.00",
      "Current Year Sanctioned_7": "   0.00",
      "Current Year Recovery_6": "   0.00",
      "Total  Loan Outstanding_7": "0",
      "Opening Loans_7": "   0.00",
      "Current Year Sanctioned_8": "   0.00",
      "Current Year Recovery_7": "   0.00",
      "Total  Loan Outstanding_8": "0",
      "Opening Bank Balances": "165,721.00",
      "Opening Cash Balance": "   0.00",
      "Closing Bank Balance": "180,032.00",
      "Closing Cash in Hand": "24,749.00",
      Grade: "A",
      "Total Funds Received": " -   ",
      "Total Funds Available": " 204,781.00 ",
      Variation: " 204,781.00 ",
      "Bank Linkage Variation": " -   ",
    },
    {
      "S.No": "4",
      "SHG Name": " ఆంధ్రాలక్ష్మి",
      "Slum Name": " 0",
      "Ward No": " 0",
      "SLF Name": " 0",
      Muncipality: " ఏలేశ్వరం",
      "Bank Name": " యూనియన్ బ్యాంక్",
      "Account Number": " 065110011013073",
      "No.of Members": "10",
      "Opening Savings": "130000.00",
      "Current Year Savings": "12000.00",
      "Total Savings": "142000.00",
      "Opening Loans": "   0.00",
      "Current Year Sanctioned": "   0.00",
      "Current Year Recovery": "   0.00",
      "Total  Loan Outstanding": "0",
      "Opening Bank Loan": "596,573.00",
      "Current Year Sanctioned_1": "   0.00",
      "C.Y Recovery": "231,068.00",
      "Total  Loan Outstanding_1": "365505.00",
      "Opening Loans_1": "   0.00",
      "Current Year Sanctioned_2": "   0.00",
      "Current Year Recovery_1": "   0.00",
      "Total  Loan Outstanding_2": "0",
      "Opening Loans_2": "   0.00",
      "Current Year Sanctioned_3": "   0.00",
      "Current Year Recovery_2": "   0.00",
      "Total  Loan Outstanding_3": "0",
      "Opening Loans_3": "   0.00",
      "Current Year Sanctioned_4": "   0.00",
      "Current Year Recovery_3": "   0.00",
      "Total  Loan Outstanding_4": "0",
      "Opening Loans_4": "   0.00",
      "Current Year Sanctioned_5": "   0.00",
      "Current Year Recovery_4": "   0.00",
      "Total  Loan Outstanding_5": "0",
      "Opening Loans_5": "596,573.00",
      "Current Year Sanctioned_6": "   0.00",
      "Current Year Recovery_5": "161,103.00",
      "Total  Loan Outstanding_6": "435470.00",
      "Opening Loans_6": "   0.00",
      "Current Year Sanctioned_7": "   0.00",
      "Current Year Recovery_6": "   0.00",
      "Total  Loan Outstanding_7": "0",
      "Opening Loans_7": "   0.00",
      "Current Year Sanctioned_8": "   0.00",
      "Current Year Recovery_7": "   0.00",
      "Total  Loan Outstanding_8": "0",
      "Opening Bank Balances": "148,871.00",
      "Opening Cash Balance": "   0.00",
      "Closing Bank Balance": "94,068.00",
      "Closing Cash in Hand": "22,033.00",
      Grade: "A",
      "Total Funds Received": " -   ",
      "Total Funds Available": " 116,101.00 ",
      Variation: " 116,101.00 ",
      "Bank Linkage Variation": " -   ",
    },
    {
      "S.No": "5",
      "SHG Name": " వినీల",
      "Slum Name": " 0",
      "Ward No": " 0",
      "SLF Name": " 0",
      Muncipality: " ఏలేశ్వరం",
      "Bank Name": " యూనియన్ బ్యాంక్",
      "Account Number": " 328502010018777",
      "No.of Members": "10",
      "Opening Savings": "140000.00",
      "Current Year Savings": "12000.00",
      "Total Savings": "152000.00",
      "Opening Loans": "   0.00",
      "Current Year Sanctioned": "   0.00",
      "Current Year Recovery": "   0.00",
      "Total  Loan Outstanding": "0",
      "Opening Bank Loan": "   0.00",
      "Current Year Sanctioned_1": "1,000,000.00",
      "C.Y Recovery": "260,942.00",
      "Total  Loan Outstanding_1": "739058.00",
      "Opening Loans_1": "   0.00",
      "Current Year Sanctioned_2": "   0.00",
      "Current Year Recovery_1": "   0.00",
      "Total  Loan Outstanding_2": "0",
      "Opening Loans_2": "   0.00",
      "Current Year Sanctioned_3": "   0.00",
      "Current Year Recovery_2": "   0.00",
      "Total  Loan Outstanding_3": "0",
      "Opening Loans_3": "   0.00",
      "Current Year Sanctioned_4": "   0.00",
      "Current Year Recovery_3": "   0.00",
      "Total  Loan Outstanding_4": "0",
      "Opening Loans_4": "   0.00",
      "Current Year Sanctioned_5": "   0.00",
      "Current Year Recovery_4": "   0.00",
      "Total  Loan Outstanding_5": "0",
      "Opening Loans_5": "   0.00",
      "Current Year Sanctioned_6": "1,000,000.00",
      "Current Year Recovery_5": "262,734.00",
      "Total  Loan Outstanding_6": "737266.00",
      "Opening Loans_6": "   0.00",
      "Current Year Sanctioned_7": "   0.00",
      "Current Year Recovery_6": "   0.00",
      "Total  Loan Outstanding_7": "0",
      "Opening Loans_7": "   0.00",
      "Current Year Sanctioned_8": "   0.00",
      "Current Year Recovery_7": "   0.00",
      "Total  Loan Outstanding_8": "0",
      "Opening Bank Balances": "157,013.00",
      "Opening Cash Balance": "   0.00",
      "Closing Bank Balance": "179,586.00",
      "Closing Cash in Hand": "25,794.00",
      Grade: "A",
      "Total Funds Received": " -   ",
      "Total Funds Available": " 205,380.00 ",
      Variation: " 205,380.00 ",
      "Bank Linkage Variation": " -   ",
    },
  ];

  // const readfromexcel = (data1) => {
  //   const workbook = XLSX.readFile(data1);
  //   let sheetname = workbook.SheetNames;
  //   var mySheetData = sheetname.map(function (sheet) {
  //     const worksheet = workbook.Sheets[sheet];
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet, null, 1);
  //     return jsonData;
  //   });
  //   setData(mySheetData);
  //   setSheet(sheetname);
  // };
  // // console.log(data);
  // const handleFile = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   setFileName(file.name);
  //   setFile(file);
  //   //read file
  //   const data1 = await file.arrayBuffer();
  //   const wb = XLSX.read(data1);
  //   readfromexcel(data1);
  //   setObjj(wb.Sheets);
  // };
  const handle = () => {
    const kk = Object.keys(data[0]);
    console.log(kk);
    setObjj(kk);
  };
  return (
    <div>
      {/* <input
        title="selectFile"
        type="file"
        name="file"
        accept=".xlsx"
        required
        onChange={(e) => handleFile(e)}
      />
    */}
      <button onClick={handle}>dfsdfs</button>

      {objj !== null ? (
        <Table responsive>
          <thead className="border">
            <tr>
              {objj.map((item, inde) => {
                return <td>{item}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>

            {data.map((item, index) => {
              objj.map((itemo, indexo) => {
                console.log(item[itemo]);
         
                return (
                  <>
               
                
                  
                  <td>{item[itemo]}</td>
               
                
                </>
              );
            })
            })}
            </tr>

          </tbody>
        </Table>
      ) : (
        ""
      )}
    </div>
  );
};

{
  /* <Table  responsive>
        <thead>
          
          <tr >
      {data.map((item,inde)=>{
        const ky=Object.keys(item[inde])
        console.log(inde);
        return(
  

          Object.keys(item[inde]).map(function (element) {
            console.log(element);
            return (
               <th>{element}</th>
               
            )
              })
              
              )
              
            })}
            </tr>
        </thead>
   <tbody className='border'>
  {data.map((numList,index)=>{
  // console.log(numList);
  
  {numList.map((num,j)=>{
    // console.log("de,",num);
    return(
      <tr key={index}>
      <td key={j}>{num}</td>
      </tr>
    )
  })}
   
 
 })
}
</tbody>
 </Table>   */
}
