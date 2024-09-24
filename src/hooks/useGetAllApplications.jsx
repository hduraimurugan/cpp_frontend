import { setAllApplications } from '@/redux/applicationSlice'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllApplications = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.application);

    useEffect(()=>{
        const fetchAllApplication = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get/all?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllApplications(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplication();
    },[])
}

export default useGetAllApplications