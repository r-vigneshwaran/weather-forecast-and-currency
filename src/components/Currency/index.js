import { getCurrencyExchange } from 'Apis';
import React, { useState } from 'react';
import { useEffect } from 'react';

const Currency = () => {
  const [currencyDetails, setCurrencyDetails] = useState([]);
  const countryCode = localStorage.getItem('code');

  const getCurrencyDetails = async (countryCode) => {
    const data = await getCurrencyExchange(JSON.parse(countryCode));
    setCurrencyDetails(data);
  };

  useEffect(() => {
    if (countryCode) {
      if (!currencyDetails.length) {
        getCurrencyDetails(countryCode);
      }
    }
  }, [countryCode, currencyDetails]);
  
  return (
    <div style={{ width: '100%' }}>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {currencyDetails.length > 0 &&
            currencyDetails.map((item, idx) => (
              <tr key={idx}>
                <td>
                  {item.base_code} {item.code}
                </td>
                <td>{item.value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Currency;
