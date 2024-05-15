// components/LoginForm.js
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const Router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username: name,
      password: password,
    });
    if (result && result.error) {
      // Handle error
      console.error(result.error);
    } else {
      // Redirect or handle success
      console.log("Logged in successfully");
    }
  };

  return (
    <div className="flex flex-col p-4 rounded-md h-full w-full m-auto items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" bg-slate-300 h-fit w-fit p-4 rounded-md items-center justify-center"
      >
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl">Sign In</h1>
          <div className="h-1 w-full bg-slate-500 rounded-md"></div>
          <div className="flex flex-row justify-between">
            Name
            <input
              className="w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between">
            Password
            <input
              className="w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white rounded-md p-2"
            type="submit"
          >
            Sign In
          </button>
          <button
            className="bg-blue-500 text-white rounded-md p-2"
            type="button"
            onClick={() => Router.push("/signup")}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
