import React from 'react'
import { useState,useEffect} from 'react'
import { Box,Typography} from '@mui/material'
import Videos from './Videos'
import { FetchFromApi } from '../utils/FetchFromApi'
import { useParams } from 'react-router-dom'

const Feed = () => {
  const [videos, setVideos] = useState([])
  const {searchTerm} = useParams()
  useEffect(() => {
    FetchFromApi(`search?q=${searchTerm}`)
    .then((data) =>setVideos(data.items))
  }
  ,[searchTerm])
  return (
      <Box p={2} sx={{overflowY: "auto", height: "90vh", flex : 2}}>
          <Typography variant='h4' fontWeight='bold' mb={2} sx={{color: "white"}}>
            Search Results for: <span style={{color: "#f31503"}}>{searchTerm}</span>
          </Typography>
          <Videos videos={videos} />
      </Box>
  )
}

export default Feed