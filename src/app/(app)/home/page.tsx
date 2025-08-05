"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";
import toast from "react-hot-toast";
function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to fetch videos");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // const handleDownload = useCallback((url: string, title: string) => {
  //   (() => {
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", `${title}.mp4`);
  //     link.setAttribute("target", "_blank");
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   })();
  // }, []);

  const handleDownload = useCallback((url: string, title: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", `${title}.mp4`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((err) => {
        console.error("Download error:", err);
        alert("Download failed. Please try again.");
      });
  }, []);


  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="loading loading-dots loading-xl"></div>
      </div>
    );
  }

  return (
    <div className=" w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {videos.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No videos available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
