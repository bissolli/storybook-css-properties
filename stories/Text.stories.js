import React from "react";
import { Text } from "./Text";

export default {
  title: "Example/Text",
  component: Text,
};

const Template = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Text",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Text",
};
