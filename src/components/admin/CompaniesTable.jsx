import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from '../ui/skeleton'

const CompaniesTable = () => {
    const { companies, searchCompanyByText, loading } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                {loading ? (
                    <div className="">
                        {/* Loading Skeleton */}
                        <div className="flex flex-col gap-4 px-5 py-5 justify-start">
                            <div className="flex flex-row items-center gap-4 space-x-5">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <Skeleton className="h-4 w-[300px]" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                            <div className="flex flex-row items-center gap-4 space-x-5">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <Skeleton className="h-4 w-[300px]" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                            <div className="flex flex-row items-center gap-4 space-x-5">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <Skeleton className="h-4 w-[300px]" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                            <div className="flex flex-row items-center gap-4 space-x-5">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <Skeleton className="h-4 w-[300px]" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>

                        </div>
                    </div>
                ) :
                    <TableBody>
                        {
                            filterCompany?.map((company, idx) => (
                                <tr key={idx}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company.logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>

                            ))
                        }
                    </TableBody>
                }
            </Table>
        </div>
    )
}

export default CompaniesTable