import { ADDON_ID } from "./constants"
import { IItem } from "./get-all-css-variables"
import { ICssCustomPropertiesParams } from "./params"
import { useLocalStorage } from "./use-local-storage"

export const getIframeRoot = () => {
  const iframe = document.querySelector('iframe#storybook-preview-iframe') as HTMLIFrameElement
  const root = iframe.contentWindow.document.querySelector('#root') as HTMLDivElement
  return root
}

export const categoryMatcher = (
  matchCatgories: ICssCustomPropertiesParams['matchCategory'],
  propKey: string
) => {
  const keys = Object.keys(matchCatgories);
  if (!keys.length) {
    return ''
  }

  let category = ''

  keys.forEach(key => {
    const regex = new RegExp(matchCatgories[key])

    if (regex.test(propKey)) {
      category = key
    }
  })

  return category
}

function sortByKey(record: Record<string, any>[], key: string) {
  return record.sort((a, b) => a[key].localeCompare(b[key]))

}

export const tableArgsBuilder = (
  properties: IItem[],
  propsConfig: ICssCustomPropertiesParams['props'],
  hiddenProps: ICssCustomPropertiesParams['hiddenProps'],
  matchCategory: ICssCustomPropertiesParams['matchCategory'],
) => {
  return [...sortByKey(properties, 'key')].reduce((acc, prop) => {
    const config = propsConfig[prop.key]

    if (hiddenProps.includes(prop.key)) return acc

    const storage = useLocalStorage();
    const initialValues = storage.getLocalStorage(ADDON_ID).initialValues

    acc[prop.name] = {
      category: '',
        control: {
          type: prop.type,
          value: prop.value,
          ...(config?.control ?? {})
        },
        options: config?.options ?? undefined,
        description: config?.description ?? undefined,
        key: prop.key,
        name: prop.key,
        table: {
          category: config?.category ?? categoryMatcher(matchCategory, prop.key),
          defaultValue: {
            summary: initialValues.find((o: any) => o.key === prop.key).value
          },
        },
      }

    return acc
  }, {} as Record<string, any>)

}
