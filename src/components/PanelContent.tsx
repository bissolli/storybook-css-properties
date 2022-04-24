import React, { useEffect, useState } from "react";
import { ArgsTable } from "@storybook/components";
import { IItem } from "../get-all-css-variables";
import { useDebounce } from "../use-debounce";
import { ICssCustomPropertiesParams } from "../params"
import { getIframeRoot, tableArgsBuilder } from "../utils";

interface PanelContentProps {
  baseProperties: IItem[],
  propsConfig: ICssCustomPropertiesParams['props']
  matchCategory: ICssCustomPropertiesParams['matchCategory']
  hiddenProps: ICssCustomPropertiesParams['hiddenProps']
}

export const PanelContent: React.FC<PanelContentProps> = ({
  baseProperties,
  propsConfig,
  matchCategory,
  hiddenProps
}) => {
  const properties = [...baseProperties]
  const [key, setKey] = useState<string>('')
  const [value, setValue] = useState<string>('')


  const debouncedValue = useDebounce<string>(value, 100)

  const changeHanlder = (value: string, key: string) => {
    properties.map(obj => {
      if (obj.key === key) {
        obj.value = value
      }

      return obj;
    })

    setValue(value)
    setKey(key)
  }

  useEffect(() => {
    if (value === '') return

    const root = getIframeRoot()
    root.style.setProperty(key, value)

    changeHanlder('', '')
  }, [debouncedValue])

  let tableArgs = tableArgsBuilder(baseProperties, propsConfig, hiddenProps, matchCategory)

  const resetArgs = () => {
    window.location.reload()
  }

  return (
    <ArgsTable
      inAddonPanel
      resetArgs={() => resetArgs()}
      rows={tableArgs}
      updateArgs={(a) => {
        Object.keys(a).forEach(key => changeHanlder(a[key], key))
      }}
    />
  )
};
