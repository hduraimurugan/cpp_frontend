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
        <div className="mx-auto container">
            <div className="w-full text-center my-3">
                <h1 className="text-xl font-bold">List of All the Applications</h1>
                <div className="flex justify-center gap-4 my-3">
                    <Card className="w-[350px] bg-gray-200">
                        <CardHeader>
                            <CardTitle>Jobs Applied</CardTitle>                   
                        </CardHeader>
                        <CardContent className="text-xl font-semibold">
                        {totalApplications}
                        </CardContent>
                    </Card>
                    <Card className="w-[350px] bg-green-200">
                        <CardHeader>
                            <CardTitle>Students Hired</CardTitle>                   
                        </CardHeader>
                        <CardContent className="text-xl font-semibold"> 
                        {totalAccepted}
                        </CardContent>
                    </Card>
                    <Card className="w-[350px] bg-red-200">
                        <CardHeader>
                            <CardTitle>Rejected</CardTitle>                   
                        </CardHeader>
                        <CardContent className="text-xl font-semibold">
                        {totalRejected}
                        </CardContent>
                    </Card>
                    <Card className="w-[350px] bg-blue-200">
                        <CardHeader>
                            <CardTitle>Shortlisted</CardTitle>                   
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
                        <TableHead>Student Name</TableHead>
                        <TableHead>Job Applied for</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Company Logo</TableHead>
                        <TableHead>Student Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell>{item?.job?.company?.name}</TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={item?.job?.company?.logo} />
                                </Avatar>
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
                                    "NA"
                                )}
                            </TableCell>
                            <TableCell>
                                {new Date(item?.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
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