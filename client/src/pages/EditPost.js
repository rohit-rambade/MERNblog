import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div className="container border  flex justify-center flex-col mt-10 font-Poppins sm:w-3/4 lg:w-1/2">
      <form onSubmit={updatePost} className="flex flex-col gap-y-4 mt-2">
        <input
          className="p-2 border"
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          className="p-2 border"
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input
          className="p-2"
          type="file"
          onChange={(ev) => setFiles(ev.target.files)}
        />
        <Editor onChange={setContent} value={content} />
        <button
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          style={{ marginTop: "5px" }}
        >
          Update post
        </button>
      </form>
    </div>
  );
}
