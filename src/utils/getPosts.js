import { BASE_URL } from "../config"

export const getPosts = async () =>{
    try{
        const response = await fetch(`${BASE_URL}/posts`)
        if(!response.ok){
            return 'There was an error fetching posts'
        }
        const result = await response.json()
        return result
    }
    catch(error){
        return error.message;
    }
    

}