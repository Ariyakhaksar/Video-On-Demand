"use client";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
    //   backgroundColor: "#09090b",
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
   "&:nth-of-type(odd)": {
    //   backgroundColor: "#262626",
      color: theme.palette.common.white,
   },
   "&:nth-of-type(even)": {
    //   backgroundColor: "#18181b",
      color: theme.palette.common.white,
   },
   // hide last border
   "&:last-child td, &:last-child th": {
      border: 0,
   },
}));

