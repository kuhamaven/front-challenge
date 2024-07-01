import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CharacterCard.css';
import { ReducedDigimon } from '../../types/Digimon';

type Props = {
    digimon: ReducedDigimon;
}

const CharacterCard = (props: Props) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    useEffect(() => {
        if (!cardRef.current) return;

        const handleMouseMove = (event: MouseEvent) => {
            if (!isHovered || !cardRef.current) return;

            const { left, top, width, height } = cardRef.current.getBoundingClientRect();
            const x = (event.clientX - left) / width;
            const y = (event.clientY - top) / height;

            const maxRotate = 20;

            setRotateY(maxRotate * (2 * x - 1));
            setRotateX(-maxRotate * (2 * y - 1));
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            setRotateX(0);
            setRotateY(0);
        };

        cardRef.current.addEventListener('mousemove', handleMouseMove);
        cardRef.current.addEventListener('mouseenter', handleMouseEnter);
        cardRef.current.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cardRef.current?.removeEventListener('mousemove', handleMouseMove);
            cardRef.current?.removeEventListener('mouseenter', handleMouseEnter);
            cardRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isHovered]);

    const cardStyle: React.CSSProperties = {
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    };

    return (
        <div ref={cardRef} className={'card'} style={cardStyle}>
            <h2>{props.digimon.name}</h2>
            <img src={props.digimon.image} alt={props.digimon.name} />
            <Link to={`/details/${props.digimon.id}`} className={'link'}>
                View Details
            </Link>
        </div>
    );
};

export default CharacterCard;
