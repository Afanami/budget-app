import React from "react";
import { useBudgets } from "../../Contexts/BudgetsContext";
import BudgetCard from "../BudgetCard/BudgetCard";

export default function TotalBudgetCard(props) {
  const { expenses, budgets } = useBudgets();

  const amount = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  const max = budgets.reduce((total, budget) => {
    return total + budget.max;
  }, 0);

  if (max === 0) return null;

  return (
    <BudgetCard
      backgroundColor="gray"
      name="Total"
      amount={amount}
      max={max}
      hideButtons
    />
  );
}
