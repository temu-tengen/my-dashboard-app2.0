import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BookmarkData } from './page';

interface BookmarkProps {
    index: number;
    url: string;
    title: string;
    onUpdate: (index: number, bookmark: BookmarkData) => void;
}

export default function Bookmark({ index, url, title, onUpdate }: BookmarkProps) {
    const [currentUrl, setCurrentUrl] = useState(url);
    const [urlInput, setUrlInput] = useState(url);

    const [currentTitle, setCurrentTitle] = useState(title);
    const [titleInput, setTitleInput] = useState(title);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setCurrentUrl(url);
        setUrlInput(url);
        setCurrentTitle(title);
        setTitleInput(title);
    }, [url, title]);

    function toggleVisibility() {
        setIsVisible(!isVisible);
    }
    return (
        <div className="bookmark-item">
            <Link href={currentUrl} target="_blank" className="bookmark">
                <Image
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=${currentUrl}`}
                    alt={`${currentTitle} favicon`}
                    width={32}
                    height={32}
                />
                <span className="bookmark">{currentTitle}</span>
            </Link>
            {isVisible && (
                <>
                    <input
                        type="text"
                        className="input"
                        value={urlInput}
                        onChange={(event) => setUrlInput(event.target.value)}
                    />
                    <button className="submitBtn" onClick={() => {
                        setCurrentUrl(urlInput);
                        onUpdate(index, { url: urlInput, title: currentTitle });
                    }}>
                        Change Bookmark URL
                    </button>
                    <input
                        type="text"
                        className="input"
                        value={titleInput}
                        onChange={(event) => setTitleInput(event.target.value)}
                    />
                    <button className="submitBtn" onClick={() => {
                        setCurrentTitle(titleInput);
                        onUpdate(index, { url: currentUrl, title: titleInput });
                    }}>
                        Change Bookmark Title
                    </button>
                </>
            )}

            <button className="hideBtn" onClick={toggleVisibility}>Change</button>
        </div>
    );
}

