import React, {useEffect, useState} from 'react'
import { getData } from '../fileService'

export function RekogResults() {
    const [message, setMessage] = useState("");
    
    useEffect(()=>{
        const  data = getData()
        console.log("Api data: ", data)
        setMessage[data]
    }, [])


  return (
    <div>{message}</div>
  )
}

export default RekogResults