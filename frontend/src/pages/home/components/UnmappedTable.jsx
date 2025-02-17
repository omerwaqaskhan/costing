import React, { useState } from 'react';

const UnmappedTable = () => {
  const [data, setData] = useState([
    { id: 1, code: 'A123', item: 'Item 1', amount: 100 },
    { id: 2, code: 'B456', item: 'Item 2', amount: 200 },
    { id: 3, code: 'C789', item: 'Item 3', amount: 150 },
    { id: 4, code: 'D012', item: 'Item 4', amount: 250 },
    { id: 5, code: 'E345', item: 'Item 5', amount: 300 },
    { id: 6, code: 'F678', item: 'Item 6', amount: 400 },
    { id: 7, code: 'G901', item: 'Item 7', amount: 500 },
    { id: 8, code: 'A123', item: 'Item 1', amount: 100 },
    { id: 9, code: 'B456', item: 'Item 2', amount: 200 },
    { id: 10, code: 'C789', item: 'Item 3', amount: 150 },
    { id: 11, code: 'D012', item: 'Item 4', amount: 250 },
    { id: 12, code: 'E345', item: 'Item 5', amount: 300 },
    { id: 13, code: 'F678', item: 'Item 6', amount: 400 },
    { id: 14, code: 'G901', item: 'Item 7', amount: 500 },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : data.map((row) => row.id));
  };

  const handleRowSelect = (id) => {
    const selected = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];
    setSelectedRows(selected);
    setSelectAll(selected.length === data.length);
  };

  // Function to log selected rows and their data
  const logSelectedRows = () => {
    const selectedData = data.filter((row) => selectedRows.includes(row.id));
    console.log('Selected Rows Data:', selectedData);
  };

  // Calculate total Unmapped Amount
  const totalUnmappedAmount = data.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div className="flex flex-col space-y-4 px-8 py-4">
      <div className="overflow-auto h-[520px]">
        <table className="min-w-full bg-white">
          <thead className="sticky top-0 bg-blue-600 z-20">
            <tr className="text-white">
              <th className="sticky left-0 z-30 px-4 py-2 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="form-checkbox h-4 w-4"
                />
              </th>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('code')}>
                Unmapped Code {sortConfig.key === 'code' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('item')}>
                Unmapped Items {sortConfig.key === 'item' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('amount')}>
                Unmapped Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="sticky left-0 bg-white z-10 px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                </td>
                <td className="px-4 py-2 text-left">{row.code}</td>
                <td className="px-4 py-2 text-left">{row.item}</td>
                <td className="px-4 py-2 text-left">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to log selected rows */}
      {/* <button
        onClick={logSelectedRows}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Log Selected Rows
      </button> */}
      {/* Bottom Labels */}
      <div className="flex justify-between items-center pt-10">
        {/* Selected Items Label */}
        <div className="text-sm text-gray-700">
          {selectedRows.length} Selected Item/s{selectedRows.length !== 1}
        </div>

        {/* Total Unmapped Amount Label */}
        <div className="text-sm text-gray-700 border-y border-gray-300 py-2 w-[200px]">
            {totalUnmappedAmount}
        </div>
      </div>
    </div>
  );
};

export default UnmappedTable;

// ========================================================================================

// import { CompactTable } from '@table-library/react-table-library/compact';
// import React, { useState } from "react";

// const nodes = [
//   {
//     id: '0',
//     name: 'Shopping List',
//     deadline: new Date(2020, 1, 15),
//     type: 'TASK',
//     isComplete: true,
//     nodes: 3,
//   },
//   {
//     id: '1',
//     name: 'Grocery Shopping',
//     deadline: new Date(2020, 1, 20),
//     type: 'TASK',
//     isComplete: false,
//     nodes: 5,
//   },
// ];

// const COLUMNS = [
//   {
//     label: 'Select',
//     renderCell: (item) => {
//       const [checked, setChecked] = useState(item.isComplete);

//       const handleCheckboxChange = () => {
//         setChecked(!checked);
//         item.isComplete = !checked; // Update the item's isComplete status
//       };

