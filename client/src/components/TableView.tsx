import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import SkeletonLoader from "./SkeletonLoader"
import styled from "styled-components"

interface Stock {
  id: number
  close: string
  date: string
  high: string
  low: string
  open: string
  stock: string
  volume: string
}

const StyledContainer = styled.div`
  box-shadow: 0 6px 12px rgb(14 30 37 / 20%);
  padding: 1.5rem;
  border-radius: 6px;
  width: 90%;
  margin: 2em auto;
`;

const Homepage: React.FC = () => {
  const [stocksList, setStocksList] = useState<Stock[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const headersList = [
    {
      title: "Date",
      sort: false
    },
    {
      title: "Stock",
      sort: false
    },
    {
      title: "Open",
      sort: false
    },
    {
      title: "High",
      sort: false
    },
    {
      title: "Low",
      sort: false
    },
    {
      title: "Close",
      sort: false
    },
    {
      title: "Volume",
      sort: false
    }
  ]
  
  useEffect(()=> {
    fetchStocksList()
  }, [])

  const fetchStocksList = async () => {
    setLoading(true)
    try {
      // Api call
      const res = await axios({
        method: "GET",
        url: "http://localhost:4000/stocks"
      })

      // Assign response to stocksList
      const {stocks} = res.data.data
      setStocksList(stocks)
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledContainer>
      <TableContainer>
        <Table aria-label="simple table">
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {headersList.map(header => (
                <TableCell key={header.title}>
                  <p style={{ fontWeight: '600', fontSize: '16px' }}>
                    {header.title}
                  </p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          
          {/* Table Body */}
          <TableBody>
            {loading ?
              // Preloader
              <SkeletonLoader columns={headersList}/>
            : <>
                {stocksList.map(stock => (
                  <TableRow
                    key={stock.id}
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none"
                      }
                    }}
                  >
                    {Object.entries(stock).map(([stockIdx, stockVal]) => (
                      <>
                        {stockIdx !== 'id' && 
                          <TableCell key={stockIdx}>
                            {stockVal}
                          </TableCell>
                        }
                      </>
                    ))}
                  </TableRow>
                ))}
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  )
}

export default Homepage