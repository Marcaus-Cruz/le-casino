import { useContext, useState } from 'react';
import PlayerModel from '../models/playerModel.ts';
import { TableContext } from '../poker/pokerGame.ts';
import { isDebug } from '../poker/utilities.ts';
import type { CardData, DeckOfCardsData } from '../types/card.types';
import type { GamePhase } from '../types/table.types';
import Card from './Card.tsx';
import Player from './Player.tsx';

const Table = () => {
   const TableModel = useContext(TableContext);

   const [gamePhase, setGamePhase] = useState<GamePhase>(TableModel.stage);
   const [roundIndex, setRoundIndex] = useState<number>(TableModel.roundIndex);
   const [players, setPlayers] = useState<PlayerModel[]>(TableModel.players);
   const [currentDeck, setCurrentDeck] = useState<DeckOfCardsData>(TableModel.deck);
   const [currentDiscardPile, setCurrentDiscardPile] = useState<CardData[]>(TableModel.discardPile);
   const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(
      TableModel.currentPlayerIndex,
   );

   const startGame = () => {
      TableModel.dealCards();

      setRoundIndex(TableModel.roundIndex);
      setGamePhase(TableModel.stage);
   };

   const changePlayer = (iterator: number): void => {
      TableModel.updateCurrentPlayerIndex(iterator);
      setCurrentPlayerIndex(TableModel.currentPlayerIndex);
   };

   const submitCards = () => {
      TableModel.doShowdown();
      setGamePhase(TableModel.stage);
   };

   const discardHandler = (cards: CardData[], playerPosition: number): void => {
      console.log('[Table][discardHandler]', { cards });

      TableModel.playerIsDiscarding(cards, playerPosition);
      setCurrentDiscardPile(TableModel.discardPile); // ! Reducer
      setGamePhase(TableModel.stage);
      setCurrentPlayerIndex(TableModel.currentPlayerIndex);
   };

   return (
      <TableContext.Provider value={TableModel}>
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
               <button
                  className='btn'
                  disabled={['ready-for-showdown', 'showdown'].includes(gamePhase)}
                  onClick={() => changePlayer(-1)}
               >
                  Previous Player
               </button>
               <button
                  className='btn'
                  disabled={['ready-for-showdown', 'showdown'].includes(gamePhase)}
                  onClick={() => changePlayer(1)}
               >
                  Next Player
               </button>
               <button
                  className='btn'
                  onClick={submitCards}
                  disabled={gamePhase !== 'ready-for-showdown'}
               >
                  SHOWDOWN
               </button>
            </div>
            <div className='deck-container'>
               <div className='deck'>
                  {currentDeck.map(card => (
                     <Card key={card.name} {...card} />
                  ))}
               </div>
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
      </TableContext.Provider>
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
