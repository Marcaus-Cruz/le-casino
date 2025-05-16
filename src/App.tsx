import Table from './components/Table';
import TableModel from './models/tableModel';
import { createContext, useState } from 'react';

function App() {
   const TableContext = createContext({});
   const [tableData] = useState(TableModel);

   return <Table />;
}

export default App;
