import React, { useState } from "react";
import { Container, Stack, Button, Card } from "react-bootstrap";
import AddBudgetModal from "./Components/AddBudgetModal";
import AddExpenseModal from "./Components/AddExpenseModal";
import BudgetCard from "./Components/BudgetCard";
import TotalBudgetCard from "./Components/TotalBudgetCard";
import UncategorisedBudgetCard from "./Components/UncategorisedBudgetCard";
import ViewExpensesModal from "./Components/ViewExpensesModal";
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "./Contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState(
    null,
  );
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(null);
  const { budgets, expenses, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        {(!budgets && !expenses) || (!budgets.length && !expenses.length) ? (
          <Card>
            <Card.Header>
              <Card.Title>Getting started?</Card.Title>
            </Card.Header>
            <Card.Body>Try adding a budget or an expense!</Card.Body>
          </Card>
        ) : null}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}>
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => {
                return total + expense.amount;
              },
              0,
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => {
                  openAddExpenseModal(budget.id);
                }}
                onViewExpensesClick={() => {
                  setViewExpensesModalBudgetId(budget.id);
                }}
              />
            );
          })}
          <UncategorisedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() => {
              setViewExpensesModalBudgetId(UNCATEGORISED_BUDGET_ID);
            }}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId(null)}
      />
    </>
  );
}

export default App;
