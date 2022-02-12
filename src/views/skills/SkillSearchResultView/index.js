import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

const SkillSearchResultView = ({ postings }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Job Title</TableCell>
          <TableCell>Company</TableCell>
          <TableCell>Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          postings?.map((posting, i) => (
            <TableRow key={posting.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                {posting.title}
              </TableCell>
              <TableCell>
                {posting.company.name}
              </TableCell>
              <TableCell>
                {posting.score}
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

export default SkillSearchResultView;
