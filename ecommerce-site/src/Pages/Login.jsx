import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../Features/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
  
      // Dispatch login action with user details
      dispatch(login({ uid: user.uid, email: user.email }));
  
      // Navigate to home page
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError(error.message);
      }
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
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-5">
            <label>Email:</label>
            <input
              type="email"
              className="border p-2 w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}

            <label>Password:</label>
            <input
              type="password"
              className="border p-2 w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
