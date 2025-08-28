import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { login } from "../Features/authSlice";
import { loginUser } from "../Features/authSlice";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState("");


  const handleLogin = async (data) => {
    try {
      const result = await dispatch(
        loginUser({
          identifier: data.identifier,
          password: data.password
        })
      ).unwrap();
      // console.log(result);

       if (result) {
         toast.success("User logged in successfully");
         navigate("/");
       } else {
         toast.error("Invalid credentials");
       }
    } catch (error) {
      setServerError(error || "Login failed");
    }
  };


  return (
    <div className="flex items-center justify-center font-serif mt-5">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold leading-tight">Login</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don't have an account?&nbsp;
          <button
            onClick={() => navigate("/sign-up")}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </button>
        </p>

        {(serverError || error) && (
          <p className="text-red-600 mt-4 text-center">
            {serverError || error}
          </p>
        )}

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-5">
            <label>Email or Username:</label>
            <input
              type="text"
              className="border p-2 w-full"
              {...register("identifier", { required: "Email or Username is required" })}
            />
            {errors.identifier && (
              <p className="text-red-600">{errors.identifier.message}</p>
            )}

            <label>Password:</label>
            <input
              type="password"
              className="border p-2 w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
