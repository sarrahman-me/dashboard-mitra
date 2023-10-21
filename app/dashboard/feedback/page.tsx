"use client";
import { Button, Heading, Input } from "@/components/atoms";
import { PostDataApi } from "@/utils";
import { Notify } from "notiflix";
import { useState } from "react";

export default function Feedback() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const sendMessage = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/message/send/email`,
      { text, to: "sarrahman.me@gmail.com", subject }
    );

    if (sendMessage.success) {
      Notify.success("Feedback terkirim");
    } else {
      Notify.failure("Feedback gagal terkirim");
    }
  };

  return (
    <div>
      <Heading>Feedback</Heading>
      <div className="p-6 bg-white rounded-lg dark:bg-slate-800">
        <form onSubmit={handleSubmit} className="mt-4">
          <Input
            label="Judul"
            name="Judul"
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className="mb-4">
            <label htmlFor="feedback" className="block">
              Kritik & Saran
            </label>
            <textarea
              onChange={(e) => setText(e.target.value)}
              id="feedback"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              rows={5}
              required
            ></textarea>
          </div>
          <Button isSubmit={true}>Submit Feedback</Button>
        </form>
      </div>
    </div>
  );
}
