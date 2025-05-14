import { useState } from 'react';
import { DEFAULT_PLAYERS } from '../models/playerModel.ts';
import { dealCards, tableSetupGame } from '../models/tableModel.ts';
import type { DeckOfCardsData } from '../types/card.types';
import type { PlayerData } from '../types/player.types';
import type { TableData } from '../types/table.types';
import Card from './Card.tsx';
import Player from './Player.tsx';

const Table = () => {
   const [tableData, setTableData] = useState<TableData>(tableSetupGame(DEFAULT_PLAYERS));
   const [roundIndex, setRoundIndex] = useState<number>(tableData.roundIndex);
   const [players, setPlayers] = useState<PlayerData[]>(tableData.players);
   const [currentDeck, setCurrentDeck] = useState<DeckOfCardsData>(tableData.deck);
   const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(
      tableData.currentPlayerIndex,
   );
   const [currentPlayer, setCurrentPlayer] = useState<PlayerData>(
      tableData.playerPositions[currentPlayerIndex],
   );

   const startGame = () => {
      dealCards(tableData.deck, tableData.players);

      setCurrentDeck(tableData.deck);
      setPlayers(tableData.players);
      setRoundIndex(tableData.roundIndex + 1);
      setCurrentPlayerIndex(prevPlayerIndex => prevPlayerIndex + 1);
   };

   const changePlayer = (iterator: number): void => {
      const firstPlayerIndex = 0;
      const lastPlayerIndex = players.length - 1;

      if (currentPlayerIndex === lastPlayerIndex && iterator > 0) {
         setCurrentPlayerIndex(firstPlayerIndex);
      } else if (currentPlayerIndex === 0 && iterator < 0) {
         setCurrentPlayerIndex(lastPlayerIndex);
      } else {
         setCurrentPlayerIndex(prevPlayerIndex => prevPlayerIndex + iterator);
      }
   };

   const submitCards = () => {
      // TODO: Submit cards
   };

   return (
      <div id='table'>
         <div className='round-indicator'>Round: {roundIndex}</div>
         <div className='controls'>
            <button onClick={startGame}>Start Game</button>
            <button onClick={() => changePlayer(-1)}>Previous Player</button>
            <button onClick={() => changePlayer(1)}>Next Player</button>
            <button onClick={submitCards}>Submit</button>
         </div>
         <div className='deck'>
            {currentDeck.map(({ name: cardName, suit, value, imageFront, imageBack, isFaceUp }) => (
               <Card
                  key={cardName}
                  name={cardName}
                  suit={suit}
                  value={value}
                  imageFront={imageFront}
                  imageBack={imageBack}
                  isFaceUp={isFaceUp}
               />
            ))}
         </div>
         <div className='players'>
            {players.map((playerData: PlayerData) => (
               <Player
                  key={playerData.name}
                  {...playerData}
                  currentPlayerIndex={currentPlayerIndex}
               />
            ))}
         </div>
      </div>
   );
};

export default Table;
