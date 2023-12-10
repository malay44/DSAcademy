import { authModalState } from "@/atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginNavbar from "@/components/Navbar/LoginNavbar";
import LoginForm from "@/components/Modals/LoginForm";	
import SignupForm from "@/components/Modals/SignupForm";

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
				{authModal.type === "login" ? <LoginForm/> : <SignupForm/>}
			</div>
		</>
	);
};
export default AuthPage;
