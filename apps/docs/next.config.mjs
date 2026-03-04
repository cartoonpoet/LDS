import createMDX from "@next/mdx";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withMDX = createMDX({
  extension: /\.mdx?$/
});
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  transpilePackages: ["@lds/tokens", "@lds/ui-v3"]
};

export default withVanillaExtract(withMDX(nextConfig));
