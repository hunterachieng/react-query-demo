import { BASE_URL } from "../config"

export const getPosts = async () =>{
    try{
        const response = await fetch(`${BASE_URL}/posts`)
        if(!response.ok){
           throw new Error ('There was an error fetching posts')
        }
        const result = await response.json()
        return result
    }
    catch(error){
        throw new Error (error.message);
    }
    

}

