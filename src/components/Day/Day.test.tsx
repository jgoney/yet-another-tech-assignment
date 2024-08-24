import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { Day } from "./Day";

describe("Day test", () => {
  test("should display correct activity name", () => {
    render(<Day activityTitle="Seize the Day" isToday date={13} />);
    expect(screen.getByText(/seize the day/i)).toBeDefined();
    expect(screen.getByText(/13/i)).toBeDefined();
  });
});
