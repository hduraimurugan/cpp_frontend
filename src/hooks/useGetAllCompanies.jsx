import { useSelector } from 'react-redux'
import { setCompanies,setLoading} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector(store=>store.company);
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            } finally{
                dispatch(setLoading(false));
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies