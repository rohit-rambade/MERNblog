import Post from "../Post";
import { useEffect, useState } from "react";
import emoji from "../images/sad.png";
export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <div className="flex flex-col  bg-white  ">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="w-full" key={post.id}>
            <Post {...post} />
          </div>
        ))
      ) : (
        <>
          <div class="flex flex-col justify-center items-center h-screen  bg-no-post bg-no-repeat bg-center"></div>
        </>
      )}
    </div>
  );
}
