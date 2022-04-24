import { Control, Options } from "@storybook/components";

interface ParamProp {
  control: Control,
  options: Options,
  description: string
  category: string
}

export interface ICssCustomPropertiesParams {
  props?: Record<string, ParamProp>
  hiddenProps?: string[]
  matchCategory?: Record<string, RegExp>
}
