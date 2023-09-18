import { getPosts } from "../../utils/getPosts";
import { useQuery } from "@tanstack/react-query";
import "./style.css";

const Posts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>There was an error fetching posts</div>;
  }
  return (
    <>
      <h1>Posts</h1>

      <div className="posts-container">
        {data.map((item) => (
          <div className="posts-item" key={item.id}>
            <h2>{item.title}</h2>
            <hr />
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Posts;
