"use client";

import { useLoginForm } from "../hooks/useLoginForm";
import Input1 from "./general/inputs/Input1";
import Button1 from "./general/buttons/Button1";
import { MdOutlinePersonOutline } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const LoginForm = () => {
  const {
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    formData,
  } = useLoginForm();

  return (
    <div className="max-w-[95%] sm:max-w-md w-full bg-white/10 backdrop-blur-md relative z-10 flex justify-center items-center p-6 sm:p-10">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
        <fieldset className="w-full flex justify-between items-center border-b border-white pb-3">
          <Input1
            type="text"
            className="w-full text-white outline-none border-none bg-transparent placeholder-white"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            name="username"
          />
          <MdOutlinePersonOutline className="text-white text-2xl" />
        </fieldset>

        <fieldset className="w-full flex justify-between items-center border-b border-white pb-3">
          <Input1
            type={showPassword ? "text" : "password"}
            className="w-full text-white outline-none border-none bg-transparent placeholder-white"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            name="password"
          />
          {showPassword ? (
            <VscEye
              role="eye-open"
              className="text-white text-2xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <VscEyeClosed
              role="eye-closed"  
              className="text-white text-2xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </fieldset>

        <Button1 type="submit">Login</Button1>
      </form>
    </div>
  );
};

export default LoginForm;
