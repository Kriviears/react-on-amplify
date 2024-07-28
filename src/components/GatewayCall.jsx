import React, {useEffect, useState} from 'react'
import { getData } from '../fileService'

export function GatewayCall() {
    const [message, setMessage] = useState("");
    
    useEffect(()=>{
        const  data = getData()
        console.log(data)
        setMessage[data]
    }, [])


  return (
    <div>{message}</div>
  )
}
