import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import Videos from './Videos';
import { FetchFromApi } from '../utils/FetchFromApi';

const VideoDetails = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState(null);
  const [shouldRenderVideos, setShouldRenderVideos] = useState(false);

  useEffect(() => {
    FetchFromApi(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetails(data.items[0]));
      
    FetchFromApi(`search?part=snippet&relatedToVideoId=${id}`)
      .then((data) => setVideos(data.items));
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRenderVideos(true);
    }, 3000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [videos]);

  if (!videoDetails?.snippet) return "Loading...";

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: "86px" }}>
            <ReactPlayer controls url={`https://www.youtube.com/watch?v=${id}`} className="react-player" />
            <Typography variant='h4' color='#fff' fontWeight="bold" p="2">
              {videoDetails.snippet.title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
              <Link to={`/channel/${videoDetails.snippet.channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: "h6" }} color="#fff">
                  {videoDetails.snippet.channelTitle}
                  <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(videoDetails.statistics.viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(videoDetails.statistics.likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
        {shouldRenderVideos ? <Videos videos={videos} style={{direction:{xs:"column", md: "row", sm: "row"}}} /> : <p style={{textAlign: "center", color: "#fff", fontWeight: "bold"}}>Loading videos...</p>}
      </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetails;