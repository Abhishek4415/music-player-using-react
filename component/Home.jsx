import { useState } from "react"
import "../assets/Home.css"
import Library from "./Library"
import Navb from "./navb"
import Song from "./song"
import chillHop from "../musicdata"

export default function MusicPlayer() {
  const [selectedsong,setselectedsong]=useState(null);
  return (
    <div>
        <div><Navb/></div>
        <div className="feed">
            <div className="library"><Library  setselectedsong={setselectedsong}/></div>
            <div className="song"><Song  selectedsong={selectedsong}/></div>
        </div>

    </div>
  )
}
