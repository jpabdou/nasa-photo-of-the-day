import React from "react";
import "./Space.css";
import styled from "styled-components";

const SpaceImg = styled.img`
    height:400px;
  object-fit: cover;
  border: 2px solid lightsalmon;
  margin: 10px 0px;

`

export default function Space(props){
    return(
        <div>
            <h2>{props.title}</h2>
            <h3>{props.date}</h3>
            <div>
                { props.media_type === "image" ? <SpaceImg src={props.url} alt={props.title} /> 
                : <iframe title={props.title} width="420" height="315" src={props.url}></iframe>}
            </div>
        </div>
    )
}
