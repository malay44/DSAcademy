import { questionDetails } from '@/utils/types/question';
import React from 'react';

type NewContestQuestionTableProps = {
  questions: questionDetails[];
};

const NewContestQuestionTable: React.FC<NewContestQuestionTableProps> = ({ questions }) => {
  return (
    <div>
      <div>
        <section className='flex justify-between '>
          <section className='flex justify-between w-1/5 text-dark-layer-1 font-bold'>
            <div >Sr. No</div>
            <div >Question Name</div>
          </section>
          <section className='flex justify-around w-1/5  text-dark-layer-1 font-bold'>
            <div >Points</div>
          </section>
        </section>
          {questions.map((q, index) => (
            <section key={index} className='flex justify-between  text-dark-layer-1'>  
              <section className='flex justify-between w-1/5'>
                <div >{index+1}</div>
                <div >{q.Name}</div>
              </section>
              <section className='flex justify-around w-1/5  text-dark-layer-1'>
                <div >{q.Points}</div>
              </section>
            </section>
          ))}
      </div>
    </div>
  );
};

export default NewContestQuestionTable;
