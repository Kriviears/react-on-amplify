import React, {useEffect, useState} from 'react'
import { RekognitionClient, DetectLabelsCommand } from "@aws-sdk/client-rekognition";





export function RekogResults(props) {
    const [imgSrc, setImgSrc] = useState(props.ImgUrl)
    const [filename, setFileName] = useState("")

    let rekogResponse = ""

    const {VITE_accessKeyId, VITE_secretAccessKey} = import.meta.env
    


    
    
    const client = new RekognitionClient({
        region: "us-east-1",
        credentials: {
            profile: 'amplify-dev',
            accessKeyId: VITE_accessKeyId,
            secretAccessKey: VITE_secretAccessKey
        }
    })
    const params = {
        "Image": { 
           "S3Object": { 
              "Bucket": "what-is-this-thing",
              "Name": imgSrc.split("/")[3]
           }
        },
        "MaxLabels": 3,
        "MinConfidence": 95,        
    };

    // console.log(VITE_accessKeyId, VITE_secretAccessKey)

    
    
    useEffect(()=>{
        setImgSrc(props.ImgUrl)
        
    }, [props.ImgUrl])

    const detect_labels = async () =>{
        try{
            const response = await client.send(new DetectLabelsCommand(params));
            console.log(response.Labels)
            response.Labels.forEach(label =>{
                console.log(`${label.Name}, and I'm ${label.Confidence}% sure`)
                document.querySelector('.ResponseString').innerHTML += `${label.Name}, `
                console.log("Instances: ")
                label.Instances.forEach(instance =>{
                    console.log(instance)
                })
                console.log("--------------------------")
            })
            return response;
        } catch (err){
            console.log("Error", err)
        }
        console.log("response string: ",rekogResponse)
    }


  return (
    <div>
        <img onClick={()=>detect_labels()} src={imgSrc} />
        <h1 className='ResponseString'>
            {rekogResponse}
        </h1>
    </div>
  )
}

export default RekogResults