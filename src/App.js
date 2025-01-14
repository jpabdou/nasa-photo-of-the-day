import React, {useState,useEffect} from "react";
import "./App.css";
import axios from "axios";
import Space from "./Space";
import styled from "styled-components";

const SpaceCalender = styled.input`
  background-color: black;
  font-size: 1.5rem;
`
const SpaceLabel = styled.label`
  font-size:1.5rem
`
const Spacer = styled.div`
  margin:0px 0px 10px 0px;
  height: 1rem;
  width: 100%
`


function App() {
  function getLastWeeksDate() {
    const now = new Date();
  
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toJSON().slice(0,10);
  }


  const lastWeek=(getLastWeeksDate())
  const currentDate = new Date().toJSON().slice(0,10);
  const [images, setImages] = useState([]);
  const [weekStart, setWeekStart] = useState(lastWeek);
  const [weekEnd, setWeekEnd] = useState(currentDate);

  const onChangeDate = e => {
    
    setWeekStart(e.target.value);
    let dateInput= e.target.value+"T00:00:00"
    const input = ((new Date(dateInput)))
    setWeekStart(new Date(input.getFullYear(),input.getMonth(),input.getDate()).toJSON().slice(0,10))
    setWeekEnd(new Date(input.getFullYear(),input.getMonth(),input.getDate()+7).toJSON().slice(0,10))
  };

  const imageGather = (start,end) =>{
    const query =`https://api.nasa.gov/planetary/apod?api_key=kgTQPgD3BKFdIzfwxwLmG1DShWwgo6rHMBFXZdeH&start_date=${start}&end_date=${end}`
    axios.get(query)
      .then(result => setImages(result.data))
      .catch(result=>console.log(result))
  }
  useEffect(()=>{imageGather(weekStart,weekEnd)},[weekStart, weekEnd])
  return (
    <div className="App">
      <Spacer></Spacer>
      <h1>A look at space each day of the week courtesy of NASA!</h1>
      <div>
        <SpaceLabel>Start date of the week you want to look at: </SpaceLabel>
        <SpaceCalender onChange={(event)=>onChangeDate(event)} type="date" />
      </div>
      <div className="Spaaace">
      {images.map((image,idx)=>
        <div key={idx}>
          <Space title={image.title} date={image.date} url={image.hdurl ? image.hdurl : image.url} media_type={image.media_type} />
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
