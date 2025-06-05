import React from "react";

import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { Day, Placeholder } from "./Day";

describe("Day", () => {
  afterEach(cleanup);

  it("should display correct activity name and date", () => {
    render(<Day activityTitle="Seize the Day" isToday date={13} />);
    expect(screen.getByText(/seize the day/i)).toBeDefined();
    expect(screen.getByText(/13/i)).toBeDefined();
  });
});

describe("Placeholder", () => {
  afterEach(cleanup);

  it("should render as an empty placeholder with no props", () => {
    render(<Placeholder />);

    // Ensure that element is empty
    expect(screen.queryByText(/./i)).toBeNull();
  });
});
