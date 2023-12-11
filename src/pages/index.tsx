import { useState } from "react";

import Topbar from '@/components/Topbar/Topbar';
import useHasMounted from '@/hooks/useHasMounted';
import Problems from './problemsMain';
import { useRecoilState } from 'recoil';
import { selectedTabState } from '@/atoms/selectedTabAtom';
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import ProblemsMain from "./problemsMain";

export default function Home() {

	const [selectedTab] = useRecoilState(selectedTabState);

	
	const hasMounted = useHasMounted();

	if (!hasMounted) return null;

	return (
		<>
			<Topbar />
			<main className='bg-white dark:bg-dark-layer-2 min-h-screen'>
				{/* Conditionally render different components based on the selectedTab */}
				{/* {selectedTab === '/' && <ProblemsMain />}
        		{selectedTab === 'classroom' && <ClassroomMain />}
        		{selectedTab === 'community' && <CommunityMain />} */}
				<ProblemsMain isContest={false} />
			</main>
		</>
	);
}

