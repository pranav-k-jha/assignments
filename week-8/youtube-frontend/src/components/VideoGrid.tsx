import React from "react";
import VideoCard from "./VideoCard";

const VIDEOS = [
  {
    title: "Epic Adventure: Journey to the Enchanted Forest",
    image: "photo.jpg",
    thumbimage: "thumbnail.jpg",
    author: "AdventureSeeker99",
    views: "1.2M",
    timestamp: "3 days ago",
  },
  {
    title: "Cooking Masterclass: Perfecting the Art of Sushi",
    image: "photo.jpg",
    thumbimage: "thumbnail.jpg",
    author: "ChefSakura",
    views: "800k",
    timestamp: "5 days ago",
  },
  {
    title: "Space Exploration: Journey to the Unknown Galaxies",
    image: "photo.jpg",
    thumbimage: "thumbnail.jpg",
    author: "CosmicExplorer",
    views: "2.5M",
    timestamp: "2 weeks ago",
  },
  {
    title: "Fitness Challenge: 30 Days to a Healthier You",
    image: "photo.jpg",
    thumbimage: "thumbnail.jpg",
    author: "FitFreak123",
    views: "900k",
    timestamp: "4 days ago",
  },
  {
    title: "Tech Talk: Future of Artificial Intelligence",
    image: "photo.jpg",
    thumbimage: "thumbnail.jpg",
    author: "TechEnthusiast",
    views: "1.8M",
    timestamp: "6 days ago",
  },
  {
    title: "DIY Home Decor: Transform Your Space on a Budget",
    image: "photo.jpg",
    thumbimage: "thumbnail.jpg",
    author: "CreativeDIYer",
    views: "600k",
    timestamp: "1 day ago",
  },
  {
    title: "Wildlife Photography: Capturing Moments in the Safari",
    image: "photo.jpg",
    thumbimage: "thumbnail.jpg",
    author: "PhotoExplorer",
    views: "1.5M",
    timestamp: "2 days ago",
  },
  {
    title: "Mindful Meditation: Achieving Inner Peace and Balance",
    image: "photo.jpg",
    thumbimage: "thumbnail.jpg",
    author: "ZenMaster",
    views: "700k",
    timestamp: "3 days ago",
  },
];

const VideoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {VIDEOS.map((video) => (
        <div>
          <VideoCard
            title={video.title}
            image={video.image}
            thumbimage={video.thumbimage}
            author={video.author}
            views={video.views}
            timestamp={video.timestamp}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
