"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { ScrollAnimation } from "@/components/page-transition";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const videos = [
  {
    id: "video1",
    title: "ARC 2022 Journey",
    description: "Our complete journey at Anatolian Rover Challenge 2022",
    youtubeId: "MtGT4qaSBn8",
    thumbnail: "/durbar1.jpg",
  },
  {
    id: "video2",
    title: "Rover Testing",
    description: "Field testing our latest Mars rover prototype",
    youtubeId: "ML1VA-ceKm8",
    thumbnail: "/durbar2.jpg",
  },
  {
    id: "video3",
    title: "Team Documentary",
    description: "Behind the scenes with Team Durbar",
    youtubeId: "DxiYWCe7TLI",
    thumbnail: "/durbar3.jpg",
  },
];

export function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(
    null
  );

  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <ScrollAnimation>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium mb-4">
              Watch & Learn
            </span>
            <h2 className="section-heading mb-4">
              Watch Our <span className="text-gradient-mars">Journey</span>
            </h2>
            <p className="section-subheading mx-auto">
              Experience our story through videos documenting our progress and achievements
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video, index) => (
            <ScrollAnimation key={video.id} delay={index * 0.1}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedVideo(video)}
                className="group relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-200 dark:bg-zinc-800"
              >
                {/* Video thumbnail */}
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-space-black/40 group-hover:bg-space-black/60 transition-colors duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-mars flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                  >
                    <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" />
                  </motion.div>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-space-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-left">
                    {video.title}
                  </h3>
                  <p className="text-white/70 text-sm text-left mt-1">
                    {video.description}
                  </p>
                </div>
              </motion.button>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedVideo && (
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

