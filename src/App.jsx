import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button, Form} from 'react-bootstrap/';
import * as Icon from 'react-bootstrap-icons';
import { getUrl, putImage } from './fileService';
import { GatewayCall } from './components/GatewayCall';
import {RekogResults} from './components/rekogResults';




function App() {
  const [count, setCount] = useState(0)
  

  let imageInput = document.querySelector('#FileButton')
  

  const handleUpload = async (event)=>{
    event.preventDefault()
    console.log("File uploading")

    //console.log(`value: ${imageInput.value.split('\\')}`)
    
    let filename = imageInput.value.split("path\\")[1]
    const file = imageInput.files[0]

    console.log(`fetching in the same file`)

    putImage(filename, file)
    

    //get secure url from server
    const {url} =  await getUrl()
    console.log(url)



    //post the image directly to S3 bucket
    await fetch(url, {
      method: "PUT",
      headers:{
        "Content-Type": "multipart/form-data"
      },
      body: file
    })

    const imageUrl = url.split('?')[0]
    console.log(imageUrl)
    //post request to server to store extra data

    const img = document.createElement("img")
    img.src = imageUrl
    document.getElementsByClassName("ServerResponse")[0].appendChild(img)
  }


  return (
    <>
      <div>
        <div className='header'>
          <h1>What is this?</h1>
        </div>
        <div className='Main'>
          <h1>Upload an image and I'll  tell you what it is</h1>

          <Form 
            onSubmit={(event)=>handleUpload(event)}
            className="input-group">
            <Button >
              <input 
              onChange={()=>{imageInput = document.querySelector('#FileButton')}} 
              type="file" class="form-control" id="FileButton"/>
            </Button>
            <label class="input-group-text" for="FileButton">
              <Button 
                type='submit'
                 
              >
                <Icon.CloudArrowUp/> Upload
              </Button>
            </label>

          </Form>

          <div className='ServerResponse'>
            <RekogResults />
          </div>

          
          
        </div>

      </div>
    </>
  )
}

export default App
