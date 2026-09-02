import type { Decorator, Preview } from "@storybook/react";
import "@mithunsalinda/veyqor-ui/styles.css";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals["theme"] as string | undefined;
  document.documentElement.dataset["theme"] = theme ?? "light";

  return (
    <div data-ds-root>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Design system theme",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "veyqor", title: "Veyqor" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
    a11y: {
      test: "todo",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "var(--ds-color-surface)" },
        { name: "muted", value: "var(--ds-color-surface-muted)" },
        { name: "dark", value: "#020617" },
      ],
    },
  },
};

export default preview;
