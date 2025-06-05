import { HeaderDay } from "../Header";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HeaderDay> = {
  component: HeaderDay,
};

export default meta;
type Story = StoryObj<typeof HeaderDay>;

export const DayHeader: Story = {
  args: {
    dayName: "SATURDAY",
  },
};

export const DayHeaderTop: Story = {
  args: {
    dayName: "SATURDAY",
    isTop: true,
  },
};
