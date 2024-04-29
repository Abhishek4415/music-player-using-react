import { useEffect, useRef, useState } from "react"
import "../assets/song.css"
import Library  from "./Library";
 
  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { 
    faPlay, 
    faAngleLeft, 
    faAngleRight, 
    faPause,
    faHand, 
} from "@fortawesome/free-solid-svg-icons"; 

export default function Song({selectedsong}) {
  if(!selectedsong){
    return 0;               //for null error handle
  }
  
  let [isrunning,setisrunning]=useState(false);
  let [inputvalue,setinputvalue]=useState(0);
  let [audioDuration,setAudioDuration]=useState(0);
  const audioRef=useRef(null);




  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = selectedsong.audio; // Update audio source when selected song changes
      if(isrunning)
      audioRef.current.play(); // Start playing the new song automatically
    }

    
  }, [selectedsong]);
 
  // console.log(selectedsong);

  useEffect(()=>{
    if(isrunning){
      audioRef.current.play();
    }else {
      audioRef.current.pause();
    }
  },[isrunning]);

  useEffect(()=>{
    audioRef.current.currentTime= inputvalue;
  },[inputvalue]);

  useEffect(()=>{
    if(audioRef.current){
    setAudioDuration(audioRef.current.duration);
    }
  },[audioRef.current &&   audioRef.current.duration]);
 



  useEffect(()=>{
    let intervalid;
    if(isrunning){
      intervalid=setInterval(()=>{
        if(inputvalue < audioDuration){
          // setinputvalue(inputvalue+1);
          setinputvalue((p)=>p+1);

        }else{
          setinputvalue(0);
          setisrunning(false);
        }
      
    },1000);
    }
    return ()=>clearInterval(intervalid);
  },[isrunning,inputvalue])

  const min=Math.floor((inputvalue % 3600)/60);
  const sec=Math.floor((inputvalue % 60)/1);
  const fmin=Math.floor((audioDuration / 60));
  const fsec=Math.floor((audioDuration % 60));
  // console.log(min,sec);
  // console.log(audioDuration);
  
  const startandstop=()=>{
    setisrunning(!isrunning);
  }



    

  return (
    <div className="song1">
      <div className="songbox">
            <audio ref={audioRef} onLoadedMetadata={()=> setAudioDuration(audioRef.current.duration)} >
              <source src={selectedsong.audio}/>
            </audio>
            <img src={selectedsong.cover} alt="img" className="songimg" />
            <div className="songdes">
                <p>{selectedsong.name}</p>
                <span>{selectedsong.artist}</span>
            </div>
            
            <input className="track" type="range" min={0} max={audioDuration.toString()} value={inputvalue} onChange={(e)=>setinputvalue(parseInt(e.target.value))} />
            <div className="watch">
              <span > {min.toString().padStart(2, "0")}:
              {sec.toString().padStart(2, "0")}</span>
              <span >{fmin.toString().padStart(2, "0")}:
              {fsec.toString().padStart(2, "0")}</span>
            </div>
            <div className="icon" >
                 <FontAwesomeIcon icon={faAngleLeft}  />
                 <FontAwesomeIcon icon={isrunning ? faPause : faPlay} type="button"  onClick={startandstop} />
                <FontAwesomeIcon  icon={faAngleRight}/>
            </div>
      </div>
    </div>
            
              
            
                 
              
            
              


            
        

  )
}


/*================================================================================================
                                          * INSTEAD OF USEREF USE *
===========================================================================================================*/

// import { useEffect, useState } from "react";
// import "../assets/song.css";
// import Library from "./Library";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

// export default function Song({ selectedsong }) {
//   if (!selectedsong) {
//     return <>no song is selected</>;
//   }

//   const [audioElement, setAudioElement] = useState(new Audio(selectedsong.audio));
//   const [isRunning, setIsRunning] = useState(false);
//   const [inputValue, setInputValue] = useState(0);
//   const [audioDuration, setAudioDuration] = useState(0);

//   useEffect(() => {
//     audioElement.src = selectedsong.audio;
//     audioElement.play();
//   }, [selectedsong, audioElement]);

//   useEffect(() => {
//     if (isRunning) {
//       audioElement.play();
//     } else {
//       audioElement.pause();
//     }
//   }, [isRunning, audioElement]);

//   useEffect(() => {
//     audioElement.currentTime = inputValue;
//   }, [inputValue, audioElement]);

//   useEffect(() => {
//     const handleLoadedMetadata = () => {
//       setAudioDuration(audioElement.duration);
//     };
//     audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
//     return () => {
//       audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
//     };
//   }, [audioElement]);

//   useEffect(() => {
//     let intervalId;
//     if (isRunning) {
//       intervalId = setInterval(() => {
//         if (inputValue < audioDuration) {
//           setInputValue((prevInputValue) => prevInputValue + 1);
//         } else {
//           setInputValue(0);
//           setIsRunning(false);
//         }
//       }, 1000);
//     }
//     return () => clearInterval(intervalId);
//   }, [isRunning, inputValue, audioDuration]);

//   const min = Math.floor((inputValue % 3600) / 60);
//   const sec = Math.floor((inputValue % 60) / 1);
//   const fmin = Math.floor(audioDuration / 60);
//   const fsec = Math.floor(audioDuration % 60);

//   const startAndStop = () => {
//     setIsRunning((prevIsRunning) => !prevIsRunning);
//   };

//   return (
//     <div className="song1">
//       <div className="songbox">
//         <img src={selectedsong.cover} alt="img" className="songimg" />
//         <div className="songdes">
//           <p>{selectedsong.name}</p>
//           <span>{selectedsong.artist}</span>
//         </div>
//         <input
//           className="track"
//           type="range"
//           min={0}
//           max={audioDuration.toString()}
//           value={inputValue}
//           onChange={(e) => setInputValue(parseInt(e.target.value))}
//         />
//         <div className="watch">
//           <span>
//             {min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}
//           </span>
//           <span>
//             {fmin.toString().padStart(2, "0")}:{fsec.toString().padStart(2, "0")}
//           </span>
//         </div>
//         <div className="icon">
//           <FontAwesomeIcon icon={faAngleLeft} />
//           <FontAwesomeIcon icon={isRunning ? faPause : faPlay} type="button" onClick={startAndStop} />
//           <FontAwesomeIcon icon={faAngleRight} />
//         </div>
//       </div>
//     </div>
//   );
// }
