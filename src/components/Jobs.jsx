import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard.jsx'
import Job from './Job.jsx';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery,loading } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-1/4 md:w-1/6'>
                        <FilterCard />
                    </div>
                    <div>
                        {
                            filterJobs.length <= 0 ? <span>Job not found</span> : (
                                <div className='flex-1 h-[88vh] overflow-y-auto mx-2 pb-5'>
                                    {loading ? (
                                        <div className="flex flex-row flex-wrap gap-10 items-center justify-center">
                                            {/* Loading Skeleton */}
                                            {[...Array(9)].map((_, idx) => (
                                                <div key={idx} className="flex items-center justify-center space-x-4 mb-10">
                                                    <Skeleton className="h-16 w-16 rounded-full" />
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-4 w-[250px]" />
                                                        <Skeleton className="h-4 w-[250px]" />
                                                        <Skeleton className="h-4 w-[200px]" />
                                                        <Skeleton className="h-4 w-[200px]" />
                                                        <Skeleton className="h-4 w-[200px]" />
                                                        <Skeleton className="h-4 w-[200px]" />

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) :
                                        <div className='w-3/4 md:w-auto grid md:grid-cols-3 gap-4'>
                                            {
                                                filterJobs.map((job) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -100 }}
                                                        transition={{ duration: 0.3 }}
                                                        key={job?._id}>
                                                        <Job job={job} />
                                                    </motion.div>
                                                ))
                                            }
                                        </div>}
                            </div>
                            )
                        }</div>
                </div>
            </div>


        </div>
    )
}

export default Jobs