import { BASE_URL } from "../config"
export const deletePost = async ( postId) =>{
    try{
        const response = await fetch(`${BASE_URL}/posts/${postId}`,{
            method:'DELETE',

        })
        if(!response.ok){
            throw new Error ('There was an error deleting post')
        }
        const result = await response.json()
        return result
    }
    catch(error){
        throw new Error (error.message);
    }
    

}
