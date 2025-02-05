/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState ,useEffect} from "react";
import "./Traffic.css";


const Traffic = () => {
    const [color, setColor] = useState("red");

    const colors = ["red", "yellow", "green"];
    const durations = [5000, 2000, 3000]; 

    const startTrafficCycle = (index = 0) => {
        setColor(colors[index]); 

        setTimeout(() => {
            startTrafficCycle((index + 1) % 3); 
        }, durations[index]); 
    };

    useEffect(() => {
        startTrafficCycle(); 
    }, []);


    return (
        <div className="parent">
            <div className="upper">
                <div className={`circle ${color === "red" ? "red" : ""}`}></div>
                <div className={`circle ${color === "yellow" ? "yellow" : ""}`}></div>
                <div className={`circle ${color === "green" ? "green" : ""}`}></div>
            </div>
            <div className="lower"></div>
        </div>
    );
};

export default Traffic;



