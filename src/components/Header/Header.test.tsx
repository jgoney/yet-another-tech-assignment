import React from "react";

import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { Header } from "./Header";

describe("Header", () => {
  afterEach(cleanup);

  it("should correctly display shortened name MON for MONDAY", () => {
    render(<Header dayName="MONDAY" />);
    expect(screen.getByText("MON")).toBeDefined();
  });
});
