import useGetAllJobs from '@/hooks/useGetAllJobs.jsx';
import LatestJobCards from './LatestJobCards.jsx';
import { useSelector } from 'react-redux';
import { Skeleton } from './ui/skeleton.jsx';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {

    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);


    return (
        <div className='md:w-3/4 w-4/5 max-w-7xl mx-auto my-20'>
            <h1 className='md:text-4xl text-xl font-bold'><span className='text-[#1a8e1a]'>Latest & Top </span> Job Openings</h1>
            <div className='grid md:grid-cols-3 gap-4 mx-5 my-5'>
                {allJobs?.length <= 0 ? (
                    <>No Jobs Found</>
                ) : (
                    <>
                        {allJobs?.length > 0 ? (
                            allJobs.slice(0, 6).map((job) => (
                                <LatestJobCards key={job._id} job={job} />
                            ))
                        ) : (
                            <span>
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[250px]" />
                                        <Skeleton className="h-4 w-[200px]" /> 
                                    </div>
                                </div>
                            </span>
                        )}
                    </>
                )}

            </div>
        </div>
    )
}

export default LatestJobs