import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


const HeroSection = () => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
  return (
    <>
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-6 text-sm py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>College Placement Website</span>
                <h1 className='md:text-5xl text-2xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#1a8e1a]'>Dream Jobs</span></h1>
                <p></p>
                <div className='flex md:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#1a8e1a]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default HeroSection