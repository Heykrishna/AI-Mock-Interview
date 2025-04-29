"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
// import { userRouter } from 'react-router-dom'
import { useRouter } from 'react-router-dom'
import { Button } from '@/components/ui/button'


function Feedback({params}) {

  const router=useRouter;
  const [feedbackList, setFeedbackList]=useState([]);
  useEffect(()=>{
    GetFeedback();
  },[])
  const GetFeedback=async()=>{
    const result = await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef,params.interviewId))
    .orderBy(UserAnswer.id)

    console.log(result);
    setFeedbackList(result);
  }


  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>

      <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, your answer and feedback for improvement</h2>
      {feedbackList&&feedbackList.map((item,index)=>(
        <Collapsible key={index} className='mt-6'>
        <CollapsibleTrigger className= 'p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>
        {item.question} <ChevronsUpDown className='h-5 w-5'/>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='flex flex-col gap-2'>
            <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
            <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong>{item.UserAnswer}</h2>
            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer:</strong>{item.CorrectAns}</h2>
            <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback:</strong>{item.Feedback}</h2>
          </div>
        </CollapsibleContent>
        </Collapsible>

    ))}

      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>  
    </div>
  )
}

export default Feedback
