import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransictionTDO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { outcome, income } = this.transactions.reduce(
      (accumalator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumalator.income += transaction.value;
            break;
          case 'outcome':
            accumalator.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accumalator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    const balance = { outcome, income, total };
    return balance;
  }

  public create({ title, value, type }: TransictionTDO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
