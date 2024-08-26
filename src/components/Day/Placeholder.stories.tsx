import { Placeholder } from "../Day";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Placeholder> = {
  component: Placeholder,
};

export default meta;
type Story = StoryObj<typeof Placeholder>;

export const DayPlaceholder: Story = {};
