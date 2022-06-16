import React from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import {
  UNCATEGORISED_BUDGET_ID,
  useBudgets,
} from "../Contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const {
    getBudgetExpenses,
    budgets,
    deleteBudget,
    deleteExpense,
  } = useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORISED_BUDGET_ID === budgetId
      ? { id: UNCATEGORISED_BUDGET_ID, name: "Uncategorised" }
      : budgets.find((b) => b.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget && budget.name}</div>
            {budgetId !== UNCATEGORISED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={(e) => {
                  deleteBudget(budget);
                  handleClose(e);
                }}>
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => {
            return (
              <Stack key={expense.id} direction="horizontal" gap="2">
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-5">
                  {currencyFormatter.format(expense.amount)}
                </div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => deleteExpense(expense)}>
                  &times;
                </Button>
              </Stack>
            );
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
