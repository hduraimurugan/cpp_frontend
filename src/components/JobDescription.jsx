import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Avatar, AvatarImage } from './ui/avatar';
import store from '@/redux/store';
import { setLoading } from '@/redux/jobSlice';
import { Skeleton } from './ui/skeleton';

const JobDescription = () => {
    const { singleJob, loading } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {

        if (!user) {
            toast.error("Please log in as Student to apply for a job");
            navigate('/login');
            return;
        }
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                dispatch(setLoading(true))
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return <>
        {loading ? (
            <div className="flex md:flex-row flex-col items-center mx-auto container mt-10 px-20">
                {/* Loading Skeleton */}
                <div>
                    <Skeleton className="h-16 w-16 rounded-full" />
                </div>
                <div className="flex flex-col gap-4 px-5 py-5 justify-center ">
                    <div className="flex md:flex-row flex-col items-center gap-4 space-x-5">
                        <Skeleton className="h-4 w-[300px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <div className="flex md:flex-row flex-col items-center gap-4 space-x-5">
                        <Skeleton className="h-4 w-[300px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <div className="flex md:flex-row flex-col items-center gap-4 space-x-5">
                        <Skeleton className="h-4 w-[300px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <div className="flex md:flex-row flex-col items-center gap-4 space-x-5">
                        <Skeleton className="h-4 w-[300px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>

                </div>
            </div>
        ) :
            <div className='w-3/4 md:w-auto max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <div>
                        <div className='flex items-center gap-2 my-2'>
                            <Button className="p-6" variant="outline" size="icon">
                                <Avatar>
                                    <AvatarImage src={singleJob?.company?.logo} />
                                </Avatar>
                            </Button>
                            <div>
                                <h1 className='font-medium md:text-lg text-md'>{singleJob?.company?.name}</h1>
                                <p className='text-sm text-gray-500'>India</p>
                            </div>
                        </div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>

                        <div className='flex md:flex-row flex-col md:items-center items-start gap-2 mt-4'>
                            <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg items-center justify-center ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    {/* <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1> */}
                    <h1 className='font-bold my-1'>Requirements: <span className='pl-4 font-normal text-gray-800'>{singleJob?.requirements.join(",")}</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>}
    </>
};

export default JobDescription;