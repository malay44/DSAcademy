import React from 'react';


type Question = {
  name: string;
  points: number;
};

type NewContestQuestionTableProps = {
  questions: Question[];
};

const NewContestQuestionTable: React.FC<NewContestQuestionTableProps> = ({ questions }) => {
  return (
    <div>
      <div>
        {/* <h2 className='flex justify-center items-center font-bold text-b4'>Questions List</h2> */}
        {/* <table>
            <thead className='flex w-3/5 justify-between'>
              <tr>
                <th>Sr. No</th>
                <th>Question Name</th>
                <th>Points</th>
              </tr>
            </thead>
          <tbody className='flex w-3/5 justify-between'>
            {questions.map((q, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{q.name}</td>
                <td>{q.points}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
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
                <div >{q.name}</div>
              </section>
              <section className='flex justify-around w-1/5  text-dark-layer-1'>
                <div >{q.points}</div>
              </section>
            </section>
          ))}
      </div>
    </div>
  );
};

export default NewContestQuestionTable;
