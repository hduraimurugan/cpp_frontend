import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import useGetAllApplications from "@/hooks/useGetAllApplications";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge"; // Assuming Badge is part of your UI library
import { Avatar, AvatarImage } from "../ui/avatar";
import { useMemo } from "react";
import { TiLocation, TiLocationArrow, TiLocationArrowOutline, TiLocationOutline } from "react-icons/ti";

export const AdminAnalyticTable = () => {
    // Hook to fetch all applications
    useGetAllApplications();

    // Extracting applications from Redux store
    const { applications } = useSelector((store) => store.application);

    // Calculate totals for different application statuses
    const { totalApplications, totalAccepted, totalRejected, totalShortlisted } = useMemo(() => {
        const totalApplications = applications?.length || 0;
        const totalAccepted = applications?.filter(item => item.status === "accepted").length || 0;
        const totalRejected = applications?.filter(item => item.status === "rejected").length || 0;
        const totalShortlisted = applications?.filter(item => item.status === "shortlisted").length || 0;

        return {
            totalApplications,
            totalAccepted,
            totalRejected,
            totalShortlisted,
        };
    }, [applications]);

    return (
        <div className="w-screen md:w-auto mx-auto container">
            <div className="w-full text-center my-3">
                <h1 className="text-xl font-bold">List of All the Applications</h1>
                <div className="flex flex-wrap justify-center gap-4 my-3">
                    <Card className="md:w-[300px] w-1/3 flex flex-col items-center bg-gray-200">
                        <CardHeader>
                            <CardTitle className="md:text-xl text-md">Jobs Applied</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xl font-semibold">
                            {totalApplications}
                        </CardContent>
                    </Card>
                    <Card className="md:w-[300px] w-1/3 flex flex-col items-center bg-green-200">
                        <CardHeader>
                            <CardTitle className="md:text-xl text-md">Students Hired</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xl font-semibold">
                            {totalAccepted}
                        </CardContent>
                    </Card>
                    <Card className="md:w-[300px] w-1/3 flex flex-col items-center bg-red-200">
                        <CardHeader>
                            <CardTitle className="md:text-xl text-md">Rejected</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xl font-semibold">
                            {totalRejected}
                        </CardContent>
                    </Card>
                    <Card className="md:w-[300px] w-1/3 flex flex-col items-center bg-blue-200">
                        <CardHeader>
                            <CardTitle className="md:text-xl text-md">Shortlisted</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xl font-semibold">
                            {totalShortlisted}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Table>
                <TableCaption>A list of all student Applications</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-center'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell className="flex items-center w-auto">
                                <Avatar>
                                <AvatarImage src={item?.applicant?.profile?.profilePhoto || "https://res.cloudinary.com/dmuz0dq5b/image/upload/v1727067985/user_profile/rgskafgdibv4gltvhs8m.png"} />
                                </Avatar>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                            </TableCell>
                            <TableCell>
                                {item?.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 cursor-pointer"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    "---"
                                )}
                            </TableCell>

                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell> 
                                <div className='flex items-center my-3 text-gray-400 gap-1'>
                                <TiLocation size={20} />
                                <p className='text-gray-950'>{item?.job?.location}     
                                </p>
                            </div>
                            </TableCell>

                            <TableCell className="flex items-center">
                                <Avatar>
                                    <AvatarImage src={item?.job?.company?.logo} />
                                </Avatar>
                                <TableCell>{item?.job?.company?.name}</TableCell>
                            </TableCell>

                            <TableCell>
                                {new Date(item?.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className='text-center'>
                                <Badge
                                    className={`${item.status === "rejected"
                                        ? "bg-red-400"
                                        : item.status === "pending"
                                            ? "bg-gray-400"
                                            : item.status === "shortlisted"
                                                ? "bg-blue-400"
                                                : "bg-green-400"
                                        }`}
                                >
                                    {item.status.toUpperCase()}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
