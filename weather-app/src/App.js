import React from 'react';
import CitySelector from './components/CitySelector';
import './App.css';
import {Container} from 'react-bootstrap';
import UseFetch from './hooks/UseFetch';
import WeatherList from './components/WeatherList';

const App = () => {
  const api_key = '1852e77cf37dc313345e20cf7c16fee9';
  const api_url = 'http://api.openweathermap.org/';

  const {data, error, isLoading, setUrl} = UseFetch();

  const getContent = () => {
    if(error) return <h2>Error when fetching: {error}</h2>
    if(!data && isLoading) return <h2>loading...</h2>
    if(!data) return null;
    return <WeatherList weathers={data.list} />
  };
  
  return (
    <Container className="App">
      <CitySelector onSearch={(city) => setUrl(`${api_url}/data/2.5/forecast?q=${city}&appid=${api_key}&units=imperial`)} />
      {getContent()}
    </Container>
  );
};

export default App;