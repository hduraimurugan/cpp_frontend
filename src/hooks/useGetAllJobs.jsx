import { setAllJobs } from '@/redux/jobSlice'
import { setLoading } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    const {searchedQuery, loading} = useSelector(store=>store.job);
    
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            } finally{
                dispatch(setLoading(false));
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs