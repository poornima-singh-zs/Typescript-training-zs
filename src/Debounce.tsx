/* eslint-disable @typescript-eslint/no-explicit-any */
import{ useState } from "react";
import "./Debounce.css"

const Debounce=()=>{
    const [value,setValue]=useState();

    function debounce(){
        let timer: number | undefined;

        return function inner(e:any){
            clearTimeout(timer)
            timer=setTimeout(()=>{
               setValue(e.target.value)
            },3000)
        }

    }

    return (
        <div className="parent">
        <input type="text" onChange={debounce()} ></input>
        <input type="text" value={value} ></input>
        </div>
    )
}
export default Debounce