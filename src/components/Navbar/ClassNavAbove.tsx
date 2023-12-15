import Link from 'next/link';
import React from 'react';


type ClassNavAboveProps = {
  classroomName: string;
  classroomId: string | string[] | undefined;
};

const ClassNavAbove:React.FC<ClassNavAboveProps> = ({ classroomName, classroomId }: ClassNavAboveProps) => {
  
  return (
    <nav className=' relative flex h-[56px] w-full shrink-0 items-center px-10 bg-white dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
      <div className={`flex w-full items-center justify-between max-w-[1200px] pb-1 mx-auto border-b-2 `}>
      <ul className="flex space-x-1 font-medium text-lg">
        <li className='hover:text-dark-layer-1'>
          <Link href="/classroom">
            Classroom {" > "}
          </Link>
        </li>
        <li className='hover:text-dark-layer-1'>
          <Link href={`/classroom/${classroomId}`}>
            {classroomName}
          </Link>
        </li>
      </ul>
      </div>
    </nav>
  )
}
export default ClassNavAbove;

// import React from 'react';
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { useRecoilState } from "recoil";
// import { navigationState } from "@/atoms/navigationStateAtom";

// type ClassNavProps = {
    
// };

// const capitalizeFirstLetter = (str: string) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };

// const ClassNav:React.FC<ClassNavProps> = () => {

//     const router = useRouter();
//     const [pathSegments, setPathSegments] = useRecoilState(navigationState);

//     useEffect(() => {
//         // Extract path segments
//         const segments = router.pathname.split("/").filter((segment) => segment !== "");
//         setPathSegments(segments);
//       }, [router.pathname, setPathSegments]);
    
    
//     return <nav className=' relative flex h-[56px] w-full shrink-0 items-center px-10 bg-white dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
//     <div className={`flex w-full items-center justify-between max-w-[1200px] pb-1 mx-auto border-b-2 `}>
//         <ul className="flex space-x-1 font-medium text-lg">
//         {pathSegments.map((segment, index) => (
//           <li key={index} className='hover:text-dark-layer-1'>
//             <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`} className=''>
//             {index > 0 && " > "}{capitalizeFirstLetter(segment)}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//     </nav>
// }
// export default ClassNav;