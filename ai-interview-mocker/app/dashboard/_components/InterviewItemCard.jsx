import { Button } from '@/components/ui/button';
import React from 'react';

function InterviewItemCard({ interview }) {
  return (
    <div className='border shadow-sm rounded-lg p-4 space-y-2'>
      <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
      <h2 className='text-xs text-gray-500'>Created At: {interview?.createdAt}</h2>

      <div className='flex gap-2 pt-2'>
        <Button size='sm' variant='outline' className='w-1/2'>
          Feedback
        </Button>
        <Button size='sm' className='w-1/2'>
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
