import { getSinglePosts } from "../../utils/getSinglePost";
import { updatePost } from "../../utils/updatePost";
import { getPosts } from "../../utils/getPosts";
import { deletePost } from "../../utils/deletePost";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeletePost = ({ setOpen, open, postId }) => {
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["posts", {userId:1}],
    queryFn: getPosts,
  });

  const mutation = useMutation({
    mutationFn: () => deletePost( postId),
    onSuccess: () => {
      queryClient.setQueryData(["posts", {userId:1}], 
     (currentData) => currentData ? data.filter(item=>item.id !== postId): 
  data
      );
    },
    onError: (error) => {
      return <h2>Error deleting post {error}</h2>;
    },
  });

  const handleDeletePost = () => {
    mutation.mutate()
    setOpen(false)

  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="formtitle" variant="h5" component="h5">
            Delete Post
          </Typography>
          <hr/>
          <Typography id="formtitle" variant="p" component="p">
           Are your sure you want to delete this post?
          </Typography>
          <div className="delete-buttons">
          <Button onClick={handleDeletePost} variant="contained" className="delete"> Delete</Button>
          <Button onClick={()=>setOpen(false)} variant="outlined"> Cancel</Button>
          </div>

       
      
        </Box>
      </Modal>
    </div>
  );
};
export default DeletePost;
