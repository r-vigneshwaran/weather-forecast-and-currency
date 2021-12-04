import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.text}>Weather App</h2>
      <h4 className={styles.text}>
        Get the weather Forecast and currency exchange here
      </h4>
    </header>
  );
};

export default Header;
