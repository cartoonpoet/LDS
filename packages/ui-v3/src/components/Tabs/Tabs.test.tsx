import { fireEvent, render, screen } from "@testing-library/react";
import { Tabs } from ".";

describe("Tabs", () => {
  it("renders the first tab panel by default", () => {
    render(
      <Tabs
        items={[
          { label: "Overview", value: "overview", content: "Overview content" },
          { label: "History", value: "history", content: "History content" }
        ]}
      />
    );

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview content");
  });

  it("changes active tab when clicked", () => {
    render(
      <Tabs
        items={[
          { label: "Overview", value: "overview", content: "Overview content" },
          { label: "History", value: "history", content: "History content" }
        ]}
      />
    );

    fireEvent.click(screen.getByRole("tab", { name: "History" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("History content");
  });
});
