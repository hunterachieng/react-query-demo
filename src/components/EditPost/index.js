import { getSinglePosts } from "../../utils/getSinglePost";
import { updatePost } from "../../utils/updatePost";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/material";
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

const EditPost = ({ setOpen, open, postId }) => {
  const handleClose = () => setOpen(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: "", body: "" });

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singlePost", postId],
    queryFn: () => getSinglePosts(postId),
  });
  const mutation = useMutation({
    mutationFn: (newData) => updatePost({ data: newData, postId }),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["posts", {userId: variables.userId}], (currentData) =>
      currentData? currentData.map(post => {
        if(post.id === data.id){
            return data
        }
        return post;
    }) : [data]
      );
    },
    onError: (error) => {
      return <h2>Error editing post {error}</h2>;
    },
  });
  const toggleEditing = () => {
    if (isEditing && data) {
      setFormData({ title: data.title, body: data.body });
    }
    setIsEditing(!isEditing);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const bodyData = {
      ...formData,
      userId: 1,
    };
    mutation.mutate(bodyData);
    setIsEditing(false);
    setOpen(false);
  };
if(isLoading){
    return <h1>Loading ...</h1>
}

if(isError){
    return <h1>There was an error fetching post</h1>
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
          <Typography id="formtitle" variant="h4" component="h2">
            Edit Post
          </Typography>
          <Button onClick={toggleEditing} variant="outlined">{isEditing ? 'Cancel' : 'Click to Edit'}</Button>
          <form className="edit-form" onSubmit={handleFormSubmission}>
            <TextField
              type="text"
              name="title"
              value={isEditing ?  formData?.title:data?.title }
            //   defaultValue={data?.title}
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="edit-title-field"
            />
            <TextareaAutosize
              minRows={4}
              name="body"
              value={ isEditing ?  formData?.body :data?.body}
            //   defaultValue={data?.body}
              required
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              className="edit-body-field"
            />
            {isEditing &&  <Button variant="contained" type="submit">
              Edit Post
            </Button>}
            
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default EditPost;
