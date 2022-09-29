import React from "react";
import "./Space.css"

export default function Space(props){
    return(
        <div>
            <h2>{props.title}</h2>
            <div>
                { props.media_type === "image" ? <img src={props.url} alt={props.title} /> 
                : <iframe title={props.title} width="420" height="315" src={props.url}></iframe>}
            </div>
        </div>
    )
}
