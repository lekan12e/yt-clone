import React from "react";
import { Box, Stack } from "@mui/material";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";

const Videos = ({ videos, direction }) => {
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="center"
      gap={2}>
      {videos.map((item, index) => {
        return (
          <Box
            key={index}
            borderRadius="10px"
            bgcolor="lightgray"
            sx={{ cursor: "pointer", boxSizing: "border-box" }}>
            {item.id.videoId && <VideoCard video={item} />}
            {item.id.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Videos;
