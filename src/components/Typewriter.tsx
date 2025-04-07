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

const Typewriter = ({
    text,
    typingSpeed = 50,
    startDelay = 500,
    className = ''
}: TypewriterProps) => {
    // 表示するテキストと現在の位置を管理
    const [displayText, setDisplayText] = useState<string>('');
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 初期化: 新しいテキストが与えられたらリセット
        setDisplayText('');
        setIsComplete(false);

        let currentIndex = 0;
        // テキストが空の場合や未定義の場合の対処
        const textToType = text || '';
        const chars = [...textToType];

        // 一定の遅延後にタイピングを開始
        const startTimeout = setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (currentIndex < chars.length) {
                    // 一文字ずつテキストを増やす（文字列連結で明示的に型を扱う）
                    const newChar = chars[currentIndex] || '';
                    setDisplayText(prev => prev + newChar);
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                    setIsComplete(true);
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
                <span className={styles.text}>
                    {displayText}
                </span>
                {!isComplete && (
                    <span className={styles.cursor}></span>
                )}
            </div>
        </div>
    );
};

export default Typewriter;