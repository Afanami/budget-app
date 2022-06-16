import React from "react";
import {
  UNCATEGORISED_BUDGET_ID,
  useBudgets,
} from "../Contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function UncategorisedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();

  const amount = getBudgetExpenses(UNCATEGORISED_BUDGET_ID).reduce(
    (total, expense) => {
      return total + expense.amount;
    },
    0,
  );

  if (amount === 0) return null;

  return (
    <BudgetCard
      backgroundColor="gray"
      name="Uncategoried"
      amount={amount}
      {...props}
    />
  );
}
