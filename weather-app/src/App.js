import {useState, useEffect} from 'react';
import {Row, Col, FormControl, Button} from 'react-bootstrap';
import './App.css';
import {Container} from 'react-bootstrap';
import classes from './styles/WeatherCard.module.css'
import { Card } from 'react-bootstrap';



const App = () => {
  const key = '1852e77cf37dc313345e20cf7c16fee9';
  const url = 'https://api.openweathermap.org/';

  const UseFetch = (initialUrl) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [url, setUrl] = useState(initialUrl);
  
    useEffect(() => {
      if(!url) return;
      setIsLoading(true);
  
      setData(null);
      setError(null);
  
      fetch(url)
          .then((response) => response.json())
          .then((data) => {
              setIsLoading(false);
              if(data.cod >= 400) {
                  setError(data.message);
                  return;
              }
              setData(data);
          })
          .catch((error) => {
              setIsLoading(false);
              setError(error);
          });
    }, [url]);
  
    return { data, error, isLoading, setUrl };
  };

  const {data, error, isLoading, setUrl} = UseFetch();

  const getContent = () => {
    if(error) return <h2>Error when fetching: {error}</h2>
    if(!data && isLoading) return <h2>loading...</h2>
    if(!data) return null;
    return <WeatherList weathers={data.list} />
  };

  const WeatherList = ({weathers}) => {
    return (
        <Row>
           {weathers.map(({dt,main, weather}) => (
                <Col key={dt}>
                    <WeatherCard temp_max={main.temp_max} temp_min={main.temp_min} dt={dt * 1000} main={weather[0].main}/>
                </Col>
            ))} 
        </Row>
    )
}
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

const CitySelector = ({onSearch}) => {
  const [city, setCity] = useState('');

  return (
    <>
      <Row>
        <Col>
          <h1>Weather App</h1>
          <h2>Search:</h2>
        </Col>
      </Row>

      <Row>
        <Col xl={5}>
          <FormControl
            placeholder="Enter city"
            onChange={(event) => setCity(event.target.value)}
            value={city}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Button onClick={() => onSearch(city)}>Enter</Button>
        </Col>
      </Row>
    </>
  );
};
  
  return (
    <Container className="App">
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <CitySelector onSearch={(city) => setUrl(`${url}/data/2.5/forecast?q=${city}&appid=${key}&units=imperial`)} />
      {getContent()}
    </Container>
  );
};

export default App;