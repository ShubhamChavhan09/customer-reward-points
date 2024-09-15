import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerTransactions from "./pages/CustomerTransactions";
import CustomerTransactionDetails from "./pages/CustomerTransactionDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerTransactions />} />
        <Route
          path="/customers/:customerId"
          element={<CustomerTransactionDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
