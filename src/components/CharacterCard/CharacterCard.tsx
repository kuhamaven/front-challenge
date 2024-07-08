import React, {useRef, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './CharacterCard.css';
import {ReducedDigimon} from '../../types/Digimon';
import {useWindowSize} from "@uidotdev/usehooks";

type Props = {
    digimon: ReducedDigimon;
    view: string;
}

const CharacterCard = (props: Props) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const navigate = useNavigate()
    const size = useWindowSize();

    const openDetails = () => {
        navigate(`/details/${props.digimon.id}`)
    }

    useEffect(() => {
        if (!cardRef.current) return;

        const handleMouseMove = (event: MouseEvent) => {
            if (!isHovered || !cardRef.current) return;

            const {left, top, width, height} = cardRef.current.getBoundingClientRect();
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

    useEffect(() => {
        if (!cardRef.current || (size.width != null && size.width > 768) ) return;

        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
            const { beta, gamma } = event;
            if (beta === null || gamma === null) return;

            const maxRotate = 20;
            setRotateX((maxRotate * beta) / 90);
            setRotateY((maxRotate * gamma) / 90);
        };

        const detectScrollPosition = () => {
            if (!cardRef.current) return;
            const { top, height } = cardRef.current.getBoundingClientRect();
            const isInView = top + height / 2 > window.innerHeight / 3 && top + height / 2 < (2 * window.innerHeight) / 3;
            setIsHovered(isInView);
        };

        window.addEventListener('deviceorientation', handleDeviceOrientation);
        window.addEventListener('scroll', detectScrollPosition);

        return () => {
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
            window.removeEventListener('scroll', detectScrollPosition);
        };
    }, [size]);

    if (props.view === 'grid') {
        return (
            <div ref={cardRef} className={'card'} style={cardStyle} onClick={openDetails}>
                <div className={'card-name-details-link'}>
                    <div className={'card-name-text'}>{props.digimon.name}</div>
                </div>
                <div className={'card-image'}>
                    <img src={props.digimon.image} alt={props.digimon.name}/>
                </div>
                <div className={'card-name-details-link'}>
                    <Link to={`/details/${props.digimon.id}`} className={'link'}>
                        View Details
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div ref={cardRef} className={'card-list'}>
                <div className={'card-list-image'}>
                    <img src={props.digimon.image} alt={props.digimon.name}/>
                </div>
                <Link to={`/details/${props.digimon.id}`} className={'link'}>
                    {props.digimon.name}
                </Link>
            </div>
        )
    }

};

export default CharacterCard;