//       return (
//         <input
//           type="checkbox"
//           checked={checked}
//           onChange={handleCheckboxChange}
//         />
//       );
//     },
//   },
//   { label: 'Task', renderCell: (item) => item.name },
//   {
//     label: 'Deadline',
//     renderCell: (item) =>
//       item.deadline.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//       }),
//   },
//   { label: 'Type', renderCell: (item) => item.type },
//   {
//     label: 'Complete',
//     renderCell: (item) => item.isComplete.toString(),
//   },
//   { label: 'Tasks', renderCell: (item) => item.nodes },
// ];

// const UnmappedTable = () => {
//   const data = { nodes };

//   return <CompactTable columns={COLUMNS} data={data} />;
// };

// export default UnmappedTable;


// ==========================================================================================

// import React, { useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import { ModuleRegistry } from "ag-grid-community";
// // import "./DataGrid.css";

// import { ClientSideRowModelModule } from "ag-grid-community";
// import { RowSelectionModule } from "ag-grid-community"; 
// import { TextFilterModule, NumberFilterModule, DateFilterModule, CustomFilterModule } from "ag-grid-community"; 

// ModuleRegistry.registerModules([
//   ClientSideRowModelModule,
//   RowSelectionModule,
//   TextFilterModule,
//   NumberFilterModule,
//   DateFilterModule,
//   CustomFilterModule,
// ]);

// const UnmappedTable = () => {
//   const [rowData] = useState([
//     { id: "CC 1", item: "Cost Center 1", amount: 55555 },
//     { id: "CC 2", item: "Cost Center 2", amount: 545654 },
//     { id: "CC 3", item: "Cost Center 3", amount: 545441 },
//     { id: "CC 4", item: "Cost Center 1", amount: 55555 },
//     { id: "CC 5", item: "Cost Center 2", amount: 545654 },
//     { id: "CC 6", item: "Cost Center 3", amount: 545441 },
//     { id: "CC 7", item: "Cost Center 1", amount: 55555 },
//     { id: "CC 8", item: "Cost Center 1", amount: 55555 },
//     { id: "CC 9", item: "Cost Center 2", amount: 545654 },
//     { id: "CC 10", item: "Cost Center 3", amount: 545441 },
//     { id: "CC 11", item: "Cost Center 1", amount: 55555 },
//     { id: "CC 12", item: "Cost Center 2", amount: 545654 },
//     { id: "CC 13", item: "Cost Center 3", amount: 545441 },
//     { id: "CC 14", item: "Cost Center 1", amount: 55555 },
//     { id: "CC 15", item: "Cost Center 2", amount: 545654 },
//     { id: "CC 16", item: "Cost Center 3", amount: 545441 },
//   ]);

//   const columnDefs = [
//     {
//       headerCheckboxSelection: true, 
//       checkboxSelection: true, 
//       field: "id",
//       headerName: "Unmapped Code",
//       pinned: "left", 
//       flex: 1,
//     },
//     { 
//       field: "item", 
//       headerName: "Unmapped Items", 
//       sortable: true, 
//       filter: "agTextColumnFilter",
//       flex: 1,
//     },
//     { 
//       field: "amount", 
//       headerName: "Unmapped Amount", 
//       sortable: true, 
//       filter: "agNumberColumnFilter",
//       flex: 1,
//       valueFormatter: (params) => params.value.toLocaleString(),
//       cellStyle: { textAlign: "right" },
//     },
//   ];

//   return (
//     <div
//       className="ag-theme-quartz"
//       style={{
//         height: "535px",
//         width: "100%",
//       }}
//     >
//       <AgGridReact
//         rowData={rowData}
//         columnDefs={columnDefs}
//         rowSelection="multiple"
//         pagination={true} // Enable pagination
//         paginationPageSize={10} // Set page size
//         paginationAutoPageSize={false} // Ensures page size is fixed
//         paginationPageSizeSelector={[100, 500, 1000]}
//         // domLayout="normal" // Keeps the grid from expanding indefinitely
//         defaultColDef={{ resizable: true }}
//       />
//     </div>
//   );
// };

// export default UnmappedTable;
