import { Calendar } from "../Calendar";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Calendar> = {
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const WithToday: Story = {
  args: {
    date: new Date(),
  },
};

export const WithAnArbitraryDate: Story = {
  args: {
    date: new Date(1980, 10, 12),
  },
};

export const NoActivityIncompleteInQueue: Story = {
  args: {
    date: new Date(2024, 7, 15),
  },
};

export const ActivityTodayIncompleteInQueue: Story = {
  args: {
    date: new Date(2024, 7, 16),
  },
};

export const IncompletesPushedIntoNextWeek: Story = {
  args: {
    date: new Date(2024, 7, 19),
  },
};

export const IncompletesPushedIntoLastWeekOfMonth: Story = {
  args: {
    date: new Date(2024, 7, 23),
  },
};
