import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  it("renders scrollable content", async () => {
    render(
      <ScrollArea aria-label="Product updates" height={120}>
        <p>New arrival: Apex Runner</p>
        <p>Restock: Court Classic</p>
      </ScrollArea>,
    );

    expect(screen.getByText("New arrival: Apex Runner")).toBeInTheDocument();
    expect(screen.getByText("Restock: Court Classic")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("New arrival: Apex Runner")).toBeInTheDocument());
  });

  it("passes root attributes and sizing styles", async () => {
    render(
      <ScrollArea data-testid="scroll-area" height="10rem" maxWidth="20rem" width="100%">
        Content
      </ScrollArea>,
    );

    expect(screen.getByTestId("scroll-area")).toHaveStyle({
      height: "10rem",
      maxWidth: "20rem",
      width: "100%",
    });
    await waitFor(() => expect(screen.getByTestId("scroll-area")).toBeInTheDocument());
  });

  it("can hide custom scrollbars", async () => {
    render(
      <ScrollArea data-testid="scroll-area" scrollbarVisibility="none">
        Content
      </ScrollArea>,
    );

    expect(screen.getByTestId("scroll-area").querySelector("[data-orientation]")).toBeNull();
    await waitFor(() => expect(screen.getByTestId("scroll-area")).toBeInTheDocument());
  });
});
