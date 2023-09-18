import { BASE_URL } from "../config"

export const getSinglePosts = async (postId) =>{
    try{
        const response = await fetch(`${BASE_URL}/posts/${postId}`)
        if(!response.ok){
           throw new Error ('There was an error fetching post')
        }
        const result = await response.json()
        return result
    }
    catch(error){
        throw new Error (error.message);
    }
    

}

