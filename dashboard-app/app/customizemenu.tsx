import styles from "./customizemenu.module.css";
import { useState, useEffect } from "react";

export default function CustomizeMenu() {
    const [backgroundColor, setBackgroundColor] = useState("black");
    const [bgIndex, setBgIndex] = useState(0);
    const [darkText, setDarkText] = useState(true);

    const bgColors = ["black", "grey", "darkgrey", "lightblue", "lightred"];

    const handleBgColorChange = () => {
        const nextIndex = (bgIndex + 1) % bgColors.length;
        setBgIndex(nextIndex);
        setBackgroundColor(bgColors[nextIndex]);
        document.documentElement.style.setProperty("--background", bgColors[nextIndex]);
    }

    const handleTextColorChange = () => {
        setDarkText(!darkText);

        let color;

        if (darkText) {
            color = "black";
        } else {
            color = "white";
        }

        document.documentElement.style.setProperty("--foreground", color);
    }

    return (
        <div className="customize-menu">
            <h2 className={styles.title}>Customize</h2>
            
            <button className={styles.changeColorBtn} onClick={() => {handleBgColorChange()}}>Change Background Color</button>
            <button className={styles.changeTextBtn} onClick={() => {handleTextColorChange()}}>Change Text Color</button>
        </div>
    );
}