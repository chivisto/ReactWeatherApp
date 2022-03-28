import './App.css';
import {useState, useEffect} from 'react';
import {Row, Col, FormControl, Button} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import classes from './styles/WeatherCard.module.css'
import { Card } from 'react-bootstrap';


//Using Api
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

//card + converter of F or C
const WeatherCard = ({ dt, temp_min, temp_max}) => {
  const date = new Date(dt);

  const roundMax = Math.round(temp_max);
  const roundMin = Math.round(temp_min);

  let jsonNumberMin = parseInt(roundMin);
  let jsonNumberMax = parseInt(roundMax);

  const celsMax = Math.round((jsonNumberMax - 32) * .5556);
  const celsMin = Math.round((jsonNumberMin - 32) * .5556);

  function convertFunction() {
    const y = document.getElementsByClassName("celMin");
    const x = document.getElementsByClassName("fernMin");

    const b = document.getElementsByClassName("celMax");
    const a = document.getElementsByClassName("fernMax");
    
    for(let i = 0; i < y.length && x.length; i++){
      if (x[i].style.display === "none") {
        x[i].style.display = "block";
        y[i].style.display = "none";
      } else {
        x[i].style.display = "none";
        y[i].style.display = "block";
      }
    }

    for(let i = 0; i < b.length && a.length; i++){
      if (a[i].style.display === "none") {
        a[i].style.display = "block";
        b[i].style.display = "none";
      } else {
        a[i].style.display = "none";
        b[i].style.display = "block";
      }
    }
  }

  return (
    <div className={classes.Card}>
      <Card.Body>
        <p>
          <span style={{fontSize: '1.5rem' }}>
            {date.toLocaleTimeString()}
          </span>
          <br />
          {date.toLocaleDateString()}
        </p>
        <p>Lows:</p>
        <p className="fernMin">{roundMin}°F</p>
        <p className="celMin">{celsMin}°C</p>
        <p>Highs:</p>
        <p className="fernMax">{roundMax}°F</p>
        <p className="celMax">{celsMax}°C</p>
        <button onClick={convertFunction}>Convert °F / °C</button>
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
