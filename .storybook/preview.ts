import { Parameters } from '@storybook/api';
import '../stories/base.css'

export const parameters: Parameters = {
  cssCustomProperties: {
    props: {
      '--font-size': {
        control: {
          type: "inline-radio",
        },
        options: ['16px', '20px'],
        description: 'This property is the only one coming from the `Text` component',
        category: 'Button properties'
      },
    },
    disabled: [
      '--color-white',
    ],
    matchCategory: {
      color: /color/,
      typograph: /font/,
      space: /(space|padding|margin|line-height)/
    }
  }
};
