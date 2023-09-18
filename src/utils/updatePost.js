import { BASE_URL } from "../config"
export const updatePost = async ({data, postId}) =>{
    try{
        const response = await fetch(`${BASE_URL}/posts/${postId}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)

        })
        if(!response.ok){
            throw new Error ('There was an error updating posts')
        }
        const result = await response.json()
        return result
    }
    catch(error){
        throw new Error (error.message);
    }
    

}
