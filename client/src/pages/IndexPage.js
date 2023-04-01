import Post from "../Post";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col px-6 bg-white  ">
      {posts.length > 0 &&
        posts.map((post) => (
          <div className="w-full">
            <Post {...post} />
          </div>
        ))}
    </div>
  );
}
