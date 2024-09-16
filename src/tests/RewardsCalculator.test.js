import { calculateRewards } from "../utils/rewards";

describe("RewardsCalculator Utility", () => {
  test("calculates 0 points for amounts under $50", () => {
    const points = calculateRewards(40);
    expect(points).toBe(0);
  });

  test("calculates 1 point per dollar between $50 and $100", () => {
    const points = calculateRewards(70);
    expect(points).toBe(20); // $70 -> 20 points ($50-$100 = 20 points)
  });

  test("calculates 2 points per dollar over $100, plus points for $50-$100 range", () => {
    const points = calculateRewards(120);
    expect(points).toBe(90); // $120 -> 50 points ($50-$100) + 40 points ($20 over $100)
  });

  test("handles fractional amounts correctly", () => {
    const points = calculateRewards(120.75);
    expect(points).toBe(91); // $120.75 -> 50 points ($50-$100) + 41 points ($20.75 over $100)
  });
});
