"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TextInput } from "@/components/ui/inputs/text-input";
import { PrimaryButton } from "@/components/ui/buttons/primary-btn";
import { toast } from "sonner";
import { client } from "@/lib/client";
import { LoginResponse } from "@/interfaces/login-user-details";
import { AuthStatesContext } from "@/contexts/auth-context";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const { user, setUser, token, setToken } = AuthStatesContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //I can use react 19 or form validation library as well for the form validation as well
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast("Please fill the email");
      return;
    } else if (!password) {
      toast("Please fill the password");
      return;
    } else if (password.length < 6) {
      toast("Password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      const res = await client.post("/users/signin", {
        email,
        password,
      });

      const loginRes: LoginResponse = res.data;
      const temp = loginRes.user;
      if (temp) {
        await axios.post("/api/auth/signin", {
          user: temp,
        });
        localStorage.setItem("task-user", JSON.stringify(temp));
        localStorage.setItem("task-token", JSON.stringify(loginRes.token));
        setUser(temp);
        setToken(loginRes.token);
        toast("User signin successfully!");
      } else {
        toast("seems to be something bad!");
      }
    } catch (e) {
      console.log(e);
      toast("Invalid error occured");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      router.push("/user");
    }
  }, [user, token]);
  return (
    <div className="flex items-center gap-10 max-lg:flex-col max-lg:gap-6 max-lg:p-4 max-lg:h-screen max-lg:overflow-y-auto">
      <div className="w-1/2 flex flex-col justify-center items-start p-10 max-lg:w-full max-lg:p-4 max-lg:items-center">
        <h1>Logo</h1>
        <h2 className="text-h2 font-boldest mt-4 max-lg:text-center">
          Welcome To Task Management!
        </h2>
        <p className="text-black text-start max-w-md text-p2 py-4 max-lg:text-center">
          Create and manage your personalized tasks with a super easy way.
        </p>
        <p className="font-bold mt-2 text-p2 max-lg:text-center">
          Trusted by thousands of users
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[500px] flex flex-col justify-start items-start bg-white p-10 rounded-md shadow-lg max-lg:w-full max-lg:p-6 max-lg:max-w-md"
      >
        <h2 className="text-h3 font-boldest">Log In</h2>
        <p className="text-textGrayShade mt-2 text-start max-lg:text-center">
          Enter your username and password to log in for access.
        </p>
        <form onSubmit={handleSubmit} className="w-full mt-4 space-y-4">
          <TextInput
            title="Email Address"
            placeholder="Email Address"
            setValue={setEmail}
            type="email"
            value={email}
            className=""
          />
          <TextInput
            title="Password"
            placeholder="Password"
            setValue={setPassword}
            type="password"
            value={password}
            className=""
          />

          <div className="flex justify-between w-full text-sm text-gray-600 py-1 max-lg:flex-col max-lg:items-start max-lg:gap-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox w-4 h-4 accent-[var(--color-primary)]"
              />
              <span>Remember me</span>
            </label>
            <Link href="#" className="text-textGray hover:underline">
              Forgot password?
            </Link>
          </div>
          <PrimaryButton
            loading={loading}
            onClick={handleSubmit}
            className="bg-[var(--color-primary)] max-lg:w-full"
          >
            Login
          </PrimaryButton>
          <p className="text-gray-600 text-sm text-start mt-7 max-lg:text-center">
            Don’t have an account yet?{" "}
            <Link
              href="/signup"
              className="text-[var(--color-primary)] hover:underline font-bolder"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignInPage;
