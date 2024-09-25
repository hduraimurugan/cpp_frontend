import { Link, useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
import { useState } from "react"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/redux/authSlice"


const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        
        if (input.file) {
            formData.append("file", input.file);
        }
    
        // Debug: Log formData to see the actual content
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
    
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
    
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong');
            }
            console.log(error);
        }finally {
            dispatch(setLoading(false));
        }
    };
    

    return (
        <div>
            <Navbar />

            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="md:w-1/2 w-3/4 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl text-center mb-5">Sign up</h1>
                    <div className="my-2">
                        <Label>Full Name:</Label>
                        <Input
                            type="text"
                            value={input.fullname} 
                            onChange={changeEventHandler} 
                            name="fullname"
                            placeholder="Enter your full name"

                        />
                    </div>
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
                        <Label>Phone Number:</Label>
                        <Input
                            type="number"
                            value={input.phoneNumber} 
                            onChange={changeEventHandler} 
                            name="phoneNumber"
                            placeholder="Enter your phone number"

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
                            {/* <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={input.role === "admin"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r3">Admin</Label>
                            </div> */}
                        </RadioGroup>
                        <div className='items-center gap-2 md:flex hidden'>
                            <Label>Profile:</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className='items-center gap-2 flex md:hidden'>
                            <Label>Profile:</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>

                    {
                        loading ? <Button className="w-full my-4 bg-[#1a8e1a] hover:bg-[#1a5d1a]">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
                            : <Button type="submit" className="w-full my-4 bg-[#1a8e1a] hover:bg-[#1a5d1a]">Sign up</Button>
                    }

                    
                    <span className="text-sm">Already have an account?<Link to={'/login'} className="text-green-700"> Login</Link></span>

                </form>
            </div>
        </div>
    )
}

export default Signup