import React from 'react'
import { useState,useEffect} from 'react'
import { Box,Stack,Typography} from '@mui/material'
import SideBar from './SideBar'
import Videos from './Videos'
import { FetchFromApi } from '../utils/FetchFromApi'


const Feed = () => {
  const [selectedCategories, setselectedCategories] = useState("New")
  const [videos, setVideos] = useState([])

  useEffect(() => {
    FetchFromApi(`search?q=${selectedCategories}`)
    .then((data) =>setVideos(data.items))
  }
  ,[selectedCategories])
  return (
    <Stack sx={{flexDirection: {sx: "column", md: "row"}}}>
        <Box 
            sx={{ height: {sx: "auto", md: "92vh"},
            borderRight: "1px solid #3d3d3d", 
            px: {sx: 0, md: 2}}}
        >
            <SideBar
            selectedCategories = {selectedCategories}
            setselectedCategories = {setselectedCategories}
            />
            <Typography className='copyright'
            variant='body2'
            sx={{mt:1.5, color: "#fff"}}>
                Copyright 2022 YT clone
            </Typography>
        </Box>
        <Box p={2} sx={{overflowY: "auto", height: "90vh", flex : 2}}>
          <Typography variant='h4' fontWeight='bold' mb={2} sx={{color: "white"}}>
            {selectedCategories} <span style={{color: "#f31503"}}>Videos</span>
          </Typography>
          <Videos videos={videos} />
        </Box>
    </Stack>
  )
}

export default Feed