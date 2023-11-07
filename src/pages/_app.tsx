import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Head>
				<title>DSAcademy</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.png' />
				<meta
					name='description'
					content='Web application that contains leetcode problems and video solutions'
				/>
			</Head>
			<ToastContainer />
			<Component {...pageProps} />
		</RecoilRoot>
	);
}

// firebase notes
// 1. path in doc() always have even number of arguments 
// doc() is used to create a reference to a document

// to write to a document, use setDoc() function
// setDoc(document ref, data)
// to read from a document, use getDoc() function

// to create a document with random id, use addDoc() function
// addDoc(collection ref, data)
// collection ref can be created using collection() function

// getting live data from firestore
// use onSnapshot() function
// onSnapshot(document ref, callbackFunction)
// callbackFunction((snapshot) => {
//     snapshot.docs.map((doc) => {
//	         console.log(doc.data());
//	     });
//	 });

