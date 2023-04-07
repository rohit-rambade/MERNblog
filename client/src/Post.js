import { formatDistanceToNow, formatISO9075 } from "date-fns";
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
    <div className="border-4  hover:border-l-black transition duration-300 font-Poppins p-6 m-2 border-white ">
      <div className="sm:grid  sm:grid-cols-2">
        <article className="grid mb-4 sm:mb-0 gap-y-3 sm:gap-0 grid-row-2">
          <header>
            <h2 className="text-2xl sm:text-3xl font-bold hover:underline">
              <Link to={`/post/${_id}`}>{title}</Link>
            </h2>
          </header>

          <>
            {summary.length > THRESHOLD && (
              <>
                <p className="flex flex-col">
                  <span>
                    {showFullText
                      ? summary
                      : `${summary.slice(0, THRESHOLD)}...`}
                  </span>
                  <button
                    className="inline-flex items-center  text-base text-blue-900"
                    onClick={() => setShowFullText(!showFullText)}
                  >
                    {showFullText ? "Hide" : "Read More"}
                  </button>
                </p>
              </>
            )}

            {summary.length <= THRESHOLD && <p>{summary}</p>}
          </>

          <footer className="flex flex-col gap-y-2 text-sm">
            <p className="flex gap-x-1   items-center">
              <svg
                className="w-5 sm:w-8"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <path d="M 256 28 A 228 228 0 0 0 94.779297 417.2207 A 228 228 0 1 0 417.2207 94.779297 A 226.51 226.51 0 0 0 256 28 z M 256 48 C 370.691 48 464 141.309 464 256 A 207.435 207.435 0 0 1 399.25195 406.66992 L 399.25195 403.71289 C 399.25195 324.72489 334.98995 260.46289 256.00195 260.46289 C 177.01395 260.46289 112.75195 324.72489 112.75195 403.71289 L 112.75195 406.67383 A 207.435 207.435 0 0 1 48 256 C 48 141.309 141.309 48 256 48 z M 256.45508 95.146484 A 77.308 77.308 0 1 0 333.76367 172.45508 A 77.4 77.4 0 0 0 256.45508 95.146484 z M 254.07227 115.19727 A 57.308 57.308 0 0 1 313.76367 172.45508 A 57.373 57.373 0 0 1 256.45508 229.76367 A 57.308 57.308 0 0 1 254.07227 115.19727 z M 259.59961 280.51367 A 123.25 123.25 0 0 1 379.25195 403.71094 L 379.25195 423.44141 A 207.546 207.546 0 0 1 132.75195 423.44141 L 132.75195 403.71094 A 123.25 123.25 0 0 1 259.59961 280.51367 z"></path>
              </svg>
              <path d="M 24 4 C 18.494917 4 14 8.494921 14 14 C 14 19.505079 18.494917 24 24 24 C 29.505083 24 34 19.505079 34 14 C 34 8.494921 29.505083 4 24 4 z M 24 7 C 27.883764 7 31 10.116238 31 14 C 31 17.883762 27.883764 21 24 21 C 20.116236 21 17 17.883762 17 14 C 17 10.116238 20.116236 7 24 7 z M 11.978516 28 C 9.7987044 28 8 29.798705 8 31.978516 L 8 33.5 C 8 37.104167 10.27927 39.892227 13.306641 41.5625 C 16.334011 43.232773 20.168103 44 24 44 C 27.831897 44 31.665989 43.232773 34.693359 41.5625 C 37.274641 40.138345 39.217335 37.862616 39.761719 35 L 40.001953 35 L 40.001953 31.978516 C 40.001953 29.798705 38.201295 28 36.021484 28 L 11.978516 28 z M 11.978516 31 L 36.021484 31 C 36.579674 31 37.001953 31.420326 37.001953 31.978516 L 37.001953 32 L 37 32 L 37 33.5 C 37 35.895833 35.65427 37.607773 33.244141 38.9375 C 30.834011 40.267227 27.418103 41 24 41 C 20.581897 41 17.165989 40.267227 14.755859 38.9375 C 12.34573 37.607773 11 35.895833 11 33.5 L 11 31.978516 C 11 31.420326 11.420326 31 11.978516 31 z"></path>

              <h1>{author.username}</h1>
            </p>
            <time>
              <span>Created : </span>
              {formatISO9075(new Date(createdAt))}
            </time>
            <time dateTime={formatISO9075(new Date(createdAt))}>
              {formatDistanceToNow(new Date(createdAt))} ago
            </time>
          </footer>
        </article>

        <div className="sm:w-1/2 ml-auto">
          <Link to={`/post/${_id}`}>
            <img className=" " src={"http://localhost:4000/" + cover} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}
