import { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable.jsx'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { setLoading } from '@/redux/applicationSlice';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants, loading } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                dispatch(setLoading(true))
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchAllApplicants();
    }, []);

    useEffect(() => {
        if (!applicants) return;
        document.title = `${applicants?.company?.name} | ${applicants?.title}`;

        return function () {
            document.title = "College Placement Portal";
            // Clean up effect
        };
    }, [applicants])

    return (
        <div>
            <Navbar />
            <div className='w-4/5 md:w-auto max-w-7xl mx-auto'>
                {loading ?
                    <div className='flex md:justify-between md:flex-row flex-col justify-center items-center gap-5 my-10'>
                        <div className="flex flex-row items-center gap-4 space-x-5">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <Skeleton className="h-4 w-[300px]" />
                        </div>
                        <Skeleton className="h-4 w-[300px]" />
                    </div> :
                    <>
                    <div className='md:flex md:justify-between my-7'> 
                        <p className='font-bold text-xl my-5 flex items-center justify-center gap-2'>
                            <Avatar>
                                <AvatarImage src={applicants?.company?.logo} />
                            </Avatar>
                            {applicants?.company?.name} - {applicants?.title}
                        </p>
                        <h1 className='font-bold text-md my-5 text-center'>No of Applicants : {applicants?.applications?.length}</h1>
                    </div>
                    </>}
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants