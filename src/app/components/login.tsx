import Image from "next/image";
// import LoginImg from "@/public/login-bg.webp";
// import LoginForm from "./LoginForm";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden relative flex items-center justify-center">
      <Image
        className="w-full h-full absolute object-cover top-0 left-0 z-0"
        src={""}
        alt="Login BG"
        layout="fill"
        priority
      />
      <LoginForm />
    </div>
  );
};

export default Login;
