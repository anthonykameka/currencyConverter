// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [loadingCurrencies, setLoadingCurrencies] = useState(false);
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");
  const [originalAmount, setOriginalAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const host = "api.frankfurter.app";

  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoadingCurrencies(true);
      const res = await fetch(`https://${host}/currencies`);

      const data = await res.json();
      console.log(data);
      setCurrencyOptions(Object.keys(data));
      setLoadingCurrencies(false);
    };

    fetchCurrencies();

    console.log(currencyOptions);
  }, []);

  useEffect(() => {
    const fetchConvertedAmount = async () => {
      const res = await fetch(
        `https://${host}/latest?amount=${originalAmount}&from=${currency1}&to=${currency2}`
      );
      const data = await res.json();
      console.log(data.rates);
      setConvertedAmount(data.rates[currency2]);
    };

    fetchConvertedAmount();
  }, [currency1, currency2, originalAmount]);

  const handleSelectCurrency1 = (e) => {
    setCurrency1(e.target.value);
  };
  const handleSelectCurrency2 = (e) => {
    setCurrency2(e.target.value);
  };

  const handleOriginalAmount = (e) => {
    setOriginalAmount(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <input
        onChange={handleOriginalAmount}
        type="text"
        disabled={loadingCurrencies}
      />
      <select onChange={handleSelectCurrency1} disabled={loadingCurrencies}>
        {loadingCurrencies ? (
          <option> Loading ... </option>
        ) : (
          currencyOptions.map((currency) => {
            return <option value={currency}>{currency}</option>;
          })
        )}
      </select>
      <select onChange={handleSelectCurrency2} disabled={loadingCurrencies}>
        {loadingCurrencies ? (
          <option> Loading ... </option>
        ) : (
          currencyOptions.map((currency) => {
            return <option value={currency}>{currency}</option>;
          })
        )}
      </select>
      <p>
        {Number(convertedAmount.toFixed(2))} {currency2}
      </p>
    </div>
  );
}
