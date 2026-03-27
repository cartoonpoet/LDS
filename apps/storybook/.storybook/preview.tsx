import React, { useEffect } from "react";
import type { Preview, Decorator } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";

const withLightTheme: Decorator = (Story) => {
  useEffect(() => {
    document.body.classList.add(lightThemeClass);
    return () => {
      document.body.classList.remove(lightThemeClass);
    };
  }, []);

  return <Story />;
};

const preview: Preview = {
  decorators: [withLightTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      codePanel: true,
      source: {
        type: "dynamic"
      }
    }
  }
};

export default preview;
