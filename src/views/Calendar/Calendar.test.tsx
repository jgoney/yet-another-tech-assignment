import React from "react";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { afterAll, beforeAll, afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";

import { Calendar } from "./Calendar";
import program from "../../../public/program.json";

const server = setupServer(
  http.get("/program.json", () => {
    return HttpResponse.json(program);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Calendar", () => {
  afterEach(cleanup);

  it("renders correctly with arbirary date", async () => {
    render(<Calendar date={new Date(1980, 11, 12)} />);

    // Wait for title heading to be visible (i.e., data has loaded)
    await waitFor(() => {
      expect(screen.getByText(/Weekly Program/i)).toBeDefined();
    });

    // Ensure that day headers render
    expect(screen.getByText(/mon/i)).toBeDefined();

    // Ensure that the right number of days render (31 for November)
    expect(screen.getByRole("heading", { name: /31/i })).toBeDefined();
  });

  it("shows loading spinner on first render (before data is loaded)", async () => {
    render(<Calendar date={new Date(1980, 11, 12)} />);

    // Assure that loading screen appears on first render
    screen.queryByText(/Loading.../i);
  });

  it("shows an error message if data fails to load", async () => {
    server.use(
      http.get("/program.json", () => {
        return new HttpResponse(null, { status: 401 });
      }),
    );

    render(<Calendar date={new Date(1980, 11, 12)} />);

    // Wait for title heading to be visible (i.e., data has loaded)
    await waitFor(() => {
      expect(screen.getByText(/Error!/)).toBeDefined();
    });
    screen.debug();
  });
});
