import transactions from "../mockData/transactions";

// Simulate fetching customer data
export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000);
  });
};
