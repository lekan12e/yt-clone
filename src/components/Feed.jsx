import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SideBar from "./SideBar";
import Videos from "./Videos";
import { FetchFromApi } from "../utils/FetchFromApi";
import SkeletonGrid from "./Skeleton"; // Assuming you have a skeleton component

const Feed = () => {
  const [selectedCategories, setselectedCategories] = useState("New");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const data = await FetchFromApi(`search?q=${selectedCategories}`);
        setVideos(data.items);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [selectedCategories]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}>
        <SideBar
          selectedCategories={selectedCategories}
          setselectedCategories={setselectedCategories}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}>
          Copyright 2022 YT clone
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}>
          {selectedCategories} <span style={{ color: "#f31503" }}>Videos</span>
        </Typography>
        {isLoading ? <SkeletonGrid /> : <Videos videos={videos} />}
      </Box>
    </Stack>
  );
};

export default Feed;
