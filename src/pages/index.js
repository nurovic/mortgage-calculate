import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Index() {
  const [loanAmount, setLoanAmount] = useState();
  const [annualRate, setAnnualRate] = useState();
  const [loanTerm, setLoanTerm] = useState();
  const [monthlyMortgage, setMonthlyMortgage] = useState(0);
  const [error, setError] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (loanAmount !== "" && annualRate !== "" && loanTerm !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [loanAmount, annualRate, loanTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const P = loanAmount.replace(/,/g, "");
    const i = annualRate / 12 / 100;
    const n = loanTerm * 12;

    const MonthlyMortgage =
      (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    setMonthlyMortgage(MonthlyMortgage.toFixed(2));
  };

  const handleInputKeyDown = (e) => {
    if (!/^[0-9]*$/.test(e.key) && e.key.length === 1) {
      e.preventDefault();
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const handleLoanAmount = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatCurrency(inputValue);
    setLoanAmount(formattedValue);
  };

  const formatCurrency = (value) => {
    const currencyVal = value.replace(/[^0-9.]/g, "");
    const part = currencyVal.split(".");
    part[0] = part[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return part.join(".");
  };

  const amountFormat = (amount) => {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "EUR",
    }).format(parseFloat(amount));
  };

  return (
    <div>
      {error && (
        <div className="absolute flex justify-end w-screen px-12">
          <div className="bg-red-500 mt-8 px-4 py-2 rounded-[8px] text-[#fff]">
            Only number is valid.
          </div>
        </div>
      )}
      <div className="w-screen font-[700] absolute flex justify-center text-center pt-24 text-gray-400 text-[30px]">
        Monthly Mortgage
      </div>
      <div className="flex h-screen items-center justify-center">
        <form onSubmit={handleSubmit}>
          <Input
            title="Loan Amount"
            type="text"
            placeholder="Loan Amount..."
            onChange={handleLoanAmount}
            onKeyDown={(e) => handleInputKeyDown(e)}
            id="loanAmount"
            value={loanAmount}
          />
          <Input
            title="Annual Rate"
            type="text"
            placeholder="Annual Rate..."
            onChange={(e) => setAnnualRate(e.target.value)}
            onKeyDown={(e) => handleInputKeyDown(e)}
            id="annualRate"
            value={annualRate}
          />
          <Input
            title="Loan Term"
            type="text"
            placeholder="Loan Term..."
            onChange={(e) => setLoanTerm(e.target.value)}
            onKeyDown={(e) => handleInputKeyDown(e)}
            id="loanTerm"
            value={loanTerm}
          />
          <div className="flex justify-center font-bold pb-2 border-b-2">
            Monthly Mortgage Result:
            <div className="font-[700] text-gray-400 ml-2">
              {amountFormat(monthlyMortgage)}
            </div>
          </div>
          <div className="flex justify-center">
            <Button disable={disable} type="submit" title="Calculate" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Index;
