import React from 'react'
import NoiseAwareIcon from '@mui/icons-material/NoiseAware';
import { Button } from '@mui/material';
import "../assets/navb.css";

export default function Navb() {
  return (
   
        <div className='topbar'>
            <div className="logo"><NoiseAwareIcon fontSize=''  className='logobtn'/></div>
            <div className="title">GENZ Doon</div>
            <div className='Library'>
                <Button variant='outlined' color='secondary' className='librarybtn'>Library</Button>
            </div>
        </div>
     
    

  )
}
