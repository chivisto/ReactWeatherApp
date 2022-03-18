import React, { useState, useEffect } from 'react';

function App() {
  const api = {
    key: "&appid=1852e77cf37dc313345e20cf7c16fee9",
    url: "http://api.openweathermap.org/data/2.5/"
  }

  const [input, setInput] = useState(null)
  const [search, setSearch] = useState(false)
  const [weather, setWeather] = useState([]);

  function getInput(val){
    setInput(val.target.value)
    setSearch(false)
  }

  useEffect(() => {
    async function getApi(){
      const resp = await fetch (`${api.url}weather?&q=${input}&units=metric${api.key}`);
      const data = await resp.json();
  
      console.log(data.results)
      setWeather(data.results);
    }
    getApi()
  }, []);

  console.log(weather)



  return (
  <div className='App'>
    {
      search ?
      <h1>{input}</h1>
      :null
    }
    <input type="text" onChange={getInput}/>
    <button onClick={() => setSearch(true)}>Search</button>
  </div>
  )
}

export default App;
