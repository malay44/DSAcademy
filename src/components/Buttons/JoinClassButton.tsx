import React, { useState } from "react";
import { auth, firestore } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  where,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import classroomParticipant from "@/utils/types/classroom/classroomParticipantDetails";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

type JoinClassButtonProps = {};

const JoinClassButton: React.FC<JoinClassButtonProps> = () => {
  // Getting the code
  const [inputValue, setInputValue] = useState("");

  const [user] = useAuthState(auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // checking the classroom code
  const handleClick = async () => {
    if (user?.uid == null) {
      toast.error("No Classes Found", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      console.log("User not logged in");
    } else {
      // adding the participant to the classroom
      const val = inputValue;
      const classrooms = query(
        collection(firestore, "classrooms"),
        where("code", "==", val)
      );
      const querySnapshot = await getDocs(classrooms); // getting all the classrooms

      if (!querySnapshot.empty) {
        // finding the matched document
        const userRef = doc(collection(firestore, "users"), user?.uid);
        const userDoc = await getDoc(userRef);
        console.log(userDoc.data());
        console.log(user?.uid)
        if(userDoc.data()?.creatorId === user?.uid){
          toast.error("You are already a teacher", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          return;
        }
        const participant: classroomParticipant = {
          userId: user?.uid,
          role: "student",
        };

        querySnapshot.forEach(async (docSnapshot) => {
          const docId = docSnapshot.id;
          const docref = doc(collection(firestore, "classrooms"), docId);
          const docData = await getDoc(docref);
          // checking if the user is already a participant
          if (
            docData.data()?.participants.some(
              (participant: any) => participant.userId === user?.uid
            )
          ) {
            toast.error("You are already a participant", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
            });
            return;
          }
          try {
            await updateDoc(docref, {
              // updating classroom document
              participants: arrayUnion(participant),
            });
            try {
              await updateDoc(userRef, {
                // updating userDetails document
                classrooms: arrayUnion(docId),
              });
              toast.success("Class Joined Successfully", {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
              });
              // refresh the page
              window.location.reload();
            } catch (err) {
              console.log(err);
            }
          } catch (err) {
            console.log(err);
          }
        });
      } else {
        toast.error("No Classes Found", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        console.log("Wrong Code");
      }
    }
  };

  return (
    <div className="flex gap-4">
      <input
        value={inputValue}
        onChange={handleInputChange}
        className="h-10 min-w-[12rem] rounded-lg border border-dark-layer-7  bg-dark-gray-10 indent-4 text-dark-layer-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-b3"
        type="string"
        placeholder="Enter Class Code"
      />
      <button
        onClick={handleClick}
        className="h-10 min-w-[8rem] rounded-lg border border-b2 bg-primary-blue text-white shadow-md hover:bg-hover-primary-blue focus:outline-none focus:ring focus:ring-b3"
      >
        Join Class
      </button>
    </div>
  );
};
export default JoinClassButton;
