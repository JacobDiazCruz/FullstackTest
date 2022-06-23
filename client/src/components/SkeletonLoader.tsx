import React from "react"
import {
  TableRow,
  Skeleton
} from "@mui/material"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"

const SkeletonLoader  = ({ columns }: any) => {
  return (
    <TableRow
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none"
        }
      }}
    >
      {columns.map((col: any, key: any) => (
        <TableCell>
          <Skeleton
            key={key}
          />
        </TableCell>
      ))}
    </TableRow>
  )
}

export default SkeletonLoader