"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { questionDetails } from "@/utils/types/question";

type ProblemsTableProps = {
	setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
	isContest?: boolean;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({ setLoadingProblems, isContest }) => {
	const router = useRouter();
	let classId: string | string[] | undefined;
	let contestId: string | string[] | undefined;

	if (isContest) {
		const { classId: cId, contestId: contId } = router.query;
		classId = cId;
		contestId = contId;
	}
	const [youtubePlayer, setYoutubePlayer] = useState({
		isOpen: false,
		videoId: "",
	});

	const [problems, setProblems] = useState<questionDetails[]>([] as questionDetails[]);
	// problems = !isContest ? useGetProblems(setLoadingProblems) : await getContestProblemsFromDB(setLoadingProblems);
	// const solvedProblems = useGetSolvedProblems();
	// console.log("solvedProblems", solvedProblems);
	const closeModal = () => {
		setYoutubePlayer({ isOpen: false, videoId: "" });
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	useEffect(() => {
		// console.log("called useEffect");
		async function getContestProblemsFromDB(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
			setLoadingProblems(true);
			const tmp: questionDetails[] = [];
			const contestRef = doc(firestore, "contest", router.query.contestId as string);
			const contestDoc = await getDoc(contestRef);
			if (!contestDoc.exists()) return;
			const contestData = contestDoc.data();
			if (!contestData) return;
			const problemsId = contestData.questions;
			// console.log(contestData);
			// console.log(problemsId);
			if (!problemsId) return;
			const q = query(collection(firestore, "questions"), where("questionId", "in", problemsId));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				tmp.push(doc.data() as questionDetails);
			});
			setLoadingProblems(false);
			console.log(tmp);
			setProblems(tmp);
			return tmp;
		}

		async function getProblemsFromDB(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
			setLoadingProblems(true);
			const q = query(collection(firestore, "questions"), limit(10));
			const querySnapshot = await getDocs(q);
			const tmp: questionDetails[] = [];
			querySnapshot.forEach((doc) => {
				tmp.push(doc.data() as questionDetails);
			});
			setLoadingProblems(false);
			console.log(tmp);
			setProblems(tmp);
			return tmp;
		}

		if (isContest && router && router.query && router.query.contestId) {
			getContestProblemsFromDB(setLoadingProblems);
			// console.log(problems)
		} else {
			getProblemsFromDB(setLoadingProblems);
		}
	}, [isContest, setLoadingProblems, router, router.query.contestId]);

	return (
		<>
			<tbody className='text-gray-2 dark:text-white'>
				{problems.map((problem, idx) => {
					const difficulyColor =
						problem.difficultyLevel === "Easy"
							? "text-dark-green-s"
							: problem.difficultyLevel === "Medium"
								? "text-dark-yellow"
								: "text-dark-pink";
					const pid = String.fromCharCode(65 + idx);
					return (
						<tr className={`${idx % 2 !== 1 ? "bg-dark-gray-9 dark:bg-dark-layer-1" : ""}`} key={problem.id}>
							<th className={`px-2 py-4 font-medium whitespace-nowrap ${!isContest ? 'text-dark-green-s' : ''}`}>
                            {pid}
                            </th>
							<td className='px-6 py-4'>
								{isContest ? (
									<Link
										href={`/classroom/${classId}/${contestId}/${pid}`}
										className='hover:text-blue-600 cursor-pointer'
									>
										{problem.Name}
									</Link>
								) : (
									<Link
										className='hover:text-blue-600 cursor-pointer'
										href={`/problems/${problem.questionId}`}
									>
										{problem.Name}
									</Link>
								)}
							</td>
							<td className={`px-6 py-4 ${difficulyColor}`}>{problem.difficultyLevel}</td>
							<td className={"px-6 py-4"}>{problem.tag}</td>
							{!isContest && (<td className={"px-6 py-4"}>
								{problem.videoId ? (
									<AiFillYoutube
										fontSize={"28"}
										className='cursor-pointer hover:text-red-600'
										onClick={() =>
											setYoutubePlayer({ isOpen: true, videoId: problem.videoId as string })
										}
									/>
								) : (
									<p className='text-gray-500'>Coming soon</p>
								)}
							</td>)}
							{isContest && (<td className={`px-6 py-4 ${difficulyColor}`}>{problem.difficultyLevel}</td>)}
						</tr>
					);
				})}
			</tbody>
			{youtubePlayer.isOpen && (
				<tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
					<div
						className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
						onClick={closeModal}
					></div>
					<div className='w-full z-50 h-full px-6 relative max-w-4xl'>
						<div className='w-full h-full flex items-center justify-center relative'>
							<div className='w-full relative'>
								<IoClose
									fontSize={"35"}
									className='cursor-pointer absolute -top-16 right-0'
									onClick={closeModal}
								/>
								<YouTube
									videoId={youtubePlayer.videoId}
									loading='lazy'
									iframeClassName='w-full min-h-[500px]'
								/>
							</div>
						</div>
					</div>
				</tfoot>
			)}
		</>
	);
};
export default ProblemsTable;