// components/Typewriter.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Typewriter.module.css';

interface TypewriterProps {
    text: string;
    typingSpeed?: number;
    startDelay?: number;
    className?: string;
}

interface CharacterItem {
    char: string;
    typed: boolean;
}

const Typewriter = ({
    text,
    typingSpeed = 50,
    startDelay = 500,
    className = ''
}: TypewriterProps) => {
    const [displayedChars, setDisplayedChars] = useState<CharacterItem[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // テキストを文字配列に変換
        const chars = [...text];
        let currentIndex = 0;

        // 一定の遅延後にタイピングを開始
        const startTimeout = setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (currentIndex < chars.length) {
                    setDisplayedChars(prev => [...prev, { char: chars[currentIndex], typed: true }]);
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, typingSpeed);

            // コンポーネントのアンマウント時にインターバルをクリア
            return () => clearInterval(typingInterval);
        }, startDelay);

        // コンポーネントのアンマウント時にタイムアウトをクリア
        return () => clearTimeout(startTimeout);
    }, [text, typingSpeed, startDelay]);

    return (
        <div className={`${styles.typewriterContainer} ${className}`} ref={containerRef}>
            <div className={styles.typewriter}>
                {displayedChars.map((item, index) => (
                    <span
                        key={index}
                        className={`${styles.char} ${item.typed ? styles.typed : ''}`}
                    >
                        {item.char}
                    </span>
                ))}
                <span className={styles.cursor}></span>
            </div>
        </div>
    );
};

export default Typewriter;