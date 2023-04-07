import { formatISO9075 } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  const [showFullText, setShowFullText] = useState(false);
  const THRESHOLD = 200;

  return (
    <div className="bg-white  text-white dark:bg-gray-900  font-Poppins p-6 border-b border-dotted border-white ">
      <div className="flex flex-col gap-y-4">
        <div className="sm:grid  sm:grid-cols-2">
          <div className="">
            <div className="mb-2">
              <Link to={`/post/${_id}`}>
                <h2 className="text-2xl sm:text-3xl hover:underline">
                  {title}
                </h2>
              </Link>
            </div>
            {summary.length > THRESHOLD && !showFullText ? (
              <div className="">
                <p className="">{summary.slice(0, THRESHOLD)}...</p>
                <button
                  className="inline-flex items-center py-2 mr-auto space-x-2 text-sm sm:text-base text-blue-900"
                  onClick={() => setShowFullText(true)}
                >
                  Read More
                </button>
              </div>
            ) : (
              <div>
                <p>{summary}</p>
                {summary.length > THRESHOLD && (
                  <button
                    className="inline-flex items-center py-2 space-x-2 text-sm sm:text-base text-blue-900"
                    onClick={() => setShowFullText(false)}
                  >
                    Hide
                  </button>
                )}
              </div>
            )}
            <div className="">
              <p className="flex flex-col text-sm sm:text-base">
                <a className="author">
                  <i className="fa-solid fa-user"></i> {author.username}
                </a>
              </p>
              <time>{formatISO9075(new Date(createdAt))}</time>
            </div>
          </div>

          <div className="sm:w-1/2 ml-auto">
            <Link to={`/post/${_id}`}>
              <img
                className=" "
                src={"http://localhost:4000/" + cover}
                alt=""
              />
            </Link>
          </div>
          {/* <div className="gap-x-4">
            <img src={cover} alt="" />
            <p className="flex flex-col text-sm sm:text-base">
              <a className="author">
                <i className="fa-solid fa-user"></i> {author.username}
              </a>
            </p>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </div> */}
        </div>
      </div>
    </div>
  );
}
