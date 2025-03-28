import Image from "next/image"
import LoginImg from "@/public/login-bg.webp"
import LoginForm from "./loginForm"

const Login = () => {
    return (
        <div className="w-full h-[100vh] overflow-hidden relative">
            <Image className="w-full h-[100%] absolute object-cover top-0 left-0 z-0" src={LoginImg} alt="Login PG" width={1000} height={1000} />
            <LoginForm />
        </div>
    )
}

export default Login