import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../utils/api";
import Accordion from "../components/Accordion";
import LoadingError from "../components/LoadingError";
import "./CustomerTransactions.css";

const CustomerTransactions = () => {
  const [customers, setCustomers] = useState([]); // State to store customer data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  // Fetch customer data from mock API
  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filterLastThreeMonthsTransactions = (transactions) => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    return transactions.filter(({ date }) => {
      const transactionDate = new Date(date);
      return transactionDate >= threeMonthsAgo;
    });
  };

  // Loading Screen
  if (loading) return <LoadingError isLoading />;

  //Error handling
  if (error) return <LoadingError isError />;

  // If customer data is available, display it
  return (
    <div className="customer-transactions-container">
      <h1>Customer Reward Program</h1>
      {customers.map((customer) => {
        const lastThreeMonthsTransactions = filterLastThreeMonthsTransactions(
          customer.transactions
        );
        return (
          <Accordion key={customer.customerId} customer={customer}>
            <div className="transaction-details">
              {lastThreeMonthsTransactions.length > 0 ? (
                lastThreeMonthsTransactions.map((transaction, index) => (
                  <div key={index} className="transaction-item">
                    <p>
                      Date: {new Date(transaction.date).toLocaleDateString()}
                    </p>
                    <p>Amount: ${transaction.amount.toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p>No transactions in the last 3 months.</p>
              )}
              <button
                onClick={() =>
                  (window.location.href = `/customers/${customer.customerId}`)
                }
              >
                View Details
              </button>
            </div>
          </Accordion>
        );
      })}
    </div>
  );
};

export default CustomerTransactions;
