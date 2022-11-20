import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import Select from "react-select";
import "./BankForm.css";
import {
  clearErrors,
  loaduser,
  logout,
  updateprofile,
  uploadform,
} from "../action/useraction";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useAlert } from "react-alert";
import { LOader } from "./LOader";

export const BankForm = () => {
  const [formdata, setFormdata] = useState([{}]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { user, isAuthenticated, error, isUpdated, loading } = useSelector(
    (state) => state.user
  );
  if (user === null) {
    navigate("/employeelogin");
  }
  // console.log(isAuthenticated);

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {

      setBankdetail({
        sghid: "",
        bank_name: "",
        acc_number: "",
        "Slum Id": "",
        "Name of the District": "",
        "ward Name": "",
        "SHG Name": "",
        "Name of the ULB": "",
        "TLF NAME": "",
        "SLF NAME": "",
        "SGH ID": "",
      });
      setsghid("");
      setSaving({
        opening_savings: "0",
        current_year_savings: "0",
        total_savings: "0",
      });
      setSlfloan({
        opening_loans: "0",
        current_year_sanctioned: "0",
        current_year_recovery: "0",
        total_loan_outstanding: "0",
      });
      setBankloan({
        bank_opening_bank_loan: "0",
        bank_current_year_sanctioned: "0",
        bank_current_year_recovery: "0",
        bank_total_loan_outstanding: "0",
      });
      setSrinidhiLoan({
        srinidhi_opening_loan: "0",
        srinidhi_current_year_sanctioned: "0",
        srinidhi_current_year_recovery: "0",
        srinidhi_total_loan_outstanding: "0",
      });
      setCovidloan({
        covid_opening_loan: "0",
        covid_current_year_sanctioned: "0",
        covid_current_year_recovery: "0",
        covid_total_loan_outstanding: "0",
      });
      setInternalMemberLoan({
        iml_opening_loan: "0",
        iml_current_year_sanctioned: "0",
        iml_current_year_recovery: "0",
        iml_total_loan_outstanding: "0",
      });
      setSlfMemberLoan({
        slfm_opening_loan: "0",
        slfm_current_year_sanctioned: "0",
        slfm_current_year_recovery: "0",
        slfm_total_loan_outstanding: "0",
      });
      setBankLinkageMemberLoan({
        blml_opening_loan: "0",
        blml_current_year_sanctioned: "0",
        blml_current_year_recovery: "0",
        blml_total_loan_outstanding: "0",
      });
      setSrinidhiMemberLoan({
        srim_opening_loan: "0",
        srim_current_year_sanctioned: "0",
        srim_current_year_recovery: "0",
        srim_total_loan_outstanding: "0",
      });
      setCovidMemberLoans({
        cml_opening_loan: "0",
        cml_current_year_sanctioned: "0",
        cml_current_year_recovery: "0",
        cml_total_loan_outstanding: "0",
      });
      setOpeningBankBalance({
        opening_bank_balance: "0",
        opening_cash: "0",
        closing_bank_balance: "0",
        closing_cash: "0",
        surplus: "0",
      });
      setGrade("A");
    }
  }, [error, isUpdated, dispatch]);
  useEffect(() => {
  if(isUpdated){
    alert.success(isUpdated.message);
    dispatch(clearErrors());  
  }
  }, [isUpdated]);
  
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);
  const [checked10, setChecked10] = useState(false);
  const [SHGID, setsghid] = useState("");
  const [cpbnkln,setcpbnkln] = useState(false);
  const [cpslfln, setcpslfln] = useState(false);
  const [cpsndhln, setcpsndhln] = useState(false);
  const [cpcvdln, setcpcvdln] = useState(false);

  const [bankdetail, setBankdetail] = useState({
    bank_name: "",
    acc_number: "",
  });
  const [year, setYear] = useState();

  const [saving, setSaving] = useState({
    opening_savings: "0",
    current_year_savings: "0",
    total_savings: "0",
  });
  const [slfloan, setSlfloan] = useState({
    opening_loans: "0",
    current_year_sanctioned: "0",
    current_year_recovery: "0",
    total_loan_outstanding: "0",
  });
  const [bankloan, setBankloan] = useState({
    bank_opening_bank_loan: "0",
    bank_current_year_sanctioned: "0",
    bank_current_year_recovery: "0",
    bank_total_loan_outstanding: "0",
  });
  const [srinidhiLoan, setSrinidhiLoan] = useState({
    srinidhi_opening_loan: "0",
    srinidhi_current_year_sanctioned: "0",
    srinidhi_current_year_recovery: "0",
    srinidhi_total_loan_outstanding: "0",
  });
  const [covidloan, setCovidloan] = useState({
    covid_opening_loan: "0",
    covid_current_year_sanctioned: "0",
    covid_current_year_recovery: "0",
    covid_total_loan_outstanding: "0",
  });
  const [internalMemberLoan, setInternalMemberLoan] = useState({
    iml_opening_loan: "0",
    iml_current_year_sanctioned: "0",
    iml_current_year_recovery: "0",
    iml_total_loan_outstanding: "0",
  });
  const [slfMemberLoan, setSlfMemberLoan] = useState({
    slfm_opening_loan: "0",
    slfm_current_year_sanctioned: "0",
    slfm_current_year_recovery: "0",
    slfm_total_loan_outstanding: "0",
  });
  const [bankLinkageMemberLoan, setBankLinkageMemberLoan] = useState({
    blml_opening_loan: "0",
    blml_current_year_sanctioned: "0",
    blml_current_year_recovery: "0",
    blml_total_loan_outstanding: "0",
  });
  const [srinidhiMemberLoan, setSrinidhiMemberLoan] = useState({
    srim_opening_loan: "0",
    srim_current_year_sanctioned: "0",
    srim_current_year_recovery: "0",
    srim_total_loan_outstanding: "0",
  });
  const [covidMemberLoans, setCovidMemberLoans] = useState({
    cml_opening_loan: "0",
    cml_current_year_sanctioned: "0",
    cml_current_year_recovery: "0",
    cml_total_loan_outstanding: "0",
  });
  const [openingBankBalance, setOpeningBankBalance] = useState({
    opening_bank_balance: "0",
    opening_cash: "0",
    closing_bank_balance: "0",
    closing_cash: "0",
    surplus: "0",
  });
  const [Grade, setGrade] = useState();

  let accnu = bankdetail.acc_number;
  let bank_name = bankdetail.bank_name;
  let Slum_Id = bankdetail["Slum Id"];
  let Name_of_the_District = bankdetail["Name of the District"];
  let ward_Name = bankdetail["ward Name"];
  let Name_of_ulb = bankdetail["Name of the ULB"];
  let SHG_Name = bankdetail["SHG Name"];
  let TLF_NAME = bankdetail["TLF NAME"];
  let SHG_ID = bankdetail["SHG ID"];
  let SLF_NAME = bankdetail["SLF NAME"];
  let opening_savings = saving.opening_savings;
  let current_year_savings = saving.current_year_savings;
  let total_savings = saving.total_savings;
  let opening_loans = slfloan.opening_loans;
  let current_year_sanctioned = slfloan.current_year_sanctioned;
  let current_year_recovery = slfloan.current_year_recovery;
  let total_loan_outstanding = slfloan.total_loan_outstanding;
  let bank_opening_bank_loan = bankloan.bank_opening_bank_loan;
  let bank_current_year_sanctioned = bankloan.bank_current_year_sanctioned;
  let bank_current_year_recovery = bankloan.bank_current_year_recovery;
  let bank_total_loan_outstanding = bankloan.bank_total_loan_outstanding;
  let srinidhi_opening_loan = srinidhiLoan.srinidhi_opening_loan;
  let srinidhi_current_year_sanctioned =
    srinidhiLoan.srinidhi_current_year_sanctioned;
  let srinidhi_current_year_recovery =
    srinidhiLoan.srinidhi_current_year_recovery;
  let srinidhi_total_loan_outstanding =
    srinidhiLoan.srinidhi_total_loan_outstanding;
  let covid_opening_loan = covidloan.covid_opening_loan;
  let covid_current_year_sanctioned = covidloan.covid_current_year_sanctioned;
  let covid_current_year_recovery = covidloan.covid_current_year_recovery;
  let covid_total_loan_outstanding = covidloan.covid_total_loan_outstanding;
  let iml_opening_loan = internalMemberLoan.iml_opening_loan;
  let iml_current_year_sanctioned =
    internalMemberLoan.iml_current_year_sanctioned;
  let iml_current_year_recovery = internalMemberLoan.iml_current_year_recovery;
  let iml_total_loan_outstanding =
    parseInt(internalMemberLoan.iml_opening_loan) +
    parseInt(
      parseInt(internalMemberLoan.iml_current_year_sanctioned) -
        parseInt(internalMemberLoan.iml_current_year_recovery)
    );
  let slfm_opening_loan = slfMemberLoan.slfm_opening_loan;
  let slfm_current_year_sanctioned = slfMemberLoan.slfm_current_year_sanctioned;
  let slfm_current_year_recovery = slfMemberLoan.slfm_current_year_recovery;
  let slfm_total_loan_outstanding = slfMemberLoan.slfm_total_loan_outstanding;
  let blml_opening_loan = bankLinkageMemberLoan.blml_opening_loan;
  let blml_current_year_sanctioned =
    bankLinkageMemberLoan.blml_current_year_sanctioned;
  let blml_current_year_recovery =
    bankLinkageMemberLoan.blml_current_year_recovery;
  let blml_total_loan_outstanding =
    bankLinkageMemberLoan.blml_total_loan_outstanding;
  let srim_opening_loan = srinidhiMemberLoan.srim_opening_loan;
  let srim_current_year_sanctioned =
    srinidhiMemberLoan.srim_current_year_sanctioned;
  let srim_current_year_recovery =
    srinidhiMemberLoan.srim_current_year_recovery;
  let srim_total_loan_outstanding =
    srinidhiMemberLoan.srim_total_loan_outstanding;
  let cml_opening_loan = covidMemberLoans.cml_opening_loan;
  let cml_current_year_sanctioned =
    covidMemberLoans.cml_current_year_sanctioned;
  let cml_current_year_recovery = covidMemberLoans.cml_current_year_recovery;
  let cml_total_loan_outstanding = covidMemberLoans.cml_total_loan_outstanding;
  let opening_bank_balance = openingBankBalance.opening_bank_balance;
  let opening_cash = openingBankBalance.opening_cash;
  let closing_bank_balance = openingBankBalance.closing_bank_balance;
  let closing_cash = openingBankBalance.closing_cash;
  let surplus = openingBankBalance.surplus;
  let Total_fund_Recived =
    parseInt(
      parseInt(saving.opening_savings) + parseInt(saving.current_year_savings)
    ) + parseInt(surplus);
  let total_fund_Available =
    parseInt(openingBankBalance.closing_bank_balance) +
    parseInt(openingBankBalance.closing_cash) +
    parseInt(iml_total_loan_outstanding);
  let variation = total_fund_Available - Total_fund_Recived;
  // console.log(openingBankBalance.closing_bank_balance);
  // console.log(openingBankBalance.closing_cash);
  // console.log(internalMemberLoan);

  let Total_Bank_Loan_Outstanding =
    parseInt(bankloan.bank_opening_bank_loan) +
    parseInt(
      parseInt(bankloan.bank_current_year_sanctioned) -
        parseInt(bankloan.bank_current_year_recovery)
    );
  let Total_Bank_Member_Loan_Outstanding =
    parseInt(bankLinkageMemberLoan.blml_opening_loan) +
    parseInt(
      parseInt(bankLinkageMemberLoan.blml_current_year_sanctioned) -
        parseInt(bankLinkageMemberLoan.blml_current_year_recovery)
    );
  let bank_linkage_variation =
    Total_Bank_Loan_Outstanding - Total_Bank_Member_Loan_Outstanding;
  // console.log(Total_Bank_Loan_Outstanding, Total_Bank_Member_Loan_Outstanding);
  // const inputsgh=(e)=>{setSHGID(e.target.value);searchSHG()}
  const inputA = (e) => {
    setBankdetail({ ...bankdetail, [e.target.name]: e.target.value });
  };
  const inputB = (e) => {
    setSaving({ ...saving, [e.target.name]: e.target.value });
    
  };
  const inputB_b = (e) => {
    setSlfloan({ ...slfloan, [e.target.name]: e.target.value });
    //setSlfMemberLoan({ ...slfMemberLoan, [e.target.name]: e.target.value });
  };
  const inputC = (e) => {
    setBankloan({ ...bankloan, [e.target.name]: e.target.value });
    // console.log(bankloan);
    
  };
  const inputC_c = (e) => {
    setSrinidhiLoan({ ...srinidhiLoan, [e.target.name]: e.target.value });
    
  };
  const inputD = (e) => {
    setCovidloan({ ...covidloan, [e.target.name]: e.target.value });
    
  };
  const inputD_d = (e) => {
    setInternalMemberLoan({
      ...internalMemberLoan,
      [e.target.name]: e.target.value,
    });
  };
  const inputE = (e) => {
    setSlfMemberLoan({ ...slfMemberLoan, [e.target.name]: e.target.value });
  };
  const inputE_e = (e) => {
    setBankLinkageMemberLoan({
      ...bankLinkageMemberLoan,
      [e.target.name]: e.target.value,
    });
  };
  // console.log();
  // console.log();
  const inputF = (e) => {
    setSrinidhiMemberLoan({
      ...srinidhiMemberLoan,
      [e.target.name]: e.target.value,
    });
  };
  const inputF_f = (e) => {
    setCovidMemberLoans({
      ...covidMemberLoans,
      [e.target.name]: e.target.value,
    });
  };
  const inputG = (e) => {
    setOpeningBankBalance({
      ...openingBankBalance,
      [e.target.name]: e.target.value,
    });
  };
  const bnkln = () => {
    let bankloan = document.getElementById("bnkln");
    if( bankloan.checked === true){
      setBankLinkageMemberLoan({
        blml_opening_loan: bank_opening_bank_loan,
        blml_current_year_sanctioned: bank_current_year_sanctioned,
        blml_current_year_recovery: bank_current_year_recovery,
      });
    }

  };
  const slfln = () => {
    let slfln = document.getElementById("slfln");
    if( slfln.checked === true){
      setSlfMemberLoan({
        slfm_opening_loan: slfloan.opening_loans,
        slfm_current_year_sanctioned: slfloan.current_year_sanctioned,
        slfm_current_year_recovery: slfloan.current_year_recovery,
      });
    }

  };
  const sndhln = () => {
    let sndhln = document.getElementById("sndhln");
    if( sndhln.checked === true){
      setSrinidhiMemberLoan({
        srim_opening_loan: srinidhiLoan.srinidhi_opening_loan,
        srim_current_year_sanctioned: srinidhiLoan.srinidhi_current_year_sanctioned,
        srim_current_year_recovery: srinidhiLoan.srinidhi_current_year_recovery,
      });
    }

  };
  const cvdln = () => {
    let covidln = document.getElementById("cvdln");
    if( covidln.checked === true){
      setCovidMemberLoans({
        cml_opening_loan: covidloan.covid_opening_loan,
        cml_current_year_sanctioned: covidloan.covid_current_year_sanctioned,
        cml_current_year_recovery: covidloan.covid_current_year_recovery,
      });
    }

  };
  // console.log(Grade);
  // console.log(variation);
  const searchSHG = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/finddata", {
      "SHG Id": SHGID,
    });
    // console.log(res.data);
    setBankdetail({
      ...bankdetail,
      SHGID: res.data[SHGID],
      bank_name: res.data["Bank Name"],
      acc_number: res.data["Account Number"],
      "Slum Id": res.data["Slum Id"],
      "Name of the District": res.data["District"],
      "ward Name": res.data["Ward Name"],
      "SHG Name": res.data["SHG Name"],
      "Name of the ULB": res.data["ULB Name"],
      "TLF NAME": res.data["TLF Name"],
      "SLF NAME": res.data["SLF Name"],
      "SH ID": res.data["SHG ID"],
    });
  };
  const total_loan_outstanding_changes = () => {
    bankloan.bank_total_loan_outstanding =
      bankloan.bank_total_loan_outstanding =
        parseInt(bankloan.bank_opening_bank_loan) +
        parseInt(
          parseInt(bankloan.bank_current_year_sanctioned) -
            parseInt(bankloan.bank_current_year_recovery)
        );
    return bankloan.bank_total_loan_outstanding;
  };
  const blml_total_loan_outstandin = () => {
    bankLinkageMemberLoan.blml_total_loan_outstanding =
      parseInt(bankLinkageMemberLoan.blml_opening_loan) +
      parseInt(
        parseInt(bankLinkageMemberLoan.blml_current_year_sanctioned) -
          parseInt(bankLinkageMemberLoan.blml_current_year_recovery)
      );
  };

  const form_submit = (e) => {
    e.preventDefault();
    
    setBankdetail(bankdetail);
    setSaving(
      saving,
      (saving.total_savings =
        parseInt(saving.opening_savings) +
        parseInt(saving.current_year_savings))
    );
    
  console.log("total_savings",saving.total_savings
  ,saving);
    
    setSlfloan(
      slfloan,
      (slfloan.total_loan_outstanding =
        parseInt(slfloan.opening_loans) +
        parseInt(
          parseInt(
            parseInt(slfloan.current_year_sanctioned) -
              parseInt(slfloan.current_year_recovery)
          )
        ))
    );

    setSrinidhiLoan(
      srinidhiLoan,
      (srinidhiLoan.srinidhi_total_loan_outstanding =
        parseInt(srinidhiLoan.srinidhi_opening_loan) +
        parseInt(
          parseInt(srinidhiLoan.srinidhi_current_year_sanctioned) -
            parseInt(srinidhiLoan.srinidhi_current_year_recovery)
        ))
    );
    setCovidloan(
      covidloan,
      (covidloan.covid_total_loan_outstanding =
        parseInt(covidloan.covid_opening_loan) +
        parseInt(
          parseInt(covidloan.covid_current_year_sanctioned) -
            parseInt(covidloan.covid_current_year_recovery)
        ))
    );
    setInternalMemberLoan(
      internalMemberLoan,
      (internalMemberLoan.iml_total_loan_outstanding =
        parseInt(internalMemberLoan.iml_opening_loan) +
        parseInt(
          parseInt(internalMemberLoan.iml_current_year_sanctioned) -
            parseInt(internalMemberLoan.iml_current_year_recovery)
        ))
    );
    setSlfMemberLoan(
      slfMemberLoan,
      (slfMemberLoan.slfm_total_loan_outstanding =
        parseInt(slfMemberLoan.slfm_opening_loan) +
        parseInt(
          parseInt(slfMemberLoan.slfm_current_year_sanctioned) -
            parseInt(slfMemberLoan.slfm_current_year_recovery)
        ))
    );
    setBankLinkageMemberLoan(
      bankLinkageMemberLoan,
      (bankLinkageMemberLoan.blml_total_loan_outstanding =
        parseInt(bankLinkageMemberLoan.blml_opening_loan) +
        parseInt(
          parseInt(bankLinkageMemberLoan.blml_current_year_sanctioned) -
            parseInt(bankLinkageMemberLoan.blml_current_year_recovery)
        ))
    );
    setSrinidhiMemberLoan(
      srinidhiMemberLoan,
      (srinidhiMemberLoan.srim_total_loan_outstanding =
        parseInt(srinidhiMemberLoan.srim_opening_loan) +
        parseInt(
          parseInt(srinidhiMemberLoan.srim_current_year_sanctioned) -
            parseInt(srinidhiMemberLoan.srim_current_year_recovery)
        ))
    );
    setCovidMemberLoans(
      covidMemberLoans,
      (covidMemberLoans.cml_total_loan_outstanding =
        parseInt(covidMemberLoans.cml_opening_loan) +
        parseInt(
          parseInt(covidMemberLoans.cml_current_year_sanctioned) -
            parseInt(covidMemberLoans.cml_current_year_recovery)
        ))
    );
    setOpeningBankBalance(openingBankBalance);
    console.log(saving.total_savings);
    dispatch(
      updateprofile([
        {
          SHGID,
          "Account Number": accnu,
          "Bank Name": bank_name,
          "Opening Savings": opening_savings,
          "Current Year Savings": current_year_savings,
          "Total Savings": saving.total_savings,
          year: year,
          "Opening Loans": opening_loans,
          "Slum Id": Slum_Id,
          "TLF Name": TLF_NAME,
          "SLF Name": SLF_NAME,
          "SHG Id": SHG_ID,
          "SHG Name": SHG_Name,
          "ULB Name": Name_of_ulb,
          District: Name_of_the_District,
          "ward Name": ward_Name,
          "Total fund Recived": Total_fund_Recived,
          Variation: variation,
          "Bank Linkage variation": bank_linkage_variation,
          "Current Year Sanctioned": current_year_sanctioned,
          "Current Year Recovery": current_year_recovery,
          "Total Loan Outstanding": slfloan.total_loan_outstanding,
          "Bank Opening Bank Loan": bank_opening_bank_loan,
          "Bank Current Year Sanctioned": bank_current_year_sanctioned,
          "bank Current Year Recovery": bank_current_year_recovery,
          "Bank Total Loan Outstanding": bank_total_loan_outstanding,
          "Srinidhi Opening Loan": srinidhi_opening_loan,
          "Srinidhi Current Year Sanctioned": srinidhi_current_year_sanctioned,
          "Srinidhi Current Year ecovery": srinidhi_current_year_recovery,
          "Srinidhi Total Loan Outstanding": srinidhiLoan.srinidhi_total_loan_outstanding,
          "Covid Opening Loan": covid_opening_loan,
          "Covid Current Year Sanctioned": covid_current_year_sanctioned,
          "Covid Current Year Recovery": covid_current_year_recovery,
          "Covid Total Loan Outstanding": covidloan.covid_total_loan_outstanding,
          "Iml Opening Loan": iml_opening_loan,
          "Iml Current Year Sanctioned": iml_current_year_sanctioned,
          "Iml Current Year Recovery": iml_current_year_recovery,
          "Iml Total Loan Outstanding": internalMemberLoan.iml_total_loan_outstanding,
          "Slfm Opening Loan": slfm_opening_loan,
          "Slfm Current Year Sanctioned": slfm_current_year_sanctioned,
          "Slfm Current Year Recovery": slfm_current_year_recovery,
          "Slfm Total Loan Outstanding": slfMemberLoan.slfm_total_loan_outstanding,
          "Blml Opening Loan": blml_opening_loan,
          "Blml Current Year Sanctioned": blml_current_year_sanctioned,
          "Blml Current Year Recovery": blml_current_year_recovery,
          "Blml Total Loan Outstanding": bankLinkageMemberLoan.blml_total_loan_outstanding,
          "Srim Opening Loan": srim_opening_loan,
          "Srim Current Year Sanctioned": srim_current_year_sanctioned,
          "Srim Current Year Recovery": srim_current_year_recovery,
          "Srim Total Loan Outstanding": srinidhiMemberLoan.srim_total_loan_outstanding,
          "Cml Opening Loan": cml_opening_loan,
          "Cml Current Year Sanctioned": cml_current_year_sanctioned,
          "Cml Current Year Recovery": cml_current_year_recovery,
          "Cml Total Loan Outstanding": covidMemberLoans.cml_total_loan_outstanding,
          "Opening Bank Balance": opening_bank_balance,
          "Opening Cash": opening_cash,
          "Closing Bank Balance": closing_bank_balance,
          "Closing Cash": closing_cash,
          Surplus: surplus,
          Grade,
        },
      ])
    );
    
    setcpbnkln(false);
    setcpslfln(false);
    setcpsndhln(false);
    setcpcvdln(false);
    
  };

  // console.log(bankloan.bank_total_loan_outstanding);
  const uppercaseWords = (str) =>
    str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
  const logoutUser = () => {
    dispatch(logout());
    navigate("/employeelogin");
  };
  useEffect(() => {
    if (variation >= -10000) {
      setGrade("A");
      // console.log(Grade);
    } else if (variation >= -20000 && variation < -10000) {
      setGrade("B");
      // console.log(Grade);
    } else if ((variation >= -30000) & (variation < -20000)) {
      setGrade("C");
      // console.log(Grade);
    } else if (variation < -30000) {
      setGrade("D");
      // console.log(Grade);
    }
  }, [variation]);
  return (
    <>
      <div className="bankformtop">
        <div className="bankformboarder">
          {loading ? (
            <LOader />
          ) : (
            <>
              <div style={{ right: "40px" }} className="headertop">
            {user && user.role==="admin"?(<Link to="/">
            <button className="btn btn-primary" style={{position:"absolute",top:"10%",left:"10%"}}>Back</button>
            </Link>):("")}
                {" "}
                <span className="home_btn">
                  {isAuthenticated === true ? (
                    <>
                      <div>
                        <ul className="navbar-nav top-btn ml-auto flex-row">
                          <button style={{}} className="user_btn btn">
                            {uppercaseWords(user.email)}
                          </button>

                          <a>
                            <button onClick={logoutUser} className="btn btn-2">
                              Logout
                            </button>{" "}
                          </a>
                        </ul>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </div>

              <div className="container">
                <form onSubmit={searchSHG} className="flexsearchX ">
                  <p>SHG ID </p>

                  <input
                    required
                    type="text"
                    onChange={(e) => {
                      setsghid(e.target.value);
                    }}
                    value={SHGID}
                    placeholder="search by SHG ID"
                    name="search"
                  />
                  <button className="btn btn-primary" style={{marginLeft:"2%"}}onClick={searchSHG}>
                    Search{" "}
                  </button>
                  
                  <select className="year"
                          required
                          onChange={(e) => {
                            setYear(e.target.value);
                          }}
                        >
                          <option selected disabled>
                            year
                          </option>
                            
                    <option value="2020-21">2020-21</option>
                    <option value="2021-22">2021-22</option>
                    <option value="2022-23">2022-23</option>
                    <option value="2023-24">2023-24</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                    <option value="2026-27">2026-27</option>
                    <option value="2027-28">2027-28</option>
                    <option value="2028-29">2028-29</option>
                    <option value="2029-30">2029-30</option>
                    <option value="2030-31">2030-31</option>
                        </select>
                </form>
                <form
                  action=""
                  encType="multipart/form-data"
                  onSubmit={form_submit}
                >
                  <div className="sectionA">
                    <label>SHG Name: {bankdetail["SHG Name"]}</label>
                    <div className="flexAX">
                      <div className="flexBXf">
                        <h4>Bank Details</h4>
                        <div className="flexTopX ">
                          <div className="flexC givmargin givpad">
                            <p>Bank name</p>
                            <input required
                              type="text"
                              name="bank_name"
                              onChange={inputA}
                              value={bankdetail.bank_name}
                              readOnly
                            />
                          </div>
                          <div className="flexC givmargin givpadd">
                            <p>Account Number</p>
                            <input required
                              readOnly
                              type="text"
                              name="acc_number"
                              onChange={inputA}
                              value={bankdetail.acc_number}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////              */}
                  {/* sectionB */}
                  <div className="sectionB">
                    <div className="flexAX">
                      <div className="flexBX">
                        <div className="flexT">
                          <h4>Saving</h4>
                        </div>
                        <div className="flexC">
                          <p>Opening Savings</p>
                          <input
                            required
                            type="text"
                            name="opening_savings"
                            value={saving.opening_savings}
                            onChange={inputB}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Savings</p>
                          <input
                            required
                            type="text"
                            name="current_year_savings"
                            value={saving.current_year_savings}
                            onChange={inputB}
                          />
                        </div>
                        <div className="flexC">
                          <p>Total Savings</p>
                          <input
                            required
                            type="number"
                            name="total_savings"
                            onChange={inputB}
                            value={
                              parseInt(saving.opening_savings) +
                              parseInt(saving.current_year_savings)
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flexBaX">
                        <div className="flexT">
                          <h4>Internal Member Loan</h4>
                        </div>
                        <div className="flexC">
                          <p>Opening Loan </p>
                          <input
                            required
                            type="number"
                            name="iml_opening_loan"
                            onChange={inputD_d}
                            value={internalMemberLoan.iml_opening_loan}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Sanctioned</p>
                          <input
                            required
                            type="number"
                            name="iml_current_year_sanctioned"
                            onChange={inputD_d}
                            value={
                              internalMemberLoan.iml_current_year_sanctioned
                            }
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Recovery</p>
                          <input
                            required
                            type="number"
                            name="iml_current_year_recovery"
                            onChange={inputD_d}
                            value={internalMemberLoan.iml_current_year_recovery}
                          />
                        </div>
                        <div className="flexC">
                          <p>Total Loan Outstanding</p>
                          <input
                            required
                            type="number"
                            name="iml_total_loan_outstanding"
                            readOnly
                            value={iml_total_loan_outstanding}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ..............................................................................................................................             */}
                  {/* SectionC */}

                  <div className="sectionC">
                    <div className="flexAX">
                      <div className="flexBX">
                        <div className="flexT">
                          <h4>Bank Loans</h4>
                        </div>

                        <div className="flexC">
                          <p>Opening Bank Loan</p>
                          <input
                            required
                            type="number"
                            name="bank_opening_bank_loan"
                            onChange={inputC}
                            value={bankloan.bank_opening_bank_loan}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Sanctioned</p>
                          <input
                            required
                            type="number"
                            name="bank_current_year_sanctioned"
                            onChange={inputC}
                            value={bankloan.bank_current_year_sanctioned}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Recovery</p>
                          <input
                            required
                            type="number"
                            name="bank_current_year_recovery"
                            onChange={inputC}
                            value={bankloan.bank_current_year_recovery}
                          />
                        </div>
                        <div className="flexC">
                          <p>Total Loan Outstanding</p>
                          <input
                            required
                            type="number"
                            name="bank_total_loan_outstanding"
                            // onChange={()=>{}}
                            value={total_loan_outstanding_changes()}
                            readOnly
                          />
                        </div>
                      </div>
                      {/* ..................................................................... */}
                      <div className="flexBaX">
                        <div className="flexT">
                          <h4>Bank Linkage Member Loans</h4>
                          <div className="flexD">
                            <input 
                              type="checkbox"
                              name="copy"
                              id="bnkln"
                              onClick={bnkln}
                              checked={cpbnkln}
                              onChange={(e) => setcpbnkln(e.target.checked)}
                            />
                            <p>Copy</p>
                          </div>
                        </div>
                        <div className="flexC">
                          <p>Opening Loan </p>
                          <input
                            required
                            type="number"
                            name="blml_opening_loan"
                            onChange={inputE_e}
                            value={bankLinkageMemberLoan.blml_opening_loan}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Sanctioned</p>
                          <input
                            required
                            type="number"
                            name="blml_current_year_sanctioned"
                            onChange={inputE_e}
                            value={
                              bankLinkageMemberLoan.blml_current_year_sanctioned
                            }
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Recovery</p>
                          <input
                            required
                            type="number"
                            name="blml_current_year_recovery"
                            onChange={inputE_e}
                            value={
                              bankLinkageMemberLoan.blml_current_year_recovery
                            }
                          />
                        </div>
                        <div className="flexC">
                          <p>Total Loan Outstanding</p>
                          <input
                            required
                            type="number"
                            name="blml_total_loan_outstanding"
                            readOnly
                            onChangeCapture={() => {
                              // console.log(bankloan);
                            }}
                            value={
                              parseInt(
                                bankLinkageMemberLoan.blml_opening_loan
                              ) +
                              parseInt(
                                parseInt(
                                  bankLinkageMemberLoan.blml_current_year_sanctioned
                                ) -
                                  parseInt(
                                    bankLinkageMemberLoan.blml_current_year_recovery
                                  )
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         */}
                  {/* sectionD */}
                  <div className="sectionD">
                    <div className="flexAX">
                      <div className="flexBX">
                        <div className="flexT">
                          <h4>SLF Loans</h4>
                        </div>
                        <div className="flexC">
                          <p>Opening Loans </p>
                          <input
                            required
                            type="number"
                            name="opening_loans"
                            onChange={inputB_b}
                            value={slfloan.opening_loans}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Sanctioned</p>
                          <input
                            required
                            type="number"
                            name="current_year_sanctioned"
                            onChange={inputB_b}
                            value={slfloan.current_year_sanctioned}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Recovery</p>
                          <input
                            required
                            type="number"
                            name="current_year_recovery"
                            onChange={inputB_b}
                            value={slfloan.current_year_recovery}
                          />
                        </div>
                        <div className="flexC">
                          <p>Total Loan Outstanding</p>
                          <input
                            required
                            type="number"
                            name="total_loan_outstanding"
                            readOnly
                            value={
                              parseInt(slfloan.opening_loans) +
                              parseInt(
                                parseInt(
                                  parseInt(slfloan.current_year_sanctioned) -
                                    parseInt(slfloan.current_year_recovery)
                                )
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="flexBaX">
                        <div className="flexT">
                          <h4>SLF Member Loans</h4>
                          <div className="flexD">
                            <input 
                              type="checkbox"
                              name="copy"
                              id="slfln"
                              onClick={slfln}
                              checked={cpslfln}
                              onChange={(e) => setcpslfln(e.target.checked)}
                            />
                            <p>Copy</p>
                          </div>
                        </div>

                        <div className="flexC">
                          <p>Opening Bank Loans</p>
                          <input
                            required
                            type="number"
                            name="slfm_opening_loan"
                            onChange={inputE}
                            value={slfMemberLoan.slfm_opening_loan}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Sanctioned</p>
                          <input
                            required
                            type="number"
                            name="slfm_current_year_sanctioned"
                            onChange={inputE}
                            value={slfMemberLoan.slfm_current_year_sanctioned}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Recovery</p>
                          <input
                            required
                            type="number"
                            name="slfm_current_year_recovery"
                            onChange={inputE}
                            value={slfMemberLoan.slfm_current_year_recovery}
                          />
                        </div>
                        <div className="flexC">
                          <p>Total Loan Outstanding</p>
                          <input
                            required
                            type="number"
                            name="slfm_total_loan_outstanding"
                            readOnly
                            value={
                              parseInt(slfMemberLoan.slfm_opening_loan) +
                              parseInt(
                                parseInt(
                                  slfMemberLoan.slfm_current_year_sanctioned
                                ) -
                                  parseInt(
                                    slfMemberLoan.slfm_current_year_recovery
                                  )
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                  {/* sectionE */}
                  <div className="sectionE">
                    <div className="flexAX">
                      <div className="flexBX">
                        <div className="flexT">
                          <h4>Srinidhi Loans</h4>
                        </div>
                        <div className="flexC">
                          <p>Opening Loan </p>
                          <input
                            required
                            type="number"
                            name="srinidhi_opening_loan"
                            onChange={inputC_c}
                            value={srinidhiLoan.srinidhi_opening_loan}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Sanctioned</p>
                          <input
                            required
                            type="number"
                            name="srinidhi_current_year_sanctioned"
                            onChange={inputC_c}
                            value={
                              srinidhiLoan.srinidhi_current_year_sanctioned
                            }
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Recovery</p>
                          <input
                            required
                            type="number"
                            name="srinidhi_current_year_recovery"
                            onChange={inputC_c}
                            value={srinidhiLoan.srinidhi_current_year_recovery}
                          />
                        </div>
                        <div className="flexC">
                          <p>Total Loan Outstanding</p>
                          <input
                            required
                            type="number"
                            name="srinidhi_total_loan_outstanding"
                            readOnly
                            value={
                              parseInt(srinidhiLoan.srinidhi_opening_loan) +
                              parseInt(
                                parseInt(
                                  srinidhiLoan.srinidhi_current_year_sanctioned
                                ) -
                                  parseInt(
                                    srinidhiLoan.srinidhi_current_year_recovery
                                  )
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="flexBaX">
                        <div className="flexT">
                          <h4>Srinidhi Member Loans</h4>
                          <div className="flexD">
                            <input 
                              type="checkbox"
                              name="copy"
                              id="sndhln"
                              onClick={sndhln}
                              checked={cpsndhln}
                              onChange={(e) => setcpsndhln(e.target.checked)}
                            />
                            <p>Copy</p>
                          </div>
                        </div>

                        <div className="flexC">
                          <p>Opening Loans</p>
                          <input
                            required
                            type="number"
                            name="srim_opening_loan"
                            onChange={inputF}
                            value={srinidhiMemberLoan.srim_opening_loan}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Sanctioned</p>
                          <input
                            required
                            type="number"
                            name="srim_current_year_sanctioned"
                            onChange={inputF}
                            value={
                              srinidhiMemberLoan.srim_current_year_sanctioned
                            }
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Recovery</p>
                          <input
                            required
                            type="number"
                            name="srim_current_year_recovery"
                            onChange={inputF}
                            value={
                              srinidhiMemberLoan.srim_current_year_recovery
                            }
                          />
                        </div>
                        <div className="flexC">
                          <p>Total Loan Outstanding</p>
                          <input
                            required
                            type="number"
                            name="srim_total_loan_outstanding"
                            readOnly
                            value={
                              parseInt(srinidhiMemberLoan.srim_opening_loan) +
                              parseInt(
                                parseInt(
                                  srinidhiMemberLoan.srim_current_year_sanctioned
                                ) -
                                  parseInt(
                                    srinidhiMemberLoan.srim_current_year_recovery
                                  )
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                  {/* sectionF */}
                  <div className="sectionF">
                    <div className="flexAX">
                      <div className="flexBX">
                        <div className="flexT">
                          <h4>Covid Loans</h4>
                        </div>
                        <div className="flexC">
                          <p>Opening Loans</p>
                          <input
                            required
                            type="number"
                            name="covid_opening_loan"
                            onChange={inputD}
                            value={covidloan.covid_opening_loan}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Sanctioned</p>
                          <input
                            required
                            type="number"
                            name="covid_current_year_sanctioned"
                            onChange={inputD}
                            value={covidloan.covid_current_year_sanctioned}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Recovery</p>
                          <input
                            required
                            type="number"
                            name="covid_current_year_recovery"
                            onChange={inputD}
                            value={covidloan.covid_current_year_recovery}
                          />
                        </div>
                        <div className="flexC">
                          <p>Total Loan Outstanding</p>
                          <input
                            required
                            type="number"
                            name="covid_total_loan_outstanding"
                            readOnly
                            value={
                              parseInt(covidloan.covid_opening_loan) +
                              parseInt(
                                parseInt(
                                  covidloan.covid_current_year_sanctioned
                                ) -
                                  parseInt(
                                    covidloan.covid_current_year_recovery
                                  )
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="flexBaX">
                        <div className="flexT">
                          <h4>Covid Member Loans</h4>
                          <div className="flexD">
                            <input 
                              type="checkbox"
                              name="copy"
                              id="cvdln"
                              onClick={cvdln}
                              checked={cpcvdln}
                              onChange={(e) => setcpcvdln(e.target.checked)}
                            />
                            <p>Copy</p>
                          </div>
                        </div>
                        <div className="flexC">
                          <p>Opening Loan </p>
                          <input
                            required
                            type="number"
                            name="cml_opening_loan"
                            onChange={inputF_f}
                            value={covidMemberLoans.cml_opening_loan}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Sanctioned</p>
                          <input
                            required
                            type="number"
                            name="cml_current_year_sanctioned"
                            onChange={inputF_f}
                            value={covidMemberLoans.cml_current_year_sanctioned}
                          />
                        </div>
                        <div className="flexC">
                          <p>Current Year Recovery</p>
                          <input
                            required
                            type="number"
                            name="cml_current_year_recovery"
                            onChange={inputF_f}
                            value={covidMemberLoans.cml_current_year_recovery}
                          />
                        </div>
                        <div className="flexC">
                          <p>Total Loan Outstanding</p>
                          <input
                            required
                            type="number"
                            name="cml_total_loan_outstanding"
                            readOnly
                            value={
                              parseInt(covidMemberLoans.cml_opening_loan) +
                              parseInt(
                                parseInt(
                                  covidMemberLoans.cml_current_year_sanctioned
                                ) -
                                  parseInt(
                                    covidMemberLoans.cml_current_year_recovery
                                  )
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                  {/* sectionG */}
                  <div className="sectionG">
                    <div className="flexAX">
                      <div className="flexBX">
                        <div className="flexT">
                          <h4>Balances</h4>
                        </div>
                        <div className="flexC">
                          <p>Opening Cash in Hand</p>
                          <input
                            required
                            type="number"
                            name="opening_cash"
                            onChange={inputG}
                            value={openingBankBalance.opening_cash}
                          />
                        </div>
                        <div className="flexC">
                          <p>Opening Bank Balance</p>
                          <input
                            required
                            type="number"
                            name="opening_bank_balance"
                            onChange={inputG}
                            value={openingBankBalance.opening_bank_balance}
                          />
                        </div>
                        <div className="flexC ">
                          <p>Closing Cash in Hand</p>
                          <input
                            required
                            type="number"
                            name="closing_cash"
                            onChange={inputG}
                            value={openingBankBalance.closing_cash}
                          />
                        </div>
                        <div className="flexC">
                          <p>Closing Bank Balance</p>
                          <input required
                            type="number"
                            name="closing_bank_balance"
                            onChange={inputG}
                            value={openingBankBalance.closing_bank_balance}
                          />
                        </div>
                        <div className="flexC">
                          <p>Surplus</p>
                          <input
                            required
                            type="number"
                            name="surplus"
                            onChange={inputG}
                            value={openingBankBalance.surplus}
                          />
                        </div>
                        
                      </div>
                      <div className="flexBaX">
                        <div className="flexC">
                          <label>Total fund Received</label>
                          <input required
                            type="number"
                            readOnly
                            value={Total_fund_Recived}
                          />
                        </div>
                        <div className="flexC">
                          <label>Total fund Available</label>
                          <input
                          required
                            type="number"
                            readOnly
                            value={total_fund_Available}
                          />
                        </div>
                        <div className="flexC">
                          <label>variation</label>
                          
                          <input required type="number" readOnly value={variation} />
                        </div>
                        <div className="flexC">
                          <label>Bank linkage variation</label>
                          <input
                          required
                            type="number"
                            readOnly
                            value={bank_linkage_variation}
                          />
                        </div>
                        <div className="flexC">
                          <p> Grade </p>
                          <input required name="grade" readOnly value={Grade} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="endbutton">
                    <input
                      required
                      type="submit"
                      value="Submit"
                      className="btn btn-success"
                    />
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
