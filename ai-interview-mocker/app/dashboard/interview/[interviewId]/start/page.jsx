"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection.jsx';
import dynamic from 'next/dynamic';
const RecordAnswerSection = dynamic(() => import('./_components/RecordAnswerSection.jsx'), {
  ssr: false,
});

const StartInterview = () => {
    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
    const params=useParams();
    useEffect(()=>{
        GetInterviewDetails();
    },[])
    const GetInterviewDetails = async () => {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));
        
        const jsonMockResp=JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      };
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionsSection mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
        />
    </div>
  )
}

export default StartInterview
