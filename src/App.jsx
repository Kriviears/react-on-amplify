import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button, Form} from 'react-bootstrap/';
import * as Icon from 'react-bootstrap-icons';
import { getUrl } from './fileService';


function App() {
  const [count, setCount] = useState(0)

  let imageInput = document.querySelector('#FileButton')
  

  const handleUpload = async (event)=>{
    event.preventDefault()
    console.log("File uploading")
    console.log(`file: ${imageInput.files[0]}`)

    const file = imageInput.files[0]


    
    




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
          <h1>Upload an iage and I'll  tell you what it is</h1>

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

          <div className='ServerResponse'></div>

          
          
        </div>

      </div>
    </>
  )
}

export default App
