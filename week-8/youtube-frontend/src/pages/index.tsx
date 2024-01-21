import Image from "next/image";
import { Inter } from "next/font/google";
import VideoCard from "@/components/VideoCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <VideoCard title={"Why Files presents Battle for Earth | Nice to watch | When we were prey"}
      image={"photo.jpg"}
      thumbimage={"thumbnail.jpg"}
      author={"Pranav Jha"}
      views={"100k"}
      timestamp={"2 days ago"}/>
    </div>
  );
}
