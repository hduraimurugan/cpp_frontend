import { setSingleJob } from '@/redux/jobSlice'
import { setLoading } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetSingleJobs = (jobId) => {
    const dispatch = useDispatch();

    const { singleJob, loading } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                dispatch(setLoading(true))
                dispatch(setSingleJob(null));
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    // console.log(singleJob);
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
}

export default useGetSingleJobs