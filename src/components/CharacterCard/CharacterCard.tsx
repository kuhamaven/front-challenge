import React from 'react';
import { Link } from 'react-router-dom';
import './CharacterCard.module.css';
import { ReducedDigimon } from '../../types/Digimon';

type Props = {
    digimon: ReducedDigimon;
}

const CharacterCard = (props: Props) => {
    return (
        <div className={'card'}>
            <h2>{props.digimon.name}</h2>
            <img src={props.digimon.image} alt={props.digimon.name} />
            <Link to={`/details/${props.digimon.id}`} className={'link'}>
                View Details
            </Link>
        </div>
    );
};

export default CharacterCard;
