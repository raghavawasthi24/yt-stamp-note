"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaTelegramPlane } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormSchema = z.object({
  id: z.string().min(2, {
    message: "Enter valid id",
  }),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: "",
    },
  });

  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const videoId = data.id;
    const apiKey = "AIzaSyAxJ14uTaFCLaERjuFxmY1EJsjJYV76dK4";
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

    console.log(apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.items.length > 0) {
          const videoDetails = data.items[0].snippet;
          console.log("Video Details:", videoDetails);
          localStorage.setItem("title", JSON.stringify(videoDetails.title));
          localStorage.setItem(
            "description",
            JSON.stringify(videoDetails.description)
          );
          toast.success("Redirecting to notes page.");
          router.push(`/${videoId}`);
        } else {
          toast.error("No video found with the provided ID.");
        }
      })
      .catch((error) => console.error("Error fetching video details:", error));
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-screen flex flex-col justify-center items-center gap-8 bg-gradient-to-r from-blue-200 to-green-200"
      >
        <p className="text-6xl font-bold">Make notes with Video Player</p>
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Youtube Video ID</FormLabel>
              <FormControl>
                <Input placeholder="ID" {...field} className="w-[500px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <FaTelegramPlane className="w-5 h-5 mr-2" />
          Search
        </Button>
      </form>
      <ToastContainer />
    </Form>
  );
}
