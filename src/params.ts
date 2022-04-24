import { Control, Options } from "@storybook/components";

interface ParamProp {
  control: Control,
  options: Options,
  description: string
  category: string
}

export interface ICssCustomPropertiesParams {
  props?: Record<string, ParamProp>
  hiddenParams?: string[]
  matchCategory?: Record<string, RegExp>
}
