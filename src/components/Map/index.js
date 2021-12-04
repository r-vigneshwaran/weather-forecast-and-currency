import { Spin, Tooltip } from 'antd';
import GoogleMapReact from 'google-map-react';
import React from 'react';
import styles from './Map.module.css';
import { LoadingOutlined } from '@ant-design/icons';
import { fetchExchangeRate } from 'Apis';
import { useEffect } from 'react';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Map = ({ center }) => {
  function renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: center,
      map,
      title: 'Your Current Location'
    });
  }
  const coordinates = { lat: 0, lng: 0 };
  useEffect(() => {
    fetchExchangeRate();
  }, []);
  return (
    <div className={styles.red}>
      {center ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAZpKGJDb8gkMsyuex7Y75-ZGIpGjS6DGA' }}
          defaultZoom={14}
          defaultCenter={coordinates}
          center={center}
          margin={[50, 50, 50, 50]}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        >
          {console.log(center, '13.119238,80.142313')}
        </GoogleMapReact>
      ) : (
        <Tooltip placement="top" title={'Allow Permission to Fetch location'}>
          <Spin indicator={antIcon} />
        </Tooltip>
      )}
    </div>
  );
};

export default Map;
