"use client";
import { Heading } from "@/components/atoms";
import { Button, Container, Textfield } from "@/src/components";
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
      <Container otherClass="p-6">
        <form onSubmit={handleSubmit} className="mt-4">
          <Textfield
            fullWidth
            label="Judul"
            name="Judul"
            onChange={(value) => setSubject(value)}
          />
          <div className="mb-4">
            <label htmlFor="feedback" className="block">
              Kritik & Saran
            </label>
            <textarea
              onChange={(e) => setText(e.target.value)}
              id="feedback"
              className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              rows={5}
              required
            ></textarea>
          </div>
          <Button type="submit">Submit Feedback</Button>
        </form>
      </Container>
    </div>
  );
}
