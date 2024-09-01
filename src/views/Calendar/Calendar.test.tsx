import React from "react";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { afterAll, beforeAll, afterEach, describe, expect, it } from "vitest";
import {
  render,
  screen,
  cleanup,
  waitFor,
  within,
} from "@testing-library/react";

import { Calendar } from "./Calendar";
import program from "../../../public/program.json";

const server = setupServer(
  http.get("/program.json", () => {
    return HttpResponse.json(program);
  }),
);

const getActivityTitles = () => {
  return [
    ...program.week1.map((elem) => elem.title),
    ...program.week2.map((elem) => elem.title),
    ...program.week3.map((elem) => elem.title),
  ];
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Calendar", () => {
  afterEach(cleanup);

  it("renders correctly with arbirary date", async () => {
    render(<Calendar date={new Date(1980, 10, 12)} />);

    // Wait for title heading to be visible (i.e., data has loaded)
    await waitFor(() => {
      expect(screen.getByText(/Weekly Program/i)).toBeDefined();
    });

    // Ensure that day headers render
    expect(screen.getByText(/mon/i)).toBeDefined();

    // Ensure that the right number of days render (30 for November)
    expect(screen.getByRole("heading", { name: /30/i })).toBeDefined();

    // Test content on a coupld random days
    const day3 = screen.getByTestId("day-3");
    expect(within(day3).getByText("The Meru Health Program")).toBeDefined();
    expect(within(day3).getByText("3")).toBeDefined();

    const day12 = screen.getByTestId("day-12");
    expect(within(day12).getByText("Mindful Presence")).toBeDefined();
    expect(within(day12).getByText("12")).toBeDefined();

    // Ensure that all 9 activity titles are present in rendered calendar
    getActivityTitles().map((title) =>
      expect(screen.getByText(title)).toBeDefined(),
    );
  });

  it("pushes today's matching incomplete activity to the future if there are pending incompletes in the queue", async () => {
    render(<Calendar date={new Date(2024, 7, 16)} />);

    // Wait for title heading to be visible (i.e., data has loaded)
    await waitFor(() => {
      expect(screen.getByText(/Weekly Program/i)).toBeDefined();
    });

    // Test content on a coupld random days
    const day16 = screen.getByTestId("day-16");
    expect(within(day16).getByText("Mindful Presence")).toBeDefined();
    expect(within(day16).getByText("16")).toBeDefined();

    const day17 = screen.getByTestId("day-17");
    expect(within(day17).getByText("Consequences of Autopilot")).toBeDefined();
    expect(within(day17).getByText("17")).toBeDefined();

    // Ensure that all 9 activity titles are present in rendered calendar
    getActivityTitles().map((title) =>
      expect(screen.getByText(title)).toBeDefined(),
    );
  });

  it("pushes queued activities to the following week if still incomplete", async () => {
    render(<Calendar date={new Date(2024, 7, 19)} />);

    // Wait for title heading to be visible (i.e., data has loaded)
    await waitFor(() => {
      expect(screen.getByText(/Weekly Program/i)).toBeDefined();
    });

    // Test content on a coupld random days
    const day19 = screen.getByTestId("day-19");
    expect(within(day19).getByText("Mindful Presence")).toBeDefined();
    expect(within(day19).getByText("19")).toBeDefined();

    const day20 = screen.getByTestId("day-20");
    expect(within(day20).getByText("Consequences of Autopilot")).toBeDefined();
    expect(within(day20).getByText("20")).toBeDefined();

    const day21 = screen.getByTestId("day-21");
    expect(within(day21).getByText("The Negativity Spiral")).toBeDefined();
    expect(within(day21).getByText("21")).toBeDefined();

    const day22 = screen.getByTestId("day-22");
    expect(
      within(day22).getByText("Spiral of Negative Interpretations"),
    ).toBeDefined();
    expect(within(day22).getByText("22")).toBeDefined();

    const day23 = screen.getByTestId("day-23");
    expect(
      within(day23).getByText("Interrupting the Negativity Spiral"),
    ).toBeDefined();
    expect(within(day23).getByText("23")).toBeDefined();

    // Ensure that all 9 activity titles are present in rendered calendar
    getActivityTitles().map((title) =>
      expect(screen.getByText(title)).toBeDefined(),
    );
  });

  it("pushes queued activities to the following week if still incomplete", async () => {
    render(<Calendar date={new Date(2024, 7, 23)} />);

    // Wait for title heading to be visible (i.e., data has loaded)
    await waitFor(() => {
      expect(screen.getByText(/Weekly Program/i)).toBeDefined();
    });

    // Test content on a coupld random days
    const day23 = screen.getByTestId("day-23");
    expect(within(day23).getByText("Mindful Presence")).toBeDefined();
    expect(within(day23).getByText("23")).toBeDefined();

    const day24 = screen.getByTestId("day-24");
    expect(within(day24).getByText("Consequences of Autopilot")).toBeDefined();
    expect(within(day24).getByText("24")).toBeDefined();

    const day25 = screen.getByTestId("day-25");
    expect(within(day25).getByText("The Negativity Spiral")).toBeDefined();
    expect(within(day25).getByText("25")).toBeDefined();

    const day26 = screen.getByTestId("day-26");
    expect(
      within(day26).getByText("Spiral of Negative Interpretations"),
    ).toBeDefined();
    expect(within(day26).getByText("26")).toBeDefined();

    const day27 = screen.getByTestId("day-27");
    expect(
      within(day27).getByText("Interrupting the Negativity Spiral"),
    ).toBeDefined();
    expect(within(day27).getByText("27")).toBeDefined();

    // Ensure that all 9 activity titles are present in rendered calendar
    getActivityTitles().map((title) =>
      expect(screen.getByText(title)).toBeDefined(),
    );
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
  });
});
