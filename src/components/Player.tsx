import { useEffect, useState } from 'react';
import type { PlayerData } from '../types/player.types';
import Card from './Card';
import type { CardData } from '../types/card.types';

type PlayerProps = PlayerData & {
   currentPlayerIndex: number;
   onDiscard: (cards: CardData[], position: number) => void;
};

const Player = (props: PlayerProps) => {
   const { name, role, dealtCards, position, currentPlayerIndex } = props;
   const { onDiscard: doDiscard } = props;

   const [isCurrentPlayer, setIsCurrentPlayer] = useState(position === currentPlayerIndex);
   const [selectedCards, setSelectedCards] = useState<CardData[]>([]);

   // * Playing with useEffect
   useEffect(() => {
      setIsCurrentPlayer(position === currentPlayerIndex);
   }, [currentPlayerIndex, position]);

   const discard = () => {
      doDiscard(selectedCards, position);
   };

   const cardSelectedHandler = (selectedCardName: string) => {
      console.log('[Player][cardSelectedHandler]', selectedCardName);

      const isDeselect = selectedCards.find(({ name }) => name === selectedCardName);

      if (isDeselect) {
         setSelectedCards(prevSelectedCards =>
            prevSelectedCards.filter(({ name }) => name !== selectedCardName),
         );
      } else {
         setSelectedCards(prevSelectedCards => [
            ...prevSelectedCards,
            dealtCards.find(({ name }) => name === selectedCardName) as CardData,
         ]);
      }
   };

   return (
      <div key={name} className={`player-card ${role} ${isCurrentPlayer ? 'current' : ''}`}>
         <div className='player-info'>
            <div className='name'>{name}</div>
            <div className='role'>{role}</div>
         </div>
         <div className='selected-cards debug'>
            {selectedCards.map(({ name }) => (
               <div key={name} className='selected-card-name'>
                  {name}
               </div>
            ))}
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
                  onCardSelected={cardSelectedHandler}
               />
            ))}
         </div>
         <button onClick={discard}>Discard</button>
      </div>
   );
};

export default Player;

// type PlayerProps = PlayerData & {
//    currentPlayerIndex: number;
//    onBet: () => number;
//    onCall: () => number;
//    onRaise: () => number;
//    onFold: () => number;
//    onCheck: () => number;
//    onAllIn: () => number;
//    onDiscard: () => CardData[];
// };

// onBet: doBet,
// onCall: doCall,
// onRaise: doRaise,
// onFold: doFold,
// onCheck: doCheck,
// onAllIn: doAllIn,

// const bet = () => {
//    doBet();
// };
// const call = () => {
//    doCall();
// };
// const raise = () => {
//    doRaise();
// };
// const fold = () => {
//    doFold();
// };
// const check = () => {
//    doCheck();
// };
// const allIn = () => {
//    doAllIn();
// };
