import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useState } from "react";

interface UserRow {
  email: string;
  password: string;
}

const rows: UserRow[] = [
  { email: "donald@email.com", password: "donald123" },
  { email: "debbi@email.com", password: "debbie123" },
  { email: "bunny@email.com", password: "bunny123" },
  { email: "milk@email.com", password: "milk123" },
];

export const Credentials = () => {
  const [open, setOpen] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div className="absolute -top-5 right-5 sm:top-5 sm:w-1/2">
        {/* Toggle button */}
        <span
          onClick={() => setOpen((prev) => !prev)}
          className="absolute right-0 top-0 text-lightaccent-600 text-3xl rounded hover:cursor-pointer transition"
          title="Login Help"
        >
          <i className="fa-solid fa-circle-info"></i>
        </span>
        {/* Toggle content */}
        {open && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Password</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.email}>
                    <TableCell>
                      {row.email}
                      <Tooltip title="Copy">
                        <IconButton
                          size="small"
                          onClick={() => copy(row.email)}
                          sx={{ ml: 1 }}
                        >
                          <ContentCopyIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      {row.password}
                      <Tooltip title="Copy">
                        <IconButton
                          size="small"
                          onClick={() => copy(row.password)}
                          sx={{ ml: 1 }}
                        >
                          <ContentCopyIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
};
