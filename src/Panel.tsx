import React, { useState, useEffect } from "react";
import { AddonPanel, ArgsTable } from "@storybook/components";
import { PanelContent } from "./components/PanelContent";
import { getAllCSSVariables } from "./get-all-css-variables";
import { ADDON_ID, PARAM_KEY } from "./constants";
import { ICssCustomPropertiesParams } from "./params";
import { useParameter } from "@storybook/api";
import { useLocalStorage } from "./use-local-storage";

interface PanelProps {
  active: boolean;
}

const setIframePreviewWhenReady = (setIframePreview: React.Dispatch<React.SetStateAction<HTMLIFrameElement>>) => {
  const iframePreview = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement

  if (!iframePreview) {
    setTimeout(() => setIframePreviewWhenReady(setIframePreview), 2000)
    return
  }

  setIframePreview(iframePreview)
}

export const Panel: React.FC<PanelProps> = (props) => {
  const storage = useLocalStorage();

  const paramData: ICssCustomPropertiesParams = useParameter(PARAM_KEY, {});

  const [cssVars, setCssVars] = useState([]);
  const [iframePreview, setIframePreview] = useState<HTMLIFrameElement>(null);

  setTimeout(() => setIframePreviewWhenReady(setIframePreview), 2000)

  useEffect(() => {
    if (!iframePreview) return
    const variables = getAllCSSVariables(iframePreview.contentWindow.document)
    setCssVars(variables)

    storage.setLocalStorage(ADDON_ID, {
      initialValues: variables
    })
  }, [iframePreview])

  return (
    <AddonPanel {...props}>
      <PanelContent
        baseProperties={cssVars}
        propsConfig={paramData?.props ?? {}}
        matchCategory={paramData?.matchCategory ?? {}}
        hiddenProps={paramData?.hiddenProps ?? []}
      />
    </AddonPanel>
  );
};
