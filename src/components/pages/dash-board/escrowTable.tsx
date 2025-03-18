import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface EscrowTableProps {
  columns: string[];
  rows: (string | number | [string, string])[][];
}

const EscrowTable: React.FC<EscrowTableProps> = ({ columns, rows }) => {
  return (
    <div className="w-full my-10 overflow-x-auto md:bg-white md:border rounded-t-sm">
      {/* Desktop View */}
      <div className="hidden md:block">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-[#F5F5F5] w-full h-[60px] text-center">
              {columns.map((col, index) => (
                <TableHead key={index} className="border px-4 py-2 text-[#121826] text-[12px] font-bold text-center">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="text-center">
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="border px-4 py-2">
                    {Array.isArray(cell) ? (
                      <div className="flex flex-col items-start">
                        <span>{cell[0]}</span>
                        <span className="text-left text-dark font-normal text-[10px]">{cell[1]}</span>
                      </div>
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View: Convert Rows to Columns */}
      <div className="md:hidden">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="border bg-white pt-2 my-2 rounded-t-sm">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="flex justify-between">
                <span className="px-4 font-bold border  bg-[#F5F5F5] w-1/2 flex items-center justify-start text-wrap">{columns[cellIndex]}</span>
                <span className = "border w-1/2 px-4 flex flex-wrap items-center justify-center">
                  {Array.isArray(cell) ? (
                    <div>
                      {cell[0]}<br />
                      <span className="text-[10px] text-dark">{cell[1]}</span>
                    </div>
                  ) : (
                    cell
                  )}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EscrowTable;
