"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic, StopCircle } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";


const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    results,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
    setResults



  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(()=>{

    results?.map((result)=>
      setUserAnswer(prevAns=>prevAns+result?.transcript))

  },[results])


  useEffect(()=>{
    if(!isRecording&&userAnswer?.length>10)
    {
      UpdateUserAnswer();
    }
  },[userAnswer])




  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();

      // Append final transcript
      const finalTranscript = results.map((r) => r.transcript).join(" ");
      setUserAnswer((prev) => prev + finalTranscript);

      // if ((userAnswer + finalTranscript).length < 10) {
      //   toast(" Please record a longer answer.");
      //   return;
      // }

      await UpdateUserAnswer(userAnswer + finalTranscript);
    } else {
      setUserAnswer("");
      setFeedback(null);
      startSpeechToText();
    }
  };

  const UpdateUserAnswer=async(finalAnswer) => {
    try {
      setLoading(true);

      const questionText = mockInterviewQuestion[activeQuestionIndex]?.question;

      const feedbackPrompt = `Question: ${questionText}, User Answer: ${finalAnswer}. Based on the question and user answer, please give a rating and brief feedback in JSON format with only the fields: rating and feedback (as an array of strings). Return only the JSON object without any explanation or markdown formatting.`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.text.replace("```json", "").replace("```", "");
      const JsonFeedBackResp = JSON.parse(mockJsonResp);

      setFeedback(JsonFeedBackResp); // show feedback in UI

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: questionText,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: finalAnswer,
        feedback: JsonFeedBackResp?.feedback,
        rating: JsonFeedBackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      toast("Answer recorded and feedback generated!");
      setUserAnswer("");
    } catch (error) {
      console.error(error);
      toast(" Error saving answer.");
    } finally {
      setLoading(false);
    }

      if(resp)
      {
        toast("User Answer recorded sucessfully");
        setUserAnswer("");
        setResults([]);
      }
      setResults([]);


      setLoading(false);
  }

  return (
    <div className="flex items-center justify-center flex-col">
      {/* Webcam Display */}
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative shadow-lg">
        <Image
          alt="webcam image"
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute opacity-10"
        />
        <Webcam
          mirrored
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
            borderRadius: "0.5rem",
          }}
        />
      </div>

      {/* Record Button */}
      <Button
        disabled={loading}
        variant="outline"
        className="hover:cursor-pointer my-10 text-lg px-6 py-3"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <span className="text-red-600 flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </span>
        ) : (
          <span className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </span>
        )}
      </Button>

      {/* Optional: Show Answer for Debugging */}
      {/* <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}

      {/* Feedback Display */}
      {feedback && (
        <div className="mt-6 bg-white p-4 rounded shadow-md max-w-xl text-left border border-gray-200">
          <h3 className="font-bold text-lg mb-2 text-primary">Feedback</h3>
          <p className="mb-2">
            <strong>Rating:</strong> {feedback.rating}
          </p>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {feedback.feedback?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecordAnswerSection;
