import { Day } from "../Day";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Day> = {
  component: Day,
  args: {
    activityTitle: "The Negativity Spiral",
    date: 12,
  },
  argTypes: {
    date: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Day>;

export const TodayWithActivity: Story = {
  args: {
    isToday: true,
  },
};

export const TodayNoActivity: Story = {
  args: {
    activityTitle: "",
    isToday: true,
  },
};

export const NotTodayWithActivity: Story = {
  args: {},
};

export const NotTodayNoActivity: Story = {
  args: {
    activityTitle: "",
  },
};
