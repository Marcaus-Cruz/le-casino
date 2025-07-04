import { useContext, useState } from 'react';
import PlayerModel from '../models/playerModel.ts';
import TableModel from '../models/tableModel.ts';
import { TableContext } from '../poker/pokerGame.ts';
import { isDebug } from '../poker/utilities.ts';
import type { CardData, DeckOfCardsData } from '../types/card.types';
import type { GamePhase, GameType } from '../types/table.types';
import Card from './Card.tsx';
import Player from './Player.tsx';
import TableHeader from './TableHeader.tsx';

const Table = ({
   selectedGame,
   onGameLeave,
}: {
   selectedGame: GameType;
   onGameLeave: () => void;
}) => {
   const tableModel = useContext(TableContext);

   // ! Reducer
   const [, setGamePhase] = useState<GamePhase>(tableModel.stage);
   const [, setRoundIndex] = useState<number>(tableModel.roundIndex);
   const [players] = useState<PlayerModel[]>(tableModel.players);
   const [currentDeck] = useState<DeckOfCardsData>(tableModel.deck);
   const [currentDiscardPile, setCurrentDiscardPile] = useState<CardData[]>(tableModel.discardPile);
   const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(
      tableModel.currentPlayerIndex,
   );

   const startGame = () => {
      tableModel.dealCards();

      setRoundIndex(tableModel.roundIndex);
      setGamePhase(tableModel.stage);
   };

   const changePlayer = (iterator: number): void => {
      tableModel.updateCurrentPlayerIndex(iterator);
      setCurrentPlayerIndex(tableModel.currentPlayerIndex);
   };

   const submitCards = () => {
      tableModel.doShowdown();
      setGamePhase(tableModel.stage);
   };

   const nextRound = () => {
      tableModel.nextRound();
      setRoundIndex(tableModel.roundIndex);
      setGamePhase(tableModel.stage);
      setCurrentPlayerIndex(tableModel.currentPlayerIndex);
   };

   const discardHandler = (cards: CardData[], playerPosition: number): void => {
      console.log('[Table][discardHandler]', { cards });

      tableModel.playerIsDiscarding(cards, playerPosition);
      setCurrentDiscardPile(tableModel.discardPile);
      setGamePhase(tableModel.stage);
      setCurrentPlayerIndex(tableModel.currentPlayerIndex);
   };

   return (
      <TableContext.Provider value={tableModel}>
         <div id='table' className={`${isDebug() ? 'debug' : ''}`}>
            <TableHeader selectedGame={selectedGame} onGameLeave={onGameLeave} />

            <GameInfo game={tableModel} />
            <Controls
               startGame={startGame}
               changePlayer={changePlayer}
               submitCards={submitCards}
               nextRound={nextRound}
            />

            <div className='deck-container'>
               <PileOCards cards={currentDeck} className='deck' />
            </div>

            {isDebug() && <PileOCards cards={currentDiscardPile} className='discard-pile' />}

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

type GameInfoProps = {
   game: typeof TableModel;
};
const GameInfo = ({ game }: GameInfoProps) => {
   return (
      <div className='round-indicator'>
         Round: {game.roundIndex} {game.stage}
      </div>
   );
};

type ControlsProps = {
   startGame: () => void;
   changePlayer: (iterator: number) => void;
   submitCards: () => void;
   nextRound: () => void;
};
const Controls = ({ startGame, changePlayer, submitCards, nextRound }: ControlsProps) => {
   const TableModel = useContext(TableContext);

   const isBeginning = TableModel.stage === 'setup';
   const canSwitchPlayers = !['ready-for-showdown', 'showdown'].includes(TableModel.stage);
   const canSubmitCards = TableModel.stage === 'ready-for-showdown';
   const canNextRound = TableModel.stage === 'showdown';

   return (
      <div className='controls'>
         {isBeginning && (
            <button className='btn' onClick={startGame}>
               {`${isBeginning && TableModel.roundIndex === 0 ? 'Start Game' : 'Deal'}`}
            </button>
         )}
         {canSwitchPlayers && (
            <button className='btn' onClick={() => changePlayer(-1)}>
               Previous Player
            </button>
         )}
         {canSwitchPlayers && (
            <button className='btn' onClick={() => changePlayer(1)}>
               Next Player
            </button>
         )}
         {canSubmitCards && (
            <button
               className='btn'
               onClick={submitCards}
               disabled={TableModel.stage !== 'ready-for-showdown'}
            >
               SHOWDOWN
            </button>
         )}
         {canNextRound && (
            <button className='btn' onClick={nextRound} disabled={TableModel.stage !== 'showdown'}>
               Next Round
            </button>
         )}
      </div>
   );
};

type PileOCardsProps = {
   cards: CardData[];
   className?: string;
};
const PileOCards = ({ cards, className }: PileOCardsProps) => {
   return (
      <div className={className}>
         {cards.map((card: CardData) => (
            <Card key={card.name} {...card} />
         ))}
      </div>
   );
};

export default Table;
