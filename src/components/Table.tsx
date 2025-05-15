import { useEffect, useState } from 'react';
import PlayerModel, { DEFAULT_PLAYERS } from '../models/playerModel.ts';
import TableModel from '../models/tableModel.ts';
import { isDebug } from '../poker/utilities.ts';
import type { CardData, DeckOfCardsData } from '../types/card.types';
import type { GamePhase } from '../types/table.types';
import Card from './Card.tsx';
import Player from './Player.tsx';

const Table = () => {
   const [gamePhase, setGamePhase] = useState<GamePhase>(TableModel.stage);
   const [roundIndex, setRoundIndex] = useState<number>(TableModel.roundIndex);
   const [players, setPlayers] = useState<PlayerModel[]>(TableModel.players);
   const [currentDeck, setCurrentDeck] = useState<DeckOfCardsData>(TableModel.deck);
   const [currentDiscardPile, setCurrentDiscardPile] = useState<CardData[]>(TableModel.discardPile);
   const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(
      TableModel.currentPlayerIndex,
   );

   // run it only once, after the first render:
   useEffect(() => {
      TableModel.setupGame(DEFAULT_PLAYERS);
      // if you really need to log it:
      console.log(TableModel);
   }, []);

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

   // TODO: Make Model have the source truth
   const startGame = () => {
      TableModel.dealCards();

      setCurrentDeck(TableModel.deck);
      setPlayers(TableModel.players);
      setRoundIndex(TableModel.roundIndex);

      // setGamePhase('betting');
      setGamePhase('discarding');

      setCurrentPlayerIndex(TableModel.currentPlayerIndex);
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

      const player = TableModel.playerPositions[playerPosition];
      const numCardsToGiveBack = cards.length;

      setCurrentDiscardPile(TableModel.addToDiscardPile(cards));
      cards.forEach(card => player.removeFromHand(card));

      for (let i = 0; i < numCardsToGiveBack; i += 1) {
         player.addToHand(TableModel.drawCard());
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
            {roundIndex <= 0 && (
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
            {players.map((playerData: PlayerModel) => (
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
