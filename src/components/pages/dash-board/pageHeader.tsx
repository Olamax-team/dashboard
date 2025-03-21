interface EscrowTableProps {
  columns: string[];
  rows: (string | number | [string, string])[][];
}

const EscrowTable: React.FC<EscrowTableProps> = ({ columns, rows }) => {
  return (
    <div className="w-full overflow-x-auto bg-white border rounded-sm">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-left">
              {columns.map((col, index) => (
                <th key={index} className="border px-4 py-2 text-gray-700 font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border px-4 py-2">
                    {Array.isArray(cell) ? (
                      <div>
                        <span>{cell[0]}</span> <br />
                        <span className="text-gray-500 text-xs">{cell[1]}</span>
                      </div>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Rows Become Columns */}
      <div className="md:hidden flex flex-col gap-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="border p-4 bg-gray-50 rounded-md shadow-sm">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="flex justify-between py-1 border-b last:border-none">
                <span className="font-medium text-sm text-gray-700">{columns[cellIndex]}</span>
                <span className="text-sm text-gray-800">
                  {Array.isArray(cell) ? (
                    <>
                      {cell[0]} <br />
                      <span className="text-gray-500 text-xs">{cell[1]}</span>
                    </>
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
