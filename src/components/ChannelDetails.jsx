import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Videos from "./Videos";
import ChannelCard from "./ChannelCard";
import { FetchFromApi } from "../utils/FetchFromApi";
import SkeletonGrid from "./Skeleton";

const ChannelDetails = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);

        const channelData = await FetchFromApi(
          `channels?part=snippet&id=${id}`
        );
        setChannelDetail(channelData?.items[0]);

        const videoData = await FetchFromApi(
          `search?channelId=${id}&part=snippet&order=date`
        );
        setVideos(videoData?.items);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(17,5,213,1) 0%, rgba(191,22,50,1) 55%, rgba(0,212,255,1) 100%)",
            height: "300px",
            zIndex: 10,
          }}></div>
        <ChannelCard channelDetail={channelDetail} marginTop="-120px" />
      </Box>
      <Box
        px={1}
        py={{ md: 1, xs: 5 }}
        justifyContent="center"
        alignItems="center">
        <Box sx={{ mr: { sm: "100px" } }} />
        {isLoading ? (
          <Box
            px={1}
            py={{ md: 1, xs: 5 }}
            justifyContent="center"
            alignItems="center">
            <SkeletonGrid
              style={{ direction: { xs: "column", md: "row", sm: "row" } }}
            />
          </Box>
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetails;
