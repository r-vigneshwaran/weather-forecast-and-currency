import axios from 'axios';

export const getUpcomingWeather = async ({ lat, lng }, limit) => {
  const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/climate/month',
    params: { lat: lat, lon: lng },
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': 'da01b129femshf50389293aca89fp156bedjsn88401f767fe1'
    }
  };
  const res = await axios.request(options);
  return res.data.list.slice(0, limit);
};

export const getCurrentWeather = async ({ lat, lng }) => {
  var options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
      lat: lat,
      lon: lng
    },
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': 'da01b129femshf50389293aca89fp156bedjsn88401f767fe1'
    }
  };
  const res = await axios.request(options);
  const code = res.data.weather[0].icon;
  localStorage.setItem('code', JSON.stringify(res.data.sys.country));
  res.data[
    'icon'
  ] = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${code}.svg`;
  return res.data;
};

export const getCurrencyExchange = async (from) => {
  var options = {
    method: 'GET',
    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${from}`,
    headers: {
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': 'da01b129femshf50389293aca89fp156bedjsn88401f767fe1'
    }
  };
  const res = await axios.request(options);
  const country_code = res.data.data.currencyCodes[0];
  var options2 = {
    method: 'GET',
    url: `https://exchangerate-api.p.rapidapi.com/rapid/latest/${country_code}`,
    headers: {
      'x-rapidapi-host': 'exchangerate-api.p.rapidapi.com',
      'x-rapidapi-key': 'da01b129femshf50389293aca89fp156bedjsn88401f767fe1'
    }
  };
  const response = await axios.request(options2);
  const data = [
    {
      base_code: response.data.base_code,
      code: 'USD',
      value: response.data.rates.USD
    },
    {
      base_code: response.data.base_code,
      code: 'EUR',
      value: response.data.rates.EUR
    }
  ];
  return data;
};
export const fetchExchangeRate = async () => {
  const data = await axios.get(
    `https://v2.api.forex/historics/latest.json?from=INR&key=b35c5d57-9210-4f40-94fa-6afc579d2da7`
  );
  console.log(data, 'api data');
};
