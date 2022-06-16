import React, { useState } from "react";
import { Container, Stack, Button } from "react-bootstrap";
import AddBudgetModal from "./Components/AddBudgetModel/AddBudgetModal";
import AddExpenseModal from "./Components/AddExpenseModal/AddExpenseModal";
import BudgetCard from "./Components/BudgetCard/BudgetCard";
import TotalBudgetCard from "./Components/TotalBudgetCard/TotalBudgetCard";
import UncategorisedBudgetCard from "./Components/UncategorisedBudgetCard/UncategorisedBudgetCard";
import ViewExpensesModal from "./Components/ViewExpensesModal/ViewExpensesModal";
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "./Contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState(
    null,
  );
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

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
        handleClose={() => setShowAddBudgetModal(false)}></AddBudgetModal>
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}></AddExpenseModal>
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() =>
          setViewExpensesModalBudgetId(null)
        }></ViewExpensesModal>
    </>
  );
}

export default App;
