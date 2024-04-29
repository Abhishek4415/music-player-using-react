import { cloneElement, useEffect, useState } from "react"
import "../assets/library.css"
import chillHop from "../musicdata";

export default function Library({ setselectedsong}){
    let [collection,setcollection]=useState(chillHop);
    // let collection =chillHop;


    useEffect(()=>{
         function getfirstsong(){
            let response =( collection);
            setselectedsong(response[0]);
            
            // console.log(response[0]);

        }
        getfirstsong();

    },[])
    

    // //also you can write without the function both correct
    // useEffect(()=>{
    //     let response =( collection);
    //     setselectedsong(response[0]);
        
    //     console.log(response[0]);

    // },[])




    let handleclicksong=(song)=>{
        setselectedsong(song);

    }

    

    return(
        <div className="librarybox">
            <ul >
                <div > {collection.map((song)=>
                <li  key={song.id} className="listsection" typeof="button" onClick={()=>handleclicksong(song)}>
                        <img src={song.cover} alt="" className="listimg" />
                        <div className="description">
                            <h5>{song.name}</h5>
                            <span>{song.artist}</span>
                        </div>
                </li>
                )}
                </div>

            </ul>
        </div>
    )
}