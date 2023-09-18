import { getPosts } from "../../utils/getPosts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import "./style.css";
import CreatePost from "../CreatePost/CreatePost";
import EditPost from "../EditPost";
import DeletePost from "../DeletePost";

const Posts = () => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", { userId: 1 }],
    queryFn: getPosts,
  });
  const handleOpen = () => setOpen(true);
  const handleEditModalOpen = () => setOpenEditModal(true);
  const handleDeleteModalOpen = () => setOpenDeleteModal(true);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>There was an error fetching posts</div>;
  }
  return (
    <>
      <div className="posts-header">
        <h1>Posts</h1>
        <button onClick={handleOpen}>Add Post</button>
      </div>

      <div className="posts-container">
        {data.map((item) => (
          <div className="posts-item" key={item.id}>
            <h2>{item.title}</h2>
            <hr />
            <p>{item.body}</p>
            <hr />
         
         <div className="action-buttons">
         <Button
              variant="contained"
              onClick={() => {
                handleEditModalOpen();
                setActiveIndex(item.id);
              }}
            >
              Update
            </Button>
         <Button
            className="delete"
            color="warning"
              variant="contained"
              onClick={() => {
                handleDeleteModalOpen();
                setActiveIndex(item.id);
              }}
            >
              Delete
            </Button>
         </div>
          </div>
        ))}
      </div>
      {open && <CreatePost open={open} setOpen={setOpen} />}
      {openEditModal && (
        <EditPost
          open={openEditModal}
          setOpen={setOpenEditModal}
          postId={activeIndex}
        />
      )}

      {openDeleteModal && (
        <DeletePost open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        postId={activeIndex}
        
        />
      )}
    </>
  );
};
export default Posts;
