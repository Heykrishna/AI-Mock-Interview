"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';
import '../../globals.css'

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));

    console.log(result);
    setInterviewList(result);
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="font-semibold text-2xl text-primary mb-10">Previous Mock Interviews</h2>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      
      <div className="customcss">
        {interviewList?.map((interview, index) => (
          <InterviewItemCard key={index} interview={interview} />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;
