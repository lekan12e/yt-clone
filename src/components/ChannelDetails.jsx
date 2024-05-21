import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import Videos from './Videos';
import ChannelCard from './ChannelCard';
import { FetchFromApi } from "../utils/FetchFromApi";

const ChannelDetails = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const [shouldRenderVideos, setShouldRenderVideos] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    FetchFromApi(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));
      
    FetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRenderVideos(true);
    }, 5000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [videos]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: "linear-gradient(90deg, rgba(17,5,213,1) 0%, rgba(191,22,50,1) 55%, rgba(0,212,255,1) 100%)",
          height: "300px",
          zIndex: 10
        }}>
        </div>
        <ChannelCard channelDetail={channelDetail} marginTop='-120px' />
      </Box>
      <Box display='flex' p="20px" sx={{flexDirection:{sm:"row"}}}>
        <Box sx={{ mr: { sm: '100px' } }} />
        {shouldRenderVideos ? <Videos videos={videos} /> : <p style={{textAlign: "center", color: "#fff", fontWeight: "bold"}}>Loading videos...</p>}
      </Box>
    </Box>
  );
}

export default ChannelDetails;