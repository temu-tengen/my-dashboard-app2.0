"use client";
import Image from "next/image";
import { useState, useEffect } from "react"
import Bookmark from "./bookmark";
import CustomizeMenu from "./customizemenu";

import styles from "./page.module.css";

export interface BookmarkData {
  url: string;
  title: string;
}

const DEFAULT_BOOKMARKS: BookmarkData[] = [
  { url: "https://www.xbox.com", title: "Xbox" },
  { url: "https://www.netflix.com", title: "Netflix" },
  { url: "https://www.spotify.com", title: "Spotify" },
  { url: "https://www.youtube.com", title: "YouTube" },
];

export default function HomePage() {
  const [time, setTime] = useState("Shalin Was Here");
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>(DEFAULT_BOOKMARKS);
  const [url, setUrl] = useState("");
  const [showCustomizeMenu, setShowCustomizeMenu] = useState(false);

  var date = new Date().toLocaleDateString();

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Failed to parse bookmarks from localStorage:", error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const updateBookmark = (index: number, updatedBookmark: BookmarkData) => {
    const newBookmarks = [...bookmarks];
    newBookmarks[index] = updatedBookmark;
    setBookmarks(newBookmarks);
  };

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  const searchHandler = () => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      window.open(url);
    } else if ( url.endsWith(".com") || url.endsWith(".org") || url.endsWith(".net")){
      window.open(`https://${url}`);
    } else {
      window.open(`https://www.google.com/search?q=${url}`)
    }
  }
  return (
    <>
      <h1 className="heading-text">{time}</h1>
      <h2 className="date-text">{date}</h2>
      <div className="bookmarks-row">
        {bookmarks.map((bookmark, index) => (
          <Bookmark
            key={index}
            index={index}
            url={bookmark.url}
            title={bookmark.title}
            onUpdate={updateBookmark}
          />
        ))}
      </div>

      <div className={styles.searchContainer}>
        <input type="text" className={styles.searchBar} id="searchBar" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUrl(e.target.value)}} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") searchHandler();
          }} placeholder="Enter search query or URL"></input>

        <button className={styles.searchButton} onClick={(e) => {searchHandler()}}>
          Search
        </button>
      </div>

      <Image src="/edit.svg" width={50} height={50} alt="Edit" className={styles.editButton} onClick={() => {setShowCustomizeMenu(!showCustomizeMenu)}}/>

      {showCustomizeMenu && <CustomizeMenu />}

    </>

  );
}
