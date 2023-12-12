import React, { useState } from 'react';
import { FaRegHeart, FaHeart , FaRegComment, FaComment , FaUser} from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";

type ChatProps = {
    
};

const Chat:React.FC<ChatProps> = () => {
    const [likeCount, setLikeCount] = useState<number>(0);
    const [commentCount, setCommentCount] = useState<number>(0);
    const [showReplies, setShowReplies] = useState<boolean>(false);
    
    const handleLikeClick = () => {
      setLikeCount((prevCount) => (prevCount === 0 ? 1 : 0));
    };
  
    const handleCommentClick = () => {
      setCommentCount((prevCount) => (prevCount === 0 ? 1 : 0));
      setShowReplies((prevValue) => !prevValue);
    };
    return (
        <div className='w-full border-2 rounded-lg p-5 flex flex-col gap-3 text-dark-gray-7 font-normal text-sm'>
          <h3 className='text-gray-600 font-medium text-lg'>No class today</h3>
          <p>
            There’s no class today. There’s no class today. There’s no class today. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Cursus imperdiet sed id elementum. Quam vel aliquam
            sit vulputate. Lorem ipsum dolor sit amet, consectetur.
          </p>
          <div className='flex gap-6 items-center'>
            <div
              className='flex gap-2 items-center justify-center cursor-pointer'
              onClick={handleLikeClick}
            >
              {likeCount === 0 ? <FaRegHeart /> : <FaHeart />}
              <p>{likeCount}</p>
            </div>
            <div
              className='flex gap-2 items-center justify-center cursor-pointer'
              onClick={handleCommentClick}
            >
              {commentCount === 0 ? <FaRegComment /> : <FaComment />}
              <p>{commentCount}</p>
            </div>
            <HiOutlineShare />
          </div>
    
          {showReplies && (
            <div className='border-t-2 flex flex-col gap-3 pt-2'>
              <h3 className='text-gray-600 font-medium text-lg'>Replies</h3>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-3'>
                  <div className='rounded-full bg-primary-blue w-7 h-7 text-white p-1.5'>
                    <FaUser />
                  </div>
                  <h2 className='text-gray-600 font-medium text-base'>Username</h2>
                </div>
                <p className='ml-10'>Replied text</p>
              </div>
            </div>
          )}
        </div>
    );
}
export default Chat;