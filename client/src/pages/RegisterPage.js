import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registration successful");
    } else {
      alert("registration failed");
    }
  }
  return (
    <div className="container flex justify-center flex-col mt-10 font-Poppins sm:w-3/4 lg:w-1/2">
      <form
        className="flex flex-col w-full gap-y-2 border p-4 rounded-lg"
        onSubmit={register}
      >
        <h1 className="text-center text-2xl">Register</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="p-2 bg-blue-600 text-white hover:bg-blue-500">
          Register
        </button>
      </form>
    </div>
  );
}
