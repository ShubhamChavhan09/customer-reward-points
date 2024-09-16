import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTransactions } from "../utils/api";
import { calculateMonthlyTotals } from "../utils/rewards";
import LoadingError from "../components/LoadingError";
import "./CustomerTransactionDetails.css";

const CustomerTransactionDetails = () => {
  const { customerId } = useParams(); // Get customer ID from URL
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true); //loading state
  const [error, setError] = useState(false); //error state

  // Fetch customer data based on the ID
  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        const selectedCustomer = data.find(
          (c) => c.customerId === parseInt(customerId)
        );
        if (selectedCustomer) {
          setCustomer(selectedCustomer);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [customerId]);

  if (loading) return <LoadingError isLoading />;
  if (error || !customer) return <LoadingError isError />;

  const lastThreeMonthsTransactions = customer.transactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.date);
      const currentDate = new Date();
      const threeMonthsAgo = new Date(
        currentDate.setMonth(currentDate.getMonth() - 3)
      );
      return transactionDate >= threeMonthsAgo;
    }
  );

  const monthlyTotals = calculateMonthlyTotals(lastThreeMonthsTransactions);

  return (
    <section className="transaction-details-section">
      <h2>{customer.name}'s Last 3 Months Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Amount</th>
            <th>Rewards</th>
          </tr>
        </thead>
        <tbody>
          {monthlyTotals.map(({ month, totalAmount, totalRewards }) => (
            <tr key={month}>
              <td>{month}</td>
              <td>${totalAmount}</td>
              <td>{totalRewards} points</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        Total Rewards:{" "}
        {monthlyTotals.reduce((acc, curr) => acc + curr.totalRewards, 0)} points
      </h3>
    </section>
  );
};

export default CustomerTransactionDetails;
