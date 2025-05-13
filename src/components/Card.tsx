import { useState } from 'react';
import type { Card as CardData } from '../types/card.types';

export const BACKSIDE_IMAGE = '/src/assets/img/cards/back_light.png';

const Card = (props: CardData) => {
   const { name, imageFront, imageBack } = props;
   const [isFaceUp, setIsFaceUp] = useState(props.isFaceUp);
   const [isSelected, setIsSelected] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const [isDisabled, setIsDisabled] = useState(false);

   console.log(props);

   return (
      <button className={`card ${isFaceUp ? 'face-up' : 'face-down'}`} title={name}>
         {<img className={'image front'} src={imageFront} alt={name} />}
         {<img className={'image back'} src={imageBack} alt='Backside of a playing card' />}
      </button>
   );
};

export default Card;
