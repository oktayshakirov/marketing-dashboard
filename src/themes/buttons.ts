import { theme as baseTheme, defineStyle, defineStyleConfig } from "@chakra-ui/react";

const browsing = defineStyle({
    bgColor: baseTheme.colors.transparent,
    border: "2px dashed",
    borderColor: baseTheme.colors.gray[400],
    borderRadius: baseTheme.radii.xl,
});

export const buttons = defineStyleConfig({
    variants: { browsing },
});
