import { useEffect, useState } from 'react';
import type { PlayerData } from '../types/player.types';
import Card from './Card';

type PlayerProps = PlayerData & { currentPlayerIndex: number };

const Player = (props: PlayerProps) => {
   const { name, role, dealtCards, position, currentPlayerIndex } = props;

   const [isCurrentPlayer, setIsCurrentPlayer] = useState(position === currentPlayerIndex);

   // * Playing with useEffect
   useEffect(() => {
      setIsCurrentPlayer(position === currentPlayerIndex);
   }, [currentPlayerIndex, position]);

   return (
      <div key={name} className={`player-card ${role} ${isCurrentPlayer ? 'current' : ''}`}>
         <div className='player-info'>
            <div className='name'>{name}</div>
            <div className='role'>{role}</div>
         </div>
         <div className='cards'>
            {dealtCards.map(({ name: cardName, suit, value, imageFront, imageBack }) => (
               <Card
                  key={cardName}
                  name={cardName}
                  suit={suit}
                  value={value}
                  imageFront={imageFront}
                  imageBack={imageBack}
                  isFaceUp={isCurrentPlayer}
                  // isFaceUp={position === currentPlayerIndex}
               />
            ))}
         </div>
      </div>
   );
};

export default Player;
