import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Badge } from "../Badge";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials from a name", () => {
    render(<Avatar name="Maya Chen" />);

    expect(screen.getByLabelText("Maya Chen")).toHaveTextContent("MC");
  });

  it("uses explicit initials before generated initials", () => {
    render(<Avatar name="Maya Chen" initials="MJ" />);

    expect(screen.getByText("MJ")).toBeInTheDocument();
  });

  it("renders a fallback while image loading is unresolved", () => {
    render(<Avatar name="Maya Chen" src="https://example.com/avatar.png" />);

    expect(screen.getByText("MC")).toBeInTheDocument();
  });

  it("supports custom fallback content", () => {
    render(<Avatar fallback="Team" />);

    expect(screen.getByText("Team")).toBeInTheDocument();
  });

  it("renders status content", () => {
    render(<Avatar name="Maya Chen" status={<Badge dot intent="success" ariaLabel="Online" />} />);

    expect(screen.getByLabelText("Online")).toBeInTheDocument();
  });

  it("passes image loading status changes through", () => {
    const onLoadingStatusChange = vi.fn();

    render(
      <Avatar
        name="Maya Chen"
        src="https://example.com/avatar.png"
        onLoadingStatusChange={onLoadingStatusChange}
      />,
    );

    expect(onLoadingStatusChange).toHaveBeenCalled();
  });
});
