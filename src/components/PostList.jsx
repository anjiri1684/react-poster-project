import Post from "./Post";
import classes from "./PostList.module.css";
import { useEffect, useState } from "react";

function PostList({}) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      const response = await fetch("http://localhost:8080/posts");
      const resdata = await response.json();
      setPosts(resdata.posts);
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    setPosts((existingPosts) => [postData, ...existingPosts]);
  }
  return (
    <>
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post
              key={(post = Math.random())}
              author={post.author}
              body={post.body}
            />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white " }}>
          <h2>No posts yet</h2>
          <p>Start add some! click on new post Button</p>
        </div>
      )}
      {isFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default PostList;
