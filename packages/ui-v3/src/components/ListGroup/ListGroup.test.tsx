import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { ListGroup, ListGroupItem } from ".";

describe("ListGroup", () => {
  it("renders with role list", () => {
    renderWithUser(
      <ListGroup>
        <ListGroupItem>Item A</ListGroupItem>
      </ListGroup>,
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("renders simple string items", () => {
    renderWithUser(<ListGroup items={["Alpha", "Beta", "Gamma"]} />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Gamma")).toBeInTheDocument();
  });
});

describe("ListGroupItem", () => {
  it("renders children", () => {
    renderWithUser(
      <ListGroup>
        <ListGroupItem>Item content</ListGroupItem>
      </ListGroup>,
    );
    expect(screen.getByText("Item content")).toBeInTheDocument();
  });

  it("calls onClick on click", async () => {
    const onClick = vi.fn();
    const { user } = renderWithUser(
      <ListGroup>
        <ListGroupItem onClick={onClick}>Clickable</ListGroupItem>
      </ListGroup>,
    );
    await user.click(screen.getByText("Clickable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders leading and trailing slots", () => {
    renderWithUser(
      <ListGroup>
        <ListGroupItem leading={<span>LEAD</span>} trailing={<span>TRAIL</span>}>
          Content
        </ListGroupItem>
      </ListGroup>,
    );
    expect(screen.getByText("LEAD")).toBeInTheDocument();
    expect(screen.getByText("TRAIL")).toBeInTheDocument();
  });
});
