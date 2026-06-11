"use client";
import Image from "next/image";
import { useState, useEffect } from "react"

export default function HomePage() {

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  return (   
    <h1 className="heading-text">Hello</h1>
  );
}
