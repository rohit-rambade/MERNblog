import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id, userInfo]);
  const handleDelete = () => {
    fetch(`http://localhost:4000/post/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      navigate("/");
    });
  };
  if (!postInfo) return "";

  return (
    <div>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 ">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <div className="mb-4 lg:mb-6 not-format">
              <div>
                {userInfo.id === postInfo.author._id && (
                  <div>
                    <Link to={`/edit/${postInfo._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                    {isAuthor && (
                      <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2"
                      >
                        Delete Post
                      </button>
                    )}
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-4 py-2"
                    >
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 ">
                      {postInfo.title}
                    </h1>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      by @{postInfo.author.username}
                    </p>

                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
                    </p>
                  </div>
                </div>
              </div>
              <img
                src={`http://localhost:4000/${postInfo.cover}`}
                alt=""
                className="object-cover"
              />
            </div>

            <div
              className="mb-4  leading-tight text-gray-900 lg:mb-6  "
              dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />
          </article>
          <div />
        </div>
      </main>
    </div>
  );
}
