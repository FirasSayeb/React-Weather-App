
import { createContext, useEffect, useState } from 'react';
import {IconPlanet} from '@tabler/icons-react';
import axios from 'axios';
import WeatherContainer from './WeatherContainer';
import Card from 'react-bootstrap/Card';
import { hover } from '@testing-library/user-event/dist/hover';
export const CityContext = createContext();


export default function CitySelector() {

    const [city, setCity] = useState('');
   
   
    
    const [info,setInfo]=useState();
    const [options,setOptions]=useState([]);
    const [display,setDisplay]=useState(false);
 
    useEffect(

        () => {
            if (city?.length) {

                axios.get("https://nominatim.openstreetmap.org/search?q="+city+"&format=jsonv2")
                .then(function (response) { 
                    
                    //console.log(response.data);


                setOptions(response.data);
                   

                  })
                  .catch(function (error) {
                    
                   // console.log(error); 
                  })
            }

        }, [city])
        


    return <CityContext.Provider value={info}> 
        <Card style={{
        fontFamily:'serif',
        fontSize:'2em',
        marginTop:'100px',
       

        }}> <Card.Body><label>City <IconPlanet size={20}  
    stroke={3}  
    strokeLinejoin="miter"/>   <input
     
    style={{
        borderRadius:'10px',
        textAlign:'center',
        fontFamily:'fantasy',
        fontSize:'1em'

    }}  
    
    placeholder='City' value={city} onChange={(e) => {
        setCity(e.target.value);
    }}></input></label></Card.Body></Card> 
 
{options.map(elem=><li 

onClick={()=>{
   //console.log(elem)
    setInfo(elem); 
    setDisplay(true);
    setOptions([])
}}>{elem.display_name}</li>)} 
        {display ? <WeatherContainer /> :<></>} 
       
       
        </CityContext.Provider>

}