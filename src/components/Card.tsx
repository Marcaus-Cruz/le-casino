import { useState } from 'react';
import type { Card as CardData } from '../types/card.types';

export const BACKSIDE_IMAGE = '/src/assets/img/cards/back_light.png';

const Card = (props: CardData) => {
   const { name, imageFront, imageBack } = props;
   const [isFaceUp, setIsFaceUp] = useState(props.isFaceUp);
   const [isSelected, setIsSelected] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const [isDisabled, setIsDisabled] = useState(false);

   const [cardClassName, setCardClassName] = useState(`card ${isFaceUp ? 'face-up' : 'face-down'}`);
   const [imageClassName, setImageClassName] = useState(`image ${isFaceUp ? 'front' : 'back'}`);
   const [imageUrl, setImageUrl] = useState(isFaceUp ? imageFront : imageBack);
   const [altText, setAltText] = useState(isFaceUp ? name : 'Backside of a playing card');

   return (
      <button title={name} className={cardClassName} disabled={!isFaceUp}>
         {<img className={imageClassName} src={imageUrl} alt={altText} />}
      </button>
   );
};

export default Card;
