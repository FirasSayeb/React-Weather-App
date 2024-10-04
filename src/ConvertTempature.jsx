import { useMemo } from "react";
import { Card } from "react-bootstrap";
import {IconTemperatureFahrenheit} from '@tabler/icons-react';


export default function ConvertTemature({val}){

    const fer=useMemo(()=>(val*9/5)+32,val)
    
return <Card style={{
    fontFamily:'serif',
    fontSize:'2em',
   position:'relative',
         bottom:'500px',
         backgroundColor:'hsl(300, 56%, 52%);',
         borderRadius:'10px',
          marginLeft:'46%',
          width:'200px'

    }}> 
    <Card.Body>
Temperateur : {fer} <IconTemperatureFahrenheit size={20}  
    stroke={3}  
    strokeLinejoin="miter" />
    </Card.Body>
</Card>
}  