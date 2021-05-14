import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface TransactionsProps {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionsInput = Omit<TransactionsProps, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: TransactionsProps[];
  createTransaction: (transactions: TransactionsInput) => Promise<void>;
  deleteTransaction: (transactionId: number) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider(props: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  useEffect(() => {
    api.get('transactions').then((response) => {
      // console.log("data ",response.data); 
      // if (Object.keys(response.data).length !== 0) 
      setTransactions(response.data);
      // else
      //   setTransactions([{
      //     id: 1,
      //     title: 'Faça sua primeira transação',
      //     amount: 0,
      //     type: 'deposit',
      //     category: 'primeira transação',
      //     createdAt: String(new Date()),
      //   }]);
    });  
  }, []);

  async function createTransaction(transactionInput: TransactionsInput) {
    const response = await api.post('transactions', {
      ...transactionInput,
      id: Math.floor((new Date().getTime() / 1000) * Math.random()),
      createdAt: String(new Date()),
    });
    setTransactions([...transactions, response.data]);
  }

  async function deleteTransaction(transactionId: number){
    await api.delete(`transactions/${transactionId}`)
    const transactionList = transactions.filter((elem) => {
      if(elem.id !== transactionId) return elem
    })
    setTransactions([...transactionList])
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransaction
      }}
    >
      {props.children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
