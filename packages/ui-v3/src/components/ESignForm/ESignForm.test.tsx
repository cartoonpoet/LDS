import { fireEvent, render, screen } from "@testing-library/react";
import { ESignForm } from ".";

describe("ESignForm", () => {
  it("enables submit after required fields and agreement are completed", () => {
    render(
      <ESignForm
        fields={[{ id: "name", label: "서명자", required: true }]}
        title="전자서명 요청"
      />
    );

    const submit = screen.getByRole("button", { name: "서명 요청" });
    expect(submit).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/서명자/), { target: { value: "김준호" } });
    fireEvent.click(screen.getByRole("checkbox"));

    expect(submit).toBeEnabled();
  });
});
