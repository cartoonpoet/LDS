import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Card, CardHeader, CardBody, CardFooter } from ".";

describe("Card", () => {
  it("renders children content", () => {
    render(<Card>Card body</Card>);
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("renders header via simple API", () => {
    render(<Card header="Header Text">Body</Card>);
    expect(screen.getByText("Header Text")).toBeInTheDocument();
  });

  it("renders title in body", () => {
    render(<Card title="Title">Body</Card>);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("renders footer via simple API", () => {
    render(<Card footer={<button>Save</button>}>Body</Card>);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders headerActions", () => {
    render(
      <Card header="Title" headerActions={<button data-testid="action">Edit</button>}>
        Body
      </Card>,
    );
    expect(screen.getByTestId("action")).toBeInTheDocument();
  });

  it("supports compound pattern", () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
