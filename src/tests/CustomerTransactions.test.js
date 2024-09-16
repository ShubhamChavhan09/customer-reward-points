import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CustomerTransactions from "../pages/CustomerTransactions";
import { fetchTransactions } from "../utils/api";

// Mock the fetchCustomers function
jest.mock("../utils/api");

describe("CustomerTransactions Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    fetchTransactions.mockResolvedValueOnce([]);
    render(<CustomerTransactions />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("displays error state if data fetching fails", async () => {
    fetchTransactions.mockRejectedValueOnce(new Error("Failed to fetch"));
    render(<CustomerTransactions />);
    await waitFor(() => {
      expect(
        screen.getByText("Error: Unable to load data. Please try again later.")
      ).toBeInTheDocument();
    });
  });

  test("displays customer names and their transactions for the last 3 months", async () => {
    const mockCustomers = [
      {
        customerId: 1,
        name: "John Doe",
        transactions: [
          { date: "2024-08-01", amount: 120 },
          { date: "2024-07-01", amount: 70 },
          { date: "2024-03-01", amount: 30 }, // This one should not be displayed (older than 3 months)
        ],
      },
    ];

    fetchTransactions.mockResolvedValueOnce(mockCustomers);

    render(<CustomerTransactions />);

    // customer name is displayed
    await waitFor(() => {
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    });

    // clicking the accordion to expand it
    const accordionButton = screen.getByText(/john doe/i);
    fireEvent.click(accordionButton);

    // Checking if the transactions are displayed after the click
    expect(screen.getByText("Date: 1/8/2024")).toBeInTheDocument();
    expect(screen.getByText("Amount: $120.00")).toBeInTheDocument();
    expect(screen.getByText("Date: 1/7/2024")).toBeInTheDocument();
    expect(screen.getByText("Amount: $70.00")).toBeInTheDocument();

    // the transaction older than 3 months is not displayed
    expect(screen.queryByText("03/01/2024")).not.toBeInTheDocument();
  });

  test('shows "No transactions" message when no recent transactions', async () => {
    const mockCustomers = [
      {
        customerId: 1,
        name: "Jane Smith",
        transactions: [{ date: "2023-01-01", amount: 100 }],
      },
    ];

    fetchTransactions.mockResolvedValueOnce(mockCustomers);

    render(<CustomerTransactions />);

    await waitFor(() => {
      expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
    });

    // Click the accordion to open it
    const accordionButton = screen.getByText(/jane smith/i);
    fireEvent.click(accordionButton);

    expect(
      screen.getByText(/no transactions in the last 3 months/i)
    ).toBeInTheDocument();
  });
});
