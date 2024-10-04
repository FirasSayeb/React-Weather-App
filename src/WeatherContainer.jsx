import { useContext, useEffect, useState } from "react";

import {IconTemperatureCelsius,IconDropletHalf2Filled,IconClock2} from '@tabler/icons-react';
import Chart from "react-apexcharts";
import {CityContext} from "./CitySelector";
import ConvertTemature from "./ConvertTempature";
import { Card } from "react-bootstrap";


export default function WeatherContainer(){

   

    const [result,setResult]=useState([]);

    const [humidity,setHumidity]=useState([]);

    const [time,setTime]=useState([]);

  const [speed,setSpeed]=useState([]);
    


const info=useContext(CityContext);

   
           
   
        useEffect(() => {
           
                console.log(info)
                fetch("https://api.open-meteo.com/v1/forecast?latitude="+info.lat+"&longitude="+info.lon+"&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m")
                .then(response => response.json())   
                
                .then(data => {
                    console.log(data)
                    console.log(data.hourly.temperature_2m[0])
                    setHumidity(data.hourly.relative_humidity_2m)  
                    setResult(data.hourly.temperature_2m)
                    setTime(data.hourly.time)
                    setSpeed(data.hourly.wind_speed_10m);

                });
              
            
          },[info])

         
  const options = { xaxis: {
    categories: time
  }}


  const series = [{data:result},{data:humidity},{data:speed}];
          
    
    return  <><Card style={{
        
        backgroundColor:'lightcoral',
        borderRadius:'10px',
        fontFamily:'serif',
        fontSize:'2em',
        marginTop:'100px',
         marginBottom:'100px',
         width:'30%',
         position:'relative',
         bottom:'80px',
        marginLeft:'37%',
        color:'white'

        }}> <Card.Title  style={{  
           
             marginBottom:'50px',
    
            }}> Temperateur : {result[0]}<IconTemperatureCelsius size={20}  
    stroke={3}  
    strokeLinejoin="miter"/> </Card.Title>  <Card.Body
    style={{
           
        marginBottom:'50px',
 
       }}
      
    >Humidity : {humidity[0]}<IconDropletHalf2Filled size={20}  
    stroke={3}  
    strokeLinejoin="miter"/></Card.Body> <Card.Text> Time : {time[0]}<IconClock2 size={30}  
    stroke={3}  
    strokeLinejoin="miter"/></Card.Text> </Card>
     
   <Chart
    
   options={options} series={series} height={350} type="line"
  
   />
     
     
     

    <ConvertTemature val={result}/>
    
    </>

}