'use client';
import { useEffect, useState } from 'react';

export default function Background() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
        }));
        setParticles(newParticles);
    }, []);

    return (
        <>
            <div className="gradient-bg"></div>
            <div id="particles">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            left: p.left,
                            animationDelay: p.animationDelay,
                            animationDuration: p.animationDuration
                        }}
                    />
                ))}
            </div>
        </>
    );
}
