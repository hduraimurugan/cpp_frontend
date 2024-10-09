import { useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs,setLoading } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    const {loading} = useSelector(store => store.company);
    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
                console.log(res.data.company);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }   
        }
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default useGetCompanyById