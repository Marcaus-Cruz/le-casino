import { useContext, useState, type MouseEvent } from 'react';
import { TableContext } from '../poker/pokerGame.ts';
import type { CardData } from '../types/card.types';

export const BACKSIDE_IMAGE = '/src/assets/img/cards/back_light.png';

type CardProps = CardData & {
   onCardSelected?: (selectedCard: string) => void;
};

const Card = (props: CardProps) => {
   const TableModel = useContext(TableContext);

   const { name, imageFront, imageBack, isFaceUp } = props;
   const { onCardSelected: doCardSelected } = props;

   const [isSelected, setIsSelected] = useState(false);

   const select = (event: MouseEvent<HTMLButtonElement>) => {
      console.log(`[Card][select]`, { event, props, isSelected });
      setIsSelected(prev => !prev);

      doCardSelected?.(name);
   };

   return (
      <button
         title={name}
         className={`card ${isFaceUp ? 'face-up' : 'face-down'} ${isSelected ? 'selected' : ''}`}
         disabled={!isFaceUp || TableModel.stage === 'showdown'}
         onClick={select}
      >
         {
            <img
               className={`image ${isFaceUp ? 'front' : 'back'}`}
               src={isFaceUp ? imageFront : imageBack}
               alt={isFaceUp ? name : 'Backside of a playing card'}
            />
         }
      </button>
   );
};

export default Card;
