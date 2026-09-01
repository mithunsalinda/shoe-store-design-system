import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from "./Card";

describe("Card", () => {
  it("renders card content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Leather runner</CardTitle>
          <CardDescription>New season product</CardDescription>
        </CardHeader>
        <CardContent>Available in six sizes.</CardContent>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Leather runner" })).toBeInTheDocument();
    expect(screen.getByText("Available in six sizes.")).toBeInTheDocument();
  });

  it("passes through section attributes", () => {
    render(
      <Card data-testid="card" variant="elevated" padding="lg">
        <CardMedia data-testid="media">Image</CardMedia>
      </Card>,
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("media")).toHaveTextContent("Image");
  });

  it("supports footer actions", () => {
    render(
      <Card>
        <CardFooter>
          <Button>View product</Button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByRole("button", { name: "View product" })).toBeInTheDocument();
  });
});
