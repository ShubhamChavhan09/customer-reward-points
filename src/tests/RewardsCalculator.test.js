import { calculateRewards } from "../utils/rewards";

describe("RewardsCalculator Utility", () => {
  test("calculates 0 points for amounts under $50", () => {
    const points = calculateRewards(40);
    expect(points).toBe(0);
  });

  test("calculates 1 point per dollar between $50 and $100", () => {
    const points = calculateRewards(70);
    expect(points).toBe(20);
  });

  test("calculates 2 points per dollar over $100, plus points for $50-$100 range", () => {
    const points = calculateRewards(120);
    expect(points).toBe(90);
  });

  test("handles fractional amounts correctly", () => {
    const points = calculateRewards(120.75);
    expect(points).toBe(91);
  });
});
