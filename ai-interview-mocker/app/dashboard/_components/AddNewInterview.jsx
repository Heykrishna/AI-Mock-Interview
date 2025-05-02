"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `
Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers in JSON format.

The candidate is applying for the role of: ${jobPosition}
Job Description/Tech Stack: ${jobDesc}
Years of Experience: ${jobExperience}

The questions must be relevant to:
1. Deep technical knowledge in React, Node.js, MySQL, and Firebase
2. System architecture and design decisions
3. Problem-solving and debugging skills
4. Common design patterns and testing approaches
5. Team collaboration and communication scenarios

Distribute the questions evenly across these five categories.

Output format:
[
  {
    "question": "What is XYZ?",
    "answer": "XYZ is..."
  },
  ...
]

Only return the JSON array. Do not include any commentary or explanation.
`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const cleanedText = result.text
        .replace("```json", "")
        .replace("```", "")
        .trim();

      let parsedJson = [];
      try {
        parsedJson = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        setLoading(false);
        return;
      }

      console.log(parsedJson);
      setJsonResponse(parsedJson);

      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(parsedJson),
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID:", resp);

      if (resp && resp.length > 0) {
        setOpenDialog(false);
        setJobPosition("");
        setJobDesc("");
        setJobExperience("");
        router.push(`/dashboard/interview/${resp[0]?.mockId}`);
      } else {
        console.log("Insertion Error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl w-full p-8 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl text-center mb-6">
              Add Interview Details
            </DialogTitle>
            <DialogDescription asChild>
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Role / Job Position
                  </label>
                  <Input
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    placeholder="Ex. Full Stack Developer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description / Tech Stack
                  </label>
                  <Textarea
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Ex. React, Angular, Node.js, MySQL, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <Input
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                    placeholder="Ex. 5"
                    type="number"
                    min="0"
                    max="100"
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
