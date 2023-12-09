import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { useRecoilState } from 'recoil';
import { authModalState } from "@/atoms/authModalAtom";
import { selectedTabState } from '@/atoms/selectedTabAtom';
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { themeState } from '@/atoms/themeStateAtom';
import DarkModeToggleButton from "../Buttons/DarkModeToggleButton";
import ProblemPage from "@/pages/dproblems/[pid]";


type TopbarProps = {
	problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	const router = useRouter();


	const handleProblemChange = (isForward: boolean) => {
		const { order } = problems[router.query.pid as string] as Problem;
		const direction = isForward ? 1 : -1;
		const nextProblemOrder = order + direction;
		const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);

		if (isForward && !nextProblemKey) {
			const firstProblemKey = Object.keys(problems).find((key) => problems[key].order === 1);
			router.push(`/problems/${firstProblemKey}`);
		} else if (!isForward && !nextProblemKey) {
			const lastProblemKey = Object.keys(problems).find(
				(key) => problems[key].order === Object.keys(problems).length
			);
			router.push(`/problems/${lastProblemKey}`);
		} else {
			router.push(`/problems/${nextProblemKey}`);
		}
	};

	const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState);

	const handleTabClick = (tab: string) => {
		setSelectedTab(tab);
		router.push(`/${tab.toLowerCase()}`); // Navigate to the corresponding route
	  };

	return (
		<nav className='relative flex h-[56px] w-full shrink-0 items-center px-10 bg-white dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
			<div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
				<Link style={{font: 'Source Code Pro', color: '#3466F6'}}  href='/' className='h-[22px] flex-1'>
					<p className="font-bold"> &lt;DSAcademy/&gt; </p>
				</Link>


				{problemPage &&  (
					<div className='flex items-center gap-4 flex-1 justify-center'>
						<div
							className='flex items-center justify-center rounded bg-dark-gray-9 hover:dark-gray-6 dark:bg-dark-fill-3 dark:hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
							onClick={() => handleProblemChange(false)}
						>
							<FaChevronLeft />
						</div>
						<Link
							href='/'
							className='flex items-center gap-2 font-medium max-w-[170px] text-dark-layer-2 dark:text-dark-gray-8 cursor-pointer'
						>
							<div>
								<BsList />
							</div>
							<p>Problem List</p>
						</Link>
						<div
							className='flex items-center justify-center rounded bg-dark-gray-9 hover:dark-gray-6 dark:bg-dark-fill-3 dark:hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
							onClick={() => handleProblemChange(true)}
						>
							<FaChevronRight />
						</div>
					</div>
				)}{!problemPage&&(
					<div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base font-medium justify-center gap-3">
					<Link href="/" className={`${
						  selectedTab === '/' ? 'text-blue-500 border-b-4 border-blue-500' : ''
						} py-3 px-3 cursor-pointer`}
						onClick={() => handleTabClick('/')}>
					  {/* <a
						className={`${
						  selectedTab === '/' ? 'text-blue-500 border-b-4 border-blue-500' : ''
						} py-3 px-3 cursor-pointer`}
						onClick={() => handleTabClick('/')}
					  >
						Problems
					  </a> */}
					  Problems
					</Link>
					<Link href="/classroom" className={`py-3 px-3 ${
						  selectedTab === 'classroom'
							? 'text-blue-500 border-b-4 border-blue-500'
							: ''
						} cursor-pointer`}
						onClick={() => handleTabClick('classroom')}>
					  {/* <a
						className={`py-3 px-3 ${
						  selectedTab === 'classroom'
							? 'text-blue-500 border-b-4 border-blue-500'
							: ''
						} cursor-pointer`}
						onClick={() => handleTabClick('classroom')}
					  >
						Classroom
					  </a> */}Classroom
					</Link>
					<Link href="/community" className={`py-3 px-3 ${
						  selectedTab === 'community'
							? 'text-blue-500 border-b-4 border-blue-500'
							: ''
						} cursor-pointer`}
						onClick={() => handleTabClick('community')}>
					  {/* <a
						className={`py-3 px-3 ${
						  selectedTab === 'community'
							? 'text-blue-500 border-b-4 border-blue-500'
							: ''
						} cursor-pointer`}
						onClick={() => handleTabClick('community')}
					  >
						Community
					  </a> */}Community
					</Link>
				  </div>
					  
				)}

				
				<div className='flex items-center space-x-4 flex-1 justify-end'>
				<DarkModeToggleButton/>
					
					{/* <div>
						
						<a
							href='https://www.buymeacoffee.com/burakorkmezz'
							target='_blank'
							rel='noreferrer'
							className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2'
						>
							Premium
						</a>
					</div> */}
					{!user && (
						<Link
							href='/auth'
							onClick={() => setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }))}
						>
							<button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded '>Sign In</button>
						</Link>
					)}
					{user && problemPage && <Timer />}
					{user && (
						<div className='cursor-pointer group relative'>
							<Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
							<div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>{user.email}</p>
							</div>
						</div>
					)}
					{user && <Logout />}
				</div>
			</div>
		</nav>
	);
};
export default Topbar;
