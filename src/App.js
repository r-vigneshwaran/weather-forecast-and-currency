import React, { useState } from 'react';
import { Col, Row } from 'antd';
import Currency from 'components/Currency';
import Details from 'components/Details';
import Header from 'components/Header';
import Map from 'components/Map';
import { useEffect } from 'react';

function App() {
  const [center, setCenter] = useState();

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setCenter({ lat, lng });
      }
    );
  }, []);
  
  return (
    <div className="App">
      <Header />
      <Row className="h-100 px-5">
        <Col span={6}>
          <Details center={center} />
        </Col>
        <Col span={18} className="h-100">
          <Row className="h-70">
            <Map center={center} />
          </Row>
          <Row>
            <Currency />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
