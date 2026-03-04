import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "node:path";

const config: StorybookConfig = {
  stories: ["../../../packages/ui-v3/src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
      resolve: {
        alias: {
          "@lds/ui-v3": resolve(__dirname, "../../../packages/ui-v3/src"),
          "@lds/tokens": resolve(__dirname, "../../../packages/tokens/src")
        }
      }
    });
  }
};

export default config;

