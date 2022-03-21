import React from 'react';
import { Card } from 'react-bootstrap';
import classes from '../styles/WeatherCard.module.css'
const WeatherCard = ({ dt, temp_min, temp_max}) => {
  const date = new Date(dt);

  const roundMax = Math.round(temp_max);
  const roundMin = Math.round(temp_min);

  return (
    <div className={classes.Card}>
      <Card.Body>
        <p>
          <span style={{ fontSize: '1rem', fontWeight: '500' }}>
            {date.toLocaleTimeString()}
          </span>
          <br />
          {date.toLocaleDateString()}
        </p>
        <p>Lows: {roundMin}°</p>
        <p>Highs: {roundMax}°</p>
      </Card.Body>
    </div>
  );
};
export default WeatherCard;
