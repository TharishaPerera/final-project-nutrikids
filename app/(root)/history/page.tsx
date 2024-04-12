"use client";

import { createMeeting } from "@/actions/appointment/daily.co/meeting";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";

const HistoryPage = () => {
  const [meetingLink, setMeetingLink] = useState<string | undefined>("");

  const createNewMeeting = async () => {
    createMeeting().then((res) => {
      if (res.error) {
        console.log(res.error);
        toast.error(res.error);
      } else {
        setMeetingLink(res.url);
      }
    });
  };
  return (
    <>
      <Button onClick={createNewMeeting}>Create Meeting</Button>
      {meetingLink && <p>{meetingLink}</p>}
    </>
  );
};

export default HistoryPage;
