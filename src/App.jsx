import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import { getUrl } from './fileService';


function App() {
  const [count, setCount] = useState(0)

  const imageInput = document.querySelector('#FileButton')

  const handleUpload = async (event)=>{
    console.log("File uploading")
    event.preventDefault()
    const file = imageInput.files[0]
    console.log(file)


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
          <h1>Upload an imagine and I'll tell you what it is</h1>
          
          

          <div className="input-group">
            <Button>
              <input type="file" class="form-control" id="FileButton"/>
            </Button>

            <label class="input-group-text" for="FileButton">
              <Button 
                onClick={(event)=>handleUpload(event)} 
              >
                <Icon.CloudArrowUp/> Upload
              </Button>
            </label>

          </div>

          <div className='ServerResponse'></div>

          
          
        </div>

      </div>
    </>
  )
}

export default App
