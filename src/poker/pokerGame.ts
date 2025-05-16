import { DEFAULT_PLAYERS } from '../types/player.types';
import TableModel from '../models/tableModel';
import { createContext } from 'react';

export const TableContext = createContext(TableModel.setupGame(DEFAULT_PLAYERS));
