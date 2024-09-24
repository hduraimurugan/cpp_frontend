import { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Badge } from '../ui/badge'; // Assuming you're using the Button component from your UI library

const shortlistingStatus = ["Accepted", "Rejected", "Shortlisted"];

const ApplicantsTable = () => {
    const { applicants: initialApplicants } = useSelector(store => store.application);
    const [applicants, setApplicants] = useState(initialApplicants);
    const [loadingId, setLoadingId] = useState(null); // Track which applicant is being updated

    const statusHandler = async (status, id) => {
        setLoadingId(id); // Set the loading state for the specific applicant
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                // Update the status locally in the state
                const updatedApplicants = applicants.applications.map(applicant => 
                    applicant._id === id ? { ...applicant, status: status.toLowerCase() } : applicant
                );
                setApplicants({ ...applicants, applications: updatedApplicants });
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating status');
        } finally {
            setLoadingId(null); // Reset loading state after the request is finished
        }
    };

    useEffect(() => {
        // Sync applicants from redux to local state if redux changes
        setApplicants(initialApplicants);
    }, [initialApplicants]);

    const handleInterviewLink = (applicantId) => {
        // Logic for generating/redirecting to the interview link
        toast.success(`Redirecting to interview link for application: ${applicantId}`);
        // You can handle actual interview link logic here (e.g., redirect to a specific page)
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead >Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                        <TableHead className="text-right">Interview</TableHead> {/* New column for Interview Link */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {item.applicant?.profile?.resume ? (
                                        <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : <span>NA</span>}
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>
                                    <Badge className={`${item?.status === "rejected" ? 'bg-red-400' : item.status === 'pending' ? 'bg-gray-400' : item.status === 'shortlisted' ? 'bg-blue-400' : 'bg-green-400'}`}>
                                        {loadingId === item._id ? (
                                            <Loader2 className="animate-spin" size={16} />
                                        ) : (
                                            item.status.toUpperCase()
                                        )}
                                    </Badge>
                                </TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {shortlistingStatus.map((status, index) => (
                                                <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                    <span>{status}</span>
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.status === "shortlisted" ? (
                                        <Badge className="bg-green-500 hover:bg-green-700 text-white hover:cursor-pointer" onClick={() => handleInterviewLink(item?._id)}>
                                            Joining Link
                                        </Badge>) :
                                        (<Badge className="bg-gray-500 text-white hover:cursor-pointer">
                                            NIL
                                        </Badge>
                                    )}
                                </TableCell> {/* Conditionally render Interview Link */}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
