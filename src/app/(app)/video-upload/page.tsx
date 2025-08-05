"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  //max file size of 60 mb

  const MAX_FILE_SIZE = 60 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      //TODO: add notification
      toast.error("File size too large");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      const response = await axios.post("/api/video-upload", formData);
      // check for 200 response
      toast.success("Video uploaded successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
      // notification for failure
      toast.error("Video upload failed")
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="xl:p-10 2xl:p-20 p-4">
      <h1 className="text-2xl xl:text-5xl 2xl:text-7xl font-bold mb-4">
        Upload Video
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text 2xl:text-4xl">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full 2xl:h-20"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text 2xl:text-4xl">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full 2xl:h-40"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text 2xl:text-4xl">Video File</span>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full 2xl:text-3xl 2xl:file-input-xl 2xl:h-28"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary xl:btn-xl 2xl:h-20 2xl:w-md 2xl:text-4xl rounded-lg"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
