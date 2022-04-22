export interface IItem  {key: string, name: string, value: string, type: string}

const cssKeyToJsKey = (key: string) =>
key.replace('--', '').replace(/-./g, (x) => x.toUpperCase()[1]);

const getAllCSSVariableNames = (styleSheets: StyleSheetList) => {
  const cssVars: string[] = [];

  Array.from(styleSheets).forEach((styleSheet) => {
    return Array.from(styleSheet.cssRules).forEach((rule: CSSStyleRule) => {
      if (!rule || !rule['style']) {
        return;
      }

      Array.from(rule['style']).forEach((style: string) => {
        if (style.startsWith('--') && cssVars.indexOf(style) == -1) {
          cssVars.push(style);
        }
      });
    });
  });

  return cssVars;
};

const getType = (value: string) => {
  if (CSS.supports('color',value) ) {
    return 'color'
  }

  return 'text'
}

const getElementCSSVariables = (
  allCSSVars: Array<string>,
  element: HTMLElement = document.body,
  pseudo: string | undefined = ''
  ) => {
    const elStyles = window.getComputedStyle(element, pseudo);
    const cssVars: IItem[] = [];

    allCSSVars.forEach((key) => {
      const value = elStyles.getPropertyValue(key);

      if (value) {
        cssVars.push({
          key,
          value: value.trim(),
          name: cssKeyToJsKey(key),
          type: getType(value)
        })
      }
    });

    return cssVars;
  };


  export const getAllCSSVariables = (storyDocument: Document): IItem[] => {
    const cssVars = getAllCSSVariableNames(storyDocument.styleSheets);
    return getElementCSSVariables(cssVars, storyDocument.documentElement);
  };
