import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>Lists of applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>company</TableHead>
                    <TableHead className="text-right">Status</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    [1,2,3,4].map((item, index)=> (
                        <TableRow key={index}>
                            <TableCell>15/8/2024</TableCell>
                            <TableCell>Frontend Developer</TableCell>
                            <TableCell>Microsoft</TableCell>
                            <TableCell className="text-right"><Badge>Selected</Badge></TableCell>

                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable