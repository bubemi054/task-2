"use client";

import { useLoginForm } from "../hooks/login";
import { MdOutlinePersonOutline } from "react-icons/md";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const LoginForm = () => {
  const {
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    formData,
  } = useLoginForm();

  return (
    <div className="w-[484px] h-full bg-white/10 relative border-r-2 border-white z-3 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[60%] flex flex-col gap-[50px]"
      >
        <fieldset className="w-full flex justify-between items-end border-b-1 border-white pb-3">
          <input
            type="text"
            className="w-full text-white outline-none border-none bg-white/0"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            name="username"
          />
          <MdOutlinePersonOutline className="text-white text-[25px]" />
        </fieldset>

        <fieldset className="w-full flex justify-between items-end border-b-1 border-white pb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full text-white outline-none border-none bg-white/0"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            name="password"
          />
          {showPassword ? (
            <VscEye
              className="text-white text-[25px]"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <VscEyeClosed
              className="text-white text-[25px]"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </fieldset>

        <button className="bg-white font-medium rounded-[5px] p-2 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
