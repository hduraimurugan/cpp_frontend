import { useState } from "react";
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { LogOut, User2, Menu } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { USER_API_END_POINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"

import axios from "axios"

const Navbar = () => {

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className="bg-white">

                <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl h-16 md:px-6">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">College Placement<span className="text-[#F83006]"> Portal</span></h1>
                    </div>

                    {/* Hamburger Icon for Mobile */}
                    <div className="md:hidden">
                        <Button variant="ghost" onClick={toggleMenu}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-7">
                        <ul className="flex font-medium items-center gap-5">
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li><Link to="/admin/companies">Companies</Link></li>
                                        <li><Link to="/admin/jobs">Jobs</Link></li>
                                    </>
                                ) : user && user.role === 'admin' ? (
                                    <>
                                        <li><Link to="/admin/main">Admin</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/jobs">Jobs</Link></li>
                                        <li><Link to="/browse">Browse</Link></li>
                                    </>
                                )
                            }
                        </ul>

                        {
                            !user ? (
                                <div className="flex items-center gap-2">
                                    <Link to={'/login'}><Button variant="outline">Login</Button></Link>
                                    <Link to={'/signup'}><Button className='bg-[#1a8e1a] hover:bg-[#1a5d1a]'>Sign up</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || "https://res.cloudinary.com/dmuz0dq5b/image/upload/v1727067985/user_profile/rgskafgdibv4gltvhs8m.png"}
                                                alt={user?.profile?.username || "default avatar"}
                                            />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className=''>
                                            <div className='flex gap-2 space-y-2'>
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage
                                                        src={user?.profile?.profilePhoto || "https://res.cloudinary.com/dmuz0dq5b/image/upload/v1727067985/user_profile/rgskafgdibv4gltvhs8m.png"}
                                                        alt={user?.profile?.username || "default avatar"}
                                                    />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }

                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>

                {/* Mobile Menu */}
                {
                    isMenuOpen && (
                        <div className="md:hidden bg-gray-50 shadow-md">
                            <ul className="p-4 space-y-4">
                                {
                                    user && user.role === 'recruiter' ? (
                                        <>
                                            <li><Link to="/admin/companies">Companies</Link></li>
                                            <li><Link to="/admin/jobs">Jobs</Link></li>
                                        </>
                                    ) : user && user.role === 'admin' ? (
                                        <>
                                            <li><Link to="/admin/main">Admin</Link></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="/jobs">Jobs</Link></li>
                                            <li><Link to="/browse">Browse</Link></li>
                                        </>
                                    )
                                }
                            </ul>

                            {
                                !user ? (
                                    <div className="flex flex-col items-center gap-2 pb-4">
                                        <Link to={'/login'}><Button variant="outline">Login</Button></Link>
                                        <Link to={'/signup'}><Button className='bg-[#1a8e1a] hover:bg-[#1a5d1a]'>Sign up</Button></Link>
                                    </div>
                                ) : (
                                    <div className="p-4">
                                        <div className='flex gap-2 mb-4'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage
                                                    src={user?.profile?.profilePhoto || "https://res.cloudinary.com/dmuz0dq5b/image/upload/v1727067985/user_profile/rgskafgdibv4gltvhs8m.png"}
                                                    alt={user?.profile?.username || "default avatar"}
                                                />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer mb-2'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
            <Separator />
        </>
    )
}

export default Navbar
