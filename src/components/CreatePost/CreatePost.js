import { createPosts } from "../../utils/createPost";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from "@mui/material";
import './style.css';

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CreatePost = ({setOpen, open}) => {
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const queryClient = useQueryClient();
    const mutation = useMutation({mutationFn: createPosts, 
    onSuccess:(data, variables)=>{
        queryClient.setQueryData(['posts', {userId:variables.userId}], 
        (currentData)=>currentData?[data, ...currentData] : [data] )
      
    },
    onError:(error)=>{
        return <h2>Error creating new post {error}</h2>
  
    }
    })
    const handleFormSubmission= (e) =>{
        e.preventDefault();
        const bodyData = {
            title,
            body,
            userId: 1,
        }
        mutation.mutate(bodyData)
        setOpen(false)

    }

  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style} >
      <Typography id="formtitle" variant="h4" component="h2">
      Create Post
      </Typography>

     <form className="post-form" onSubmit={handleFormSubmission}>
     <TextField type="text" name="title" placeholder="Enter post title" variant="outlined" onChange={(e)=>setTitle(e.target.value)} className="post-title-field"/>
      <TextareaAutosize minRows={4} name="body" placeholder="Enter post body" required onChange={(e)=>setBody(e.target.value)} className="post-body-field"/>
      <Button variant="contained" type="submit">Submit</Button>
     </form>
    
      
    </Box>
  </Modal>

  );
};
export default CreatePost;
