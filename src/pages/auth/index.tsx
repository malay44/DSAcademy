import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LoginNavbar from "@/components/Navbar/LoginNavbar";
import SignInDes1 from '../../../public/SignIn1.svg';
import { relative } from "path";
import LoginForm from "@/components/Modals/LoginForm";	

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
	const authModal = useRecoilValue(authModalState);
	const [user, loading, error] = useAuthState(auth);
	const [pageLoading, setPageLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (user) router.push("/");
		if (!loading && !user) setPageLoading(false);
	}, [user, router, loading]);

	if (pageLoading) return null;

	return (
		<>
			<div className='bg-white h-screen w-screen'>
				<div className='max-w-7xl mx-auto'>
					<LoginNavbar />
				</div>
				<LoginForm/>
			</div>
		</>
	);
};
export default AuthPage;
