import Link from "next/link";
import React, { useState } from "react";
import JoinClassButton from "../Buttons/JoinClassButton";
import CreateClassButton from "../Buttons/CreateClassButton";
import Button from "../Buttons/Button";
import CreateClass from "@/components/Modals/CreateClass";

type ClassroomNavProps = {};

const ClassroomNav:React.FC<ClassroomNavProps> = () => {
    const [isCreateClassModalOpen, setCreateClassModalOpen] = useState(false);

    const openCreateClassModal = () => {
      setCreateClassModalOpen(true);
    };

    const closeCreateClassModal = () => {
      setCreateClassModalOpen(false);
    };
    return (<nav className='relative flex h-[56px] w-full shrink-0 items-center px-10 bg-white dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
    <div className={`flex w-full items-center justify-between max-w-[1200px] mx-auto `}>
        <Link style={{font: 'Source Code Pro', color: '#767676'}}  href='/classroom' className='h-[22px] flex-1'>
			<p className="font-semibold text-xl"> Classroom </p>
		</Link>

        <div className="flex gap-14 space-x-4 ">
          <div className="flex gap-4">
            <JoinClassButton />
          </div>
          <Button onClick={openCreateClassModal}>Create Class</Button>
        </div>
      </div>
      {isCreateClassModalOpen && (
            <CreateClass onClose={closeCreateClassModal} />
      )}
    </nav>
  );
};
export default ClassroomNav;
