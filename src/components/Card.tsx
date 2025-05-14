import type { Card as CardData } from '../types/card.types';

export const BACKSIDE_IMAGE = '/src/assets/img/cards/back_light.png';

const Card = (props: CardData) => {
   const { name, imageFront, imageBack, isFaceUp } = props;

   return (
      <button
         title={name}
         className={`card ${isFaceUp ? 'face-up' : 'face-down'}`}
         disabled={!isFaceUp}
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
