import { TableColumn } from './type';

interface TableProps {
  columns?: TableColumn[];
  loading?: boolean;
  dataSource?: any[];
  onColumnClick?: any;
}
export default function Table({ columns, dataSource, onColumnClick }: TableProps) {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full cursor-pointer divide-y divide-gray-300">
              <thead className="bg-indigo-500 text-center text-white">
                <tr>
                  {columns?.map((column, index) => (
                    <>
                      <th
                        key={index}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold sm:pl-6"
                      >
                        {column.title}
                      </th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white text-center">
                {dataSource?.map((item, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-50 hover:bg-gray-100"
                    onClick={(e) => onColumnClick && onColumnClick(item)}
                  >
                    {columns?.map((column, index) => {
                      return (
                        <td
                          key={column.key ? column.key : index}
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                        >
                          {item[column.dataIndex]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
