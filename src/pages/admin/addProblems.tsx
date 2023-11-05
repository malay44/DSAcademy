import { firestore } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react'
import {problems} from '@/mockProblems/problems';

type Props = {}

const AddProblems = (props: Props) => {
    const [inputs, setInputs] = useState({
        id: '',
        title: '',
        difficulty: '',
        category: '',
        order: '',
        videoId: '',
        link: '',
        likes: 0,
        dislikes: 0,
    });

    const handelInputChange = (e: any) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault(); // prevent page refresh / convert inputs order to integer
        problems.forEach(async (problem) => {
            await setDoc(doc(firestore, "problems", problem.id), problem);
            alert('saved to db');
        }
        );
      };
      

    console.log(problems);
    return (
        <div>
            temp form
            <form className='p-6 flex flex-col max-w-sm gap-3' onSubmit={handleSubmit}>
                <input onChange={handelInputChange} type='text' placeholder='problem id' name='id' />
                <input onChange={handelInputChange} type='text' placeholder='title' name='title' />
                <input onChange={handelInputChange} type='text' placeholder='difficulty' name='difficulty' />
                <input onChange={handelInputChange} type='text' placeholder='category' name='category' />
                <input onChange={handelInputChange} type='text' placeholder='order' name='order' />
                <input onChange={handelInputChange} type='text' placeholder='videoId?' name='videoId' />
                <input onChange={handelInputChange} type='text' placeholder='link?' name='link' />
                <button className=' bg-gray-400'>Save to db</button>
            </form>
        </div>
    )
}

export default AddProblems