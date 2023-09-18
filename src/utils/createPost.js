import { BASE_URL } from "../config"
export const createPosts = async (data) =>{
    try{
        const response = await fetch(`${BASE_URL}/posts`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)

        })
        if(!response.ok){
            throw new Error ('There was an error creating posts')
        }
        const result = await response.json()
        return result
    }
    catch(error){
        throw new Error (error.message);
    }
    

}
