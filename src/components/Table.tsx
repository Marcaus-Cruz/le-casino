import { useEffect, useState } from 'react';
import {
   DEFAULT_PLAYERS,
   addToHand as playerAddToHand,
   removeFromHand as playerRemoveFromHand,
} from '../models/playerModel.ts';
import { dealCards, drawCard, tableSetupGame } from '../models/tableModel.ts';
import { isDebug } from '../poker/utilities.ts';
import type { CardData, DeckOfCardsData } from '../types/card.types';
import type { PlayerData } from '../types/player.types';
import type { TableData } from '../types/table.types';
import Card from './Card.tsx';
import Player from './Player.tsx';
import type { GamePhase } from '../types/table.types';

const Table = () => {
   const [tableData, setTableData] = useState<TableData>(tableSetupGame(DEFAULT_PLAYERS));
   const [gamePhase, setGamePhase] = useState<GamePhase>(tableData.stage);
   const [roundIndex, setRoundIndex] = useState<number>(tableData.roundIndex);
   const [players, setPlayers] = useState<PlayerData[]>(tableData.players);
   const [currentDeck, setCurrentDeck] = useState<DeckOfCardsData>(tableData.deck);
   const [currentDiscardPile, setCurrentDiscardPile] = useState<CardData[]>(tableData.discardPile);
   const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(
      tableData.currentPlayerIndex,
   );
   const [currentPlayer, setCurrentPlayer] = useState<PlayerData>(
      tableData.playerPositions[currentPlayerIndex],
   );

   const [hasPlayerDiscarded, setHasPlayerDiscarded] = useState<Record<number, boolean>>(
      players.reduce(
         (obj, { position }) => {
            obj[position] = false;
            return obj;
         },
         {} as Record<number, boolean>,
      ),
   );

   useEffect(() => {
      if (Object.values(hasPlayerDiscarded).every(value => value)) {
         setGamePhase('ready-for-showdown');
      }
   }, [hasPlayerDiscarded]);

   const startGame = () => {
      dealCards(tableData.deck, tableData.players);

      setCurrentDeck(tableData.deck);
      setPlayers(tableData.players);
      setRoundIndex(tableData.roundIndex + 1);

      // setGamePhase('betting');
      setGamePhase('discarding');

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
      setGamePhase('showdown');
   };

   const discardHandler = (cards: CardData[], playerPosition: number): void => {
      console.log('[Table][discardHandler]', { cards });

      const player = tableData.playerPositions[playerPosition];
      const numCardsToGiveBack = cards.length;

      setCurrentDiscardPile(prevDiscardPile => [...prevDiscardPile, ...cards]);
      cards.forEach(card => playerRemoveFromHand(player, card));

      for (let i = 0; i < numCardsToGiveBack; i += 1) {
         playerAddToHand(player, drawCard(tableData.deck));
      }

      setHasPlayerDiscarded(prevHasPlayerDiscarded => ({
         ...prevHasPlayerDiscarded,
         [playerPosition]: true,
      }));

      changePlayer(1);
   };

   return (
      <div id='table' className={`${isDebug() ? 'debug' : ''}`}>
         <div className='round-indicator'>
            Round: {roundIndex} {gamePhase}
         </div>
         <div className='controls'>
            {/* TODO: create a Button component */}
            {roundIndex === 0 && (
               <button className='btn' onClick={startGame}>
                  Start Game
               </button>
            )}
            <button className='btn' onClick={() => changePlayer(-1)}>
               Previous Player
            </button>
            <button className='btn' onClick={() => changePlayer(1)}>
               Next Player
            </button>
            <button
               className='btn'
               onClick={submitCards}
               disabled={gamePhase !== 'ready-for-showdown'}
            >
               Submit
            </button>
         </div>
         <div className='deck'>
            {currentDeck.map(card => (
               <Card key={card.name} {...card} />
            ))}
         </div>
         {isDebug() && (
            <div className='discard-pile'>
               Discard Pile
               {currentDiscardPile.map((card: CardData) => (
                  <Card key={card.name} {...card} />
               ))}
            </div>
         )}
         <div className='players'>
            {players.map((playerData: PlayerData) => (
               <Player
                  key={playerData.name}
                  {...playerData}
                  currentPlayerIndex={currentPlayerIndex}
                  onDiscard={discardHandler}
               />
            ))}
         </div>
      </div>
   );
};

export default Table;

// const betHandler = () => {};
// const callHandler = () => {};
// const raiseHandler = () => {};
// const foldHandler = () => {};
// const checkHandler = () => {};
// const allInHandler = () => {};

// onBet={betHandler}
// onCall={callHandler}
// onRaise={raiseHandler}
// onFold={foldHandler}
// onCheck={checkHandler}
// onAllIn={allInHandler}
