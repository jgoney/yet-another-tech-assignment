import React from "react";

import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { Header, HeaderDay } from "./Header";

describe("Header day component", () => {
  afterEach(cleanup);

  it("should correctly display shortened name MON for MONDAY", () => {
    render(<HeaderDay dayName="MONDAY" />);
    expect(screen.getByText("MON")).toBeDefined();
  });
});

describe("Header", () => {
  afterEach(cleanup);

  it("should correctly render", () => {
    render(<Header />);
  });
});
