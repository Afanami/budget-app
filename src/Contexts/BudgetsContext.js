import { useContext } from "react";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext = React.createContext();

export function useBudget() {
  return useContext(BudgetsContext);
}

// {
//   id:
//   name:
//   max:
// }

// {
//   id:
//   budgetId:
//   amount:
//   description:
// }

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState(null);
  const [expenses, setExpenses] = useState(null);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }

      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  };

  const deleteBudget = ({ id }) => {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  };

  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}>
      {children}
    </BudgetsContext.Provider>
  );
};
