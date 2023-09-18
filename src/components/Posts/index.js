import { getPosts } from "../../utils/getPosts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./style.css";
import CreatePost from "../CreatePost/CreatePost";

const Posts = () => {
    const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", {userId:1}],
    queryFn: getPosts,
  });
  const handleOpen = () => setOpen(true);
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
          </div>
        ))}
      </div>
      {open && <CreatePost open={open} setOpen={setOpen}/>}
    </>
  );
};
export default Posts;
