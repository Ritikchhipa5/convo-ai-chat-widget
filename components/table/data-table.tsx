import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  headers: string[];
  children: ReactNode;
};

function DataTable({ children, headers }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, key) => (
            <TableHead
              key={key}
              className={cn(key === headers.length - 1 && "text-right")}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
}

export default DataTable;
