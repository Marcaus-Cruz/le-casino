import { DEFAULT_PLAYERS } from '../models/playerModel';
import TableModel from '../models/tableModel';
import { createContext } from 'react';

export const TableContext = createContext(TableModel.setupGame(DEFAULT_PLAYERS));
