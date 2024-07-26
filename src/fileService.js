import axios from 'axios'
const baseURL = `http://localhost:8000/s3Url`


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