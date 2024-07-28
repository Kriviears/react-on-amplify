import axios from 'axios'
const baseURL = `http://localhost:8000/s3Url`
const gatewayURL = `https://n3mhroo6vg.execute-api.us-east-1.amazonaws.com/perscholas`

export async function getUrl(){
    const getURL = `${baseURL}`

    const response = await axios.get(getURL)
        .then(response =>{
            console.log(response)
            return response.data
        }).catch(error =>{
            console.log(error)
        })

        return response
}


export async function putImage(filename, file){
    await fetch(`${gatewayURL}/${filename}`, {
        method: "PUT",
        body: file
    })
}

export async function getData(){
    await fetch(`${gatewayURL}/data`)
        .then(response =>{
            console.log(response.json())
            if(!!response){
                //finally the url
                return response.body.toString().split('"')[3];
            }
        })
}