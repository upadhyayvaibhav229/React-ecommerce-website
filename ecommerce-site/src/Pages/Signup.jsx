import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../Features/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
  try {
    await dispatch(registerUser(data)).unwrap();
    if(data.email !== data.email || data.username !== data.username){
      toast.error("Email or Username is already in use");
    }
    toast.success("Account created successfully");
    navigate("/login"); // ✅ navigate regardless of returned user
  } catch (err) {
    setServerError(err || "Registration failed");
  }
};


  return (
    <div className="flex items-center justify-center font-serif mt-5">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <button
            onClick={() => navigate("/login")}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </button>
        </p>

        {(serverError || error) && (
          <p className="text-red-600 mt-4 text-center">
            {serverError || error}
          </p>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-5">
            {/* ✅ Full Name */}
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <p className="text-red-600">{errors.fullName.message}</p>
            )}

            {/* ✅ Username */}
            <Input
              label="Username: "
              placeholder="Choose a username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}

            {/* Email */}
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            {/* Password */}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
