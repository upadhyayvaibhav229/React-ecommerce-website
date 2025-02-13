import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../Features/authSlice";
// import { login } from "../store/authSlice";
// import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const handleFormSubmit = async (data) => {
  //     try {
  //       const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  //       console.log("Register User Successfully", userCredential.user);
  //       navigate("/"); // Navigate to dashboard after signup

  //       // Store user data in Firestore
  //       const db = getFirestore();
  //       const userDocRef = doc(db, "users", userCredential.user.uid);
  //       await setDoc(userDocRef, {
  //         email: data.email,
  //         name: data.name,
  //       });
  //       toast.success("Welcome to Forever");
  //     } catch (error) {
  //       setError(error.message);
  //       console.error(error.message);
  //     }
  //   };

  const handleFormSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
        data.phone
      );
      const user = userCredential.user;

      // Dispatch login action immediately after signup
      dispatch(login({ uid: user.uid, email: user.email }));

      // Store user data in Firestore
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        email: data.email,
        name: data.name,
        phone: data.phone,
      });

      // Navigate to home page after signup
      navigate("/login");
    } catch (error) {
      setError(error.message);
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
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
            <Input
              label="Phone Number: "
              placeholder="Enter your phone number"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-600">{errors.phone.message}</p>
            )}

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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
