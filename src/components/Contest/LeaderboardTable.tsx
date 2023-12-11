import React from 'react';

type LeaderboardTableProps = {
  data: Array<{
    id: number;
    name: string;
    solved: number;
    points: number;
  }>;
};

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  return (
    <div className="flex flex-col ">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-4 lg:px-0">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">
                    #Rank
                  </th>
                  <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">
                    Name
                  </th>
                  <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">
                    Solved
                  </th>
                  <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className={item.id % 2 === 0 ? 'bg-gray-100 border-b' : 'bg-white border-b'}>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{item.id}</td>
                    <td className="text-base text-gray-900 font-normal px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="text-base text-gray-900 font-normal px-6 py-4 whitespace-nowrap">{item.solved}</td>
                    <td className="text-base text-gray-900 font-normal px-6 py-4 whitespace-nowrap">{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable;
