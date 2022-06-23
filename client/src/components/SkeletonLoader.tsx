import React from "react"
import {
  TableRow,
  Skeleton
} from "@mui/material"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"

interface Props {
  columns: {
    title: string
    sort: boolean
  }[]
}

const SkeletonLoader: React.FC<Props>  = ({ columns }) => {
  return (
    <TableRow
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none"
        }
      }}
    >
      {columns.map((col: any, key: any) => (
        <TableCell key={key}>
          <Skeleton />
        </TableCell>
      ))}
    </TableRow>
  )
}

export default SkeletonLoader