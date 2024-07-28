import React, {useEffect, useState} from 'react'
import { getData } from '../fileService'

export function RekogResults(props) {
    const [imgSrc, setImgSrc] = useState(props.ImgUrl)
    
    
    useEffect(()=>{
        console.log("rekog effect")
        setImgSrc(props.ImgUrl)
    }, [props.ImgUrl])

    


  return (
    <div>
        <h1>
            <img src={imgSrc} />
        </h1>
    </div>
  )
}

export default RekogResults