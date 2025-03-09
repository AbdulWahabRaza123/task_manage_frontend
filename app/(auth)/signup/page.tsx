"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { TextInput } from "@/components/ui/inputs/text-input";
import { PrimaryButton } from "@/components/ui/buttons/primary-btn";
import { toast } from "sonner";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //I can use react 19 or form validation library as well for the form validation as well
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast("Please fill the email");
      return;
    } else if (!name) {
      toast("Please fill the name");
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
      const res = await client.post("/users/signup", {
        email,
        password,
        name,
      });
      router.push("/");
      toast("User created successfully!");
    } catch (e) {
      console.log(e);
      toast("Invalid error occured");
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-h3 font-boldest">Sign Up</h2>
        <p className="text-textGrayShade mt-2 text-start max-lg:text-center">
          Create your account by filling in your details.
        </p>
        <form onSubmit={handleSubmit} className="w-full mt-4 space-y-4">
          <TextInput
            title="Name"
            placeholder="Name"
            setValue={setName}
            type="text"
            value={name}
            className=""
            icon="/assets/icons/user.svg"
          />
          <TextInput
            title="Email"
            placeholder="Email"
            setValue={setEmail}
            type="email"
            value={email}
            icon="/assets/icons/email.svg"
            className="mb-2"
          />
          <TextInput
            title="Password"
            placeholder="Password"
            setValue={setPassword}
            type="password"
            value={password}
            className=""
            icon="/assets/icons/lock.svg"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox w-4 h-4 accent-[var(--color-primary)]"
            />
            <div className="text-textGray">
              I agree to accept{" "}
              <span className="underline text-[var(--color-primary)]">
                Terms & Conditions
              </span>
            </div>
          </div>
          <PrimaryButton
            onClick={handleSubmit}
            loading={loading}
            className="bg-[var(--color-primary)] max-lg:w-full"
          >
            Signup
          </PrimaryButton>

          <p className="text-gray-600 text-sm text-start mt-7 max-lg:text-center">
            Don’t have an account yet?{" "}
            <Link
              href="/"
              className="text-[var(--color-primary)] hover:underline font-bolder"
            >
              Log In
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
