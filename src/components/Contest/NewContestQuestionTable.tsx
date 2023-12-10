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
        <h2>Questions List</h2>
        <table>
          <thead>
            <tr>
              <th>Question Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={index}>
                <td>{q.name}</td>
                <td>{q.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewContestQuestionTable;
