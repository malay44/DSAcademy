import { firestore } from '../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";

type Problem = {
    id: string;
    name: string;
    description: string;
    inputFormat: string;
    outputFormat: string;
    testCases: [string];
    solution: string;
}
async function addProblem(problem: Problem) {
    try {
      const docRef = await addDoc(collection(firestore, "problems"), problem);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  
