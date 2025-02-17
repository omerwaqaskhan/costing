import React, { useState } from 'react';

const data = [
  {
    mappedItem: 'Direct',
    mappedAmount: 17000,
    split: '100%',
    itemCnt: 125,
    children: [
      {
        mappedItem: 'Clinical',
        mappedAmount: 16000,
        split: '94%',
        itemCnt: 125,
        children: [
          { mappedItem: 'Medical Specialty', mappedAmount: 4500, split: '26%', itemCnt: 125 },
          { mappedItem: 'Nursing Unit', mappedAmount: 5500, split: '32%', itemCnt: 125 },
          {
            mappedItem: 'OPD Nursing Unit',
            mappedAmount: 6000,
            split: '35%',
            itemCnt: 125,
            children: [
              { mappedItem: 'Udhailya OP &EMS Tm', mappedAmount: 1500, split: '25%', itemCnt: 125 },
              { mappedItem: 'Hasa Outpatient Unit', mappedAmount: 500, split: '50%', itemCnt: 125 },
              { mappedItem: 'OPs Prdl As & Endo U', mappedAmount: 2000, split: '50%', itemCnt: 125 },
              { mappedItem: 'Ras Tanura OP Unit', mappedAmount: 2000, split: '50%', itemCnt: 125 },
            ],
          },
          { mappedItem: 'Nursing Specialty', mappedAmount: 1000, split: '6%', itemCnt: 125 },
        ],
      },
    ],
  },
];

const TableRow = ({ item, level = 0, index, selectedRow, onRowClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    if (item.children) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleRowClick = () => {
    onRowClick(item); // Pass the selected row's information to the parent
  };

  return (
    <>
      <tr
        className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${
          selectedRow?.mappedItem === item.mappedItem ? 'bg-blue-100' : ''
        }`}
        onClick={handleRowClick}
      >
        <td className="p-2 w-[40%]">
          <div className="flex items-center overflow-x-auto" style={{ paddingLeft: `${level * 20}px` }}>
            {item.children && (
              <button onClick={toggleExpand} className="mr-2">
                {isExpanded ? '-' : '+'}
              </button>
            )}
            <span>{item.mappedItem}</span>
          </div>
        </td>
        <td className="p-2 w-[20%]">{item.mappedAmount}</td>
        <td className="p-2 w-[20%]">{item.split}</td>
        <td className="p-2 w-[20%]">{item.itemCnt}</td>
      </tr>
      {isExpanded &&
        item.children &&
        item.children.map((child, childIndex) => (
          <TableRow
            key={child.mappedItem}
            item={child}
            level={level + 1}
            index={index + childIndex + 1}
            selectedRow={selectedRow}
            onRowClick={onRowClick}
          />
        ))}
    </>
  );
};

const Table = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row); // Set the selected row
    console.log('Selected Row:', row); // Log the selected row's information
  };

  return (
    <div className="flex flex-col space-y-4 px-8 py-4">
        <div className="overflow-auto h-[520px]">
        <table className="min-w-full">
            <thead className="sticky top-0 bg-blue-600 z-20 text-white">
            <tr>
                <th className="p-2 text-left w-[40%]">Mapped Items</th>
                <th className="p-2 text-left w-[20%]">Mapped Amount</th>
                <th className="p-2 text-left w-[20%]">Split</th>
                <th className="p-2 text-left w-[20%]">Item CNT</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <TableRow
                key={item.mappedItem}
                item={item}
                index={index}
                selectedRow={selectedRow}
                onRowClick={handleRowClick}
                />
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default Table;

// import React, { useState } from 'react';

// const data = [
//   {
//     mappedItem: 'Direct',
//     mappedAmount: 17000,
//     split: '100%',
//     itemCnt: 125,
//     children: [
//       {
//         mappedItem: 'Clinical',
//         mappedAmount: 16000,
//         split: '94%',
//         itemCnt: 125,
//         children: [
//           { mappedItem: 'Medical Specialty', mappedAmount: 4500, split: '26%', itemCnt: 125 },
//           { mappedItem: 'Nursing Unit', mappedAmount: 5500, split: '32%', itemCnt: 125 },
//           {
//             mappedItem: 'OPD Nursing Unit',
//             mappedAmount: 6000,
//             split: '35%',
//             itemCnt: 125,
//             children: [
//               { mappedItem: 'Udhailya OP &EMS Tm', mappedAmount: 1500, split: '25%', itemCnt: 125 },
//               { mappedItem: 'Hasa Outpatient Unit', mappedAmount: 500, split: '50%', itemCnt: 125 },
//               { mappedItem: 'OPs Prdl As & Endo U', mappedAmount: 2000, split: '50%', itemCnt: 125 },
//               { mappedItem: 'Ras Tanura OP Unit', mappedAmount: 2000, split: '50%', itemCnt: 125 },
//             ],
//           },
//           { mappedItem: 'Nursing Specialty', mappedAmount: 1000, split: '6%', itemCnt: 125 },
//         ],
//       },
//     ],
//   },
// ];

// const TableRow = ({ item, level = 0, index }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpand = () => {
//     if (item.children) {
//       setIsExpanded(!isExpanded);
//     }
//   };

//   return (
//     <>
//       <tr className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
//         <td className="p-2 w-[40%]">
//           <div className="flex items-center overflow-x-auto" style={{ paddingLeft: `${level * 20}px` }}>
//             {item.children && (
//               <button onClick={toggleExpand} className="mr-2">
//                 {isExpanded ? '-' : '+'}
//               </button>
//             )}
//             <span>{item.mappedItem}</span>
//           </div>
//         </td>
//         <td className="p-2 w-[20%]">{item.mappedAmount}</td>
//         <td className="p-2 w-[20%]">{item.split}</td>
//         <td className="p-2 w-[20%]">{item.itemCnt}</td>
//       </tr>
//       {isExpanded &&
//         item.children &&
//         item.children.map((child, childIndex) => (
//           <TableRow key={child.mappedItem} item={child} level={level + 1} index={index + childIndex + 1} />
//         ))}
//     </>
//   );
// };

// const Table = () => {
//   return (
//     <div className="overflow-auto h-96">
//       <table className="min-w-full">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 text-left w-[40%]">Mapped Items</th>
//             <th className="p-2 text-left w-[20%]">Mapped Amount</th>
//             <th className="p-2 text-left w-[20%]">Split</th>
//             <th className="p-2 text-left w-[20%]">Item CNT</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <TableRow key={item.mappedItem} item={item} index={index} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;