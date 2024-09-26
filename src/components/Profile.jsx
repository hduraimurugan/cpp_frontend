import { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Edit2, Loader2, Mail, Pen, UploadIcon } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useDispatch, useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        file: user?.profile?.profilePhoto || ""
    });

    const profileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (input.file) {
            formData.append("file", input.file);
        }
        // if(input.profile){
        //     formData.append("profile", input.profile);
        // }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile_picture/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }

    return (
        <div>
            <Navbar />
            <div className='w-3/4 md:w-auto max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center justify-center gap-4'>
                        <form className='flex items-center gap-3 ' onSubmit={submitHandler}>
                            <Label htmlFor="file" className="text-right flex  hover:cursor-pointer">
                                <Avatar className="md:h-24 md:w-24 h-12 w-12">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto || "https://res.cloudinary.com/dmuz0dq5b/image/upload/v1727067985/user_profile/rgskafgdibv4gltvhs8m.png"}
                                        alt={user?.profile?.username || "default avatar"}
                                    />
                                </Avatar><Edit2 size={15} />
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={profileChangeHandler}
                                    className="col-span-3 hidden"
                                /></Label>
                            {
                                loading ? <Button size="icon"> <Loader2 className='h-4 w-4 animate-spin' /></Button> :
                                    <>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button size="icon" type="submit" ><UploadIcon className='h-4 w-4' /></Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Update Profile Pic</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </>
                            }
                        </form>

                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={() => setOpen(true)} className="text-right " variant="outline"><Pen /></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Update Profile</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className='my-5'>
                    <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                    <p>{user?.profile?.bio}</p>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex flex-wrap items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl w-3/4 md:w-auto mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile