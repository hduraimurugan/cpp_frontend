import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge'; // Assuming Button is imported from your UI components
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Avatar, AvatarImage } from './ui/avatar';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const handleInterviewLink = (appId) => {
        // Logic for handling interview link, e.g., redirect to an interview URL or open a modal
        toast.success(`Redirecting to interview link for application: ${appId}`);
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Interview</TableHead> {/* New column for Interview Link */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span>You haven&apos;t applied for any jobs yet.</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={appliedJob.job?.company?.logo} />
                                    </Avatar>

                                </TableCell>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-center">
                                    <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : appliedJob.status === 'shortlisted' ? 'bg-blue-400' : 'bg-green-400'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {appliedJob.status === 'shortlisted' ? (
                                        <Badge className="bg-green-500 hover:bg-green-700 text-white hover:cursor-pointer" onClick={() => handleInterviewLink(appliedJob._id)}>
                                            Joining Link
                                        </Badge>) :
                                        (<Badge className="bg-gray-500 text-white hover:cursor-pointer" >
                                            NIL
                                        </Badge>
                                        )
                                    }
                                </TableCell> {/* Conditionally render Interview Link */}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
