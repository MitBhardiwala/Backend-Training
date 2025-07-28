import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { TableHead } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TablePaginationActions from "./TablePaginationProps";

const BooksSection = ({ booksData }) => {
  const tableHeaders = [
    "Book Id",
    "Book Name",
    "Book Desc",
    "Book Author",
    "No of Page",
    "Book Category",
    "Book Price",
    "Released Year",
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - booksData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(rowsPerPage, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((item) => (
                <TableCell sx={{ fontWeight: "bold" }} key={item}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? booksData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : booksData
            ).map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book._id}</TableCell>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.noOfPage}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.price}</TableCell>
                <TableCell>{book.releaseYear}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                // onPageChange={(e, p) => setTest(e)}
                colSpan={3}
                count={booksData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default BooksSection;
