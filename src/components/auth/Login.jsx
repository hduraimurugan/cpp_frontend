import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
import { useState } from "react"
import { toast } from "sonner"
import { USER_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const Login = () => {
    const [input, setInput] = useState({

        email: "",
        password: "",
        role: "",
    });

    const { loading } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user)) 
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }

    }

    return (
        <div>
            <Navbar />

            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="md:w-1/2 w-3/4 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl text-center mb-5">Login</h1>

                    <div className="my-2">
                        <Label>Email:</Label>
                        <Input
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            name="email"
                            placeholder="Enter your mail id"

                        />
                    </div>

                    <div className="my-2">
                        <Label>Password:</Label>
                        <Input
                            type="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            name="password"
                            placeholder="Enter your password"

                        />
                    </div>
                    <div className="my-2 flex items-center justify-between">
                        <RadioGroup className='flex items-center my-5 gap-4'>
                            {/* <Label>Role:</Label> */}
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={input.role === "admin"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r3">Admin</Label>
                            </div>
                        </RadioGroup>

                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-[#1a8e1a] hover:bg-[#1a5d1a]">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
                            : <Button type="submit" className="w-full my-4 bg-[#1a8e1a] hover:bg-[#1a5d1a]">Login</Button>
                    }

                    <span className="text-sm">Don&apos;t have an account?
                        <Link to={'/signup'} className="text-green-700"> Sign up for free</Link></span>

                </form>
            </div>
        </div>
    )
}

export default Login