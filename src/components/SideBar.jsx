import React from 'react'
import { Stack } from '@mui/material'
import { categories } from '../utils/constants'

const SideBar = ({selectedCategories, setselectedCategories}) => {
  return (
    <Stack direction="row" sx={{
        overflowY: "auto",
        height: {sx: "auto",md: '95%'},
        flexDirection: {md: 'column',}

    }}>
        {categories.map((category, name) => (
            <button key={name}
                onClick={() => {setselectedCategories(category.name)}}
                className='category-btn'
                style={{background: category.name === selectedCategories && "#fc1503", color: "white"
                 }}
            >
                <span style={{color: category.name === selectedCategories? "white" : "red", marginRight: "15px"}} >{category.icon}</span>
                <span style={{opacity: category.name === selectedCategories? "1" : "0.8"}}>{category.name}</span>
            </button>
        ))}
    </Stack>
  )
}

export default SideBar