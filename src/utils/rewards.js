export const calculateRewards = (amount) => {
  let rewards = 0;

  if (amount > 100) {
    rewards += (amount - 100) * 2;

    rewards += 50;
  } else if (amount > 50) {
    rewards += amount - 50;
  }

  return Math.floor(rewards);
};

export const calculateMonthlyTotals = (transactions) => {
  const rewardsByMonth = transactions.reduce((acc, { date, amount }) => {
    const month = new Date(date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    if (!acc[month]) {
      acc[month] = { totalAmount: 0, totalRewards: 0 };
    }
    acc[month].totalAmount += amount;
    acc[month].totalRewards += calculateRewards(amount);
    return acc;
  }, {});

  return Object.entries(rewardsByMonth).map(([month, data]) => ({
    month,
    totalAmount: data.totalAmount.toFixed(2),
    totalRewards: data.totalRewards,
  }));
};
