import useGetAllJobs from "@/hooks/useGetAllJobs"
import CategoryCarousel from "./CategoryCarousel"
import HeroSection from "./HeroSection"
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { setSearchedQuery } from "@/redux/jobSlice"

const Home = () => {
  useGetAllJobs();
  
  const dispatch = useDispatch();
  useEffect(()=>{
      return ()=>{
          dispatch(setSearchedQuery(""));
      }
  },[])

  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
    if (user?.role === 'admin') {
      navigate("/admin/main");
    }
  }, []);
  return (
    <div>
      <Navbar/> 
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer/>
    </div>
  )
}

export default Home