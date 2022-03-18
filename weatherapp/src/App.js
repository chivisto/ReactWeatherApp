import React, { useState, useEffect } from 'react';


function App() {
  const [input, setInput] = useState(null)
  const [search, setSearch] = useState(false)

  function getInput(val){
    setInput(val.target.value)
    setSearch(false)
    console.log(val.target.value)
  }

  useEffect(() => {
    async function getApi(){
      const url ="http://api.openweathermap.org/data/2.5/weather?q=&appid=1852e77cf37dc313345e20cf7c16fee9";
      const data = await url.json();
  
      console.log(data.results)
  
    }
  });

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
