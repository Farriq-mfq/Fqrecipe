import React from "react";
import { useMutation } from "react-query";
import { signInRequest } from "../../requests/auth.request";
type Props = {};

export default function Login({}: Props) {
  const { status, mutate } = useMutation(signInRequest,{});
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutate({
      email: "farriq@gmail.com",
      password: "farriq",
    });
  };
  return (
    <div>
      <div className="h-12 bg-warning items-center flex justify-center">
        <h1 className="font-semibold text-2xl">Login to FqRecipe</h1>
      </div>
      <form onSubmit={handleLogin}>
        <div className="p-5">
          <div className="form-control my-4">
            <input
              type="text"
              className="input input-bordered"
              placeholder="Email"
            />
          </div>
          <div className="form-control my-4">
            <input
              type="password"
              className="input input-bordered"
              placeholder="Password"
            />
          </div>
          <div className="grid">
            <button className="btn btn-warning">Login</button>
          </div>
          <p className="mt-2 text-blue-600 text-center">
            Don't have account ? <a href="">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}
