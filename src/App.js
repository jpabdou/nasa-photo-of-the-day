import React, {useState,useEffect} from "react";
import "./App.css";
import axios from "axios";
import moment from 'moment';

function App() {
  function getLastWeeksDate() {
    const now = new Date();
  
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toJSON().slice(0,10);
  }
  const lastWeek=(getLastWeeksDate())
  const currentDate = new Date().toJSON().slice(0,10);
  const [images, setImages] = useState({});
  const [weekStart, setWeekStart] = useState(lastWeek);

  const queryDate = (dateStringWithSlash) => {
    return dateStringWithSlash.replace("/","-")
  }

  const onChangeDate = e => {
    
    setWeekStart(e.target.value);
    let dateInput= e.target.value+"T00:00:00"
    console.log(dateInput)
    const input = ((new Date(dateInput)))
    console.log(new Date(input.getFullYear(),input.getMonth(),input.getDate()+7).toJSON().slice(0,10))
  };

  const imageGather = () =>{
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${queryDate(weekStart)}`)
      .then(result => console.log(result.data))
      .catch(err=>console.log(`Error: ${err}`))
  }
  // useEffect(()=>{imageGather()},[weekStart])
  
  return (
    <div className="App">
      <h1>A look at space each day of the week courtesy of NASA!</h1>
      <div>
        <label>Start date:</label>

        <input onChange={onChangeDate} type="date" id="start" name="week-start" />
      </div>

      <p>
        Read through the instructions in the README.md file to build your NASA
        app! Have fun <span role="img" aria-label='go!'>🚀</span>!
      </p>
    </div>
  );
}

export default App;
