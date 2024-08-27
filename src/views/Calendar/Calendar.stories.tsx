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
    date: new Date(1980, 11, 12),
  },
};
