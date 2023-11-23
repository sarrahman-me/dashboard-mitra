"use client";
import Script from "next/script";

const RoomvoVisualize = () => {
  return (
    <>
      <Script
        async
        id="roomvoAssistant"
        type="text/javascript"
        data-locale="en-id"
        data-position="bottom-right"
        src="https://www.roomvo.com/static/scripts/b2b/common/assistant.js"
      ></Script>
    </>
  );
};

export default RoomvoVisualize;
