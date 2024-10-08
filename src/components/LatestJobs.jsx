import useGetAllJobs from '@/hooks/useGetAllJobs.jsx';
import LatestJobCards from './LatestJobCards.jsx';
import { useSelector } from 'react-redux';
import { Skeleton } from './ui/skeleton.jsx';

const LatestJobs = () => {
    useGetAllJobs();
    
    const {loading} = useSelector(store => store.job);
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='md:w-3/4 w-4/5 max-w-7xl mx-auto md:my-20 my-12'>
            <h1 className='md:text-4xl text-xl font-bold'>
                <span className='text-[#1a8e1a]'>Latest & Top </span> Job Openings
            </h1>

            <div className='flex gap-4 mx-5 my-5'>
                {loading ? (
                    <div className="flex flex-row flex-wrap gap-10 items-center justify-center">
                        {/* Loading Skeleton */}
                        {[...Array(6)].map((_, idx) => (
                            <div key={idx} className="flex items-center justify-center space-x-4">
                                <Skeleton className="h-16 w-16 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                   
                                </div>
                            </div>
                        ))}
                    </div>
                ) : allJobs?.length === 0 ? (
                    // No Jobs Found
                    <div>No Jobs Found</div>
                ) : (
                    // Display Jobs
                    <div className='grid md:grid-cols-3 gap-4 mx-5 my-5'>
                    {allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}</div>
                )}
            </div>
        </div>
    );
};

export default LatestJobs;
