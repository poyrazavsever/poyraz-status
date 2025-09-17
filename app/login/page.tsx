"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { login } from "./action";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
    try {
      await login(formData);
      toast.success("Welcome");
    } catch (err: any) {
      toast.error("Hahaha");
      setError(err?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col justify-start items-start w-full max-w-sm m-8"
    >
      <div className="flex flex-col items-start gap-2 w-full">
        <h1 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
          Login
        </h1>
        <p className="max-w-xl text-neutral-600 dark:text-neutral-400 text-sm mb-2">
          Welcome back! Please login to continue.
        </p>
      </div>
      <form
        className="flex flex-col gap-4 w-full mt-4"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-xs text-neutral-400 font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-800 dark:text-neutral-100 outline-none focus:border-neutral-400 dark:focus:border-neutral-700 transition"
            autoComplete="email"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-xs text-neutral-400 font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-800 dark:text-neutral-100 outline-none focus:border-neutral-400 dark:focus:border-neutral-700 transition"
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-4 py-2 cursor-pointer rounded-md bg-neutral-800 dark:bg-neutral-700 text-neutral-100 dark:text-neutral-100 text-sm font-semibold transition-colors hover:bg-neutral-900 dark:hover:bg-neutral-800 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </motion.div>
  );
};

export default Login;
