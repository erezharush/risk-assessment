import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { AssessmentForm } from "@/components/assessment-form";
import enMessages from "../../messages/en.json";

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("AssessmentForm", () => {
  it("renders all parameter labels", () => {
    const onChange = vi.fn();
    renderWithIntl(
      <AssessmentForm input={{ hasCompensatingControl: false }} onChange={onChange} />,
    );

    expect(screen.getByText("Assessment Parameters")).toBeInTheDocument();
    expect(screen.getByText("Environment")).toBeInTheDocument();
    expect(screen.getByText("Exposure")).toBeInTheDocument();
    expect(screen.getByText("System Type")).toBeInTheDocument();
    expect(screen.getByText("Classification Level")).toBeInTheDocument();
    expect(screen.getByText("Control Effectiveness")).toBeInTheDocument();
    expect(screen.getByText("Likelihood")).toBeInTheDocument();
    expect(screen.getByText("Security Domain")).toBeInTheDocument();
    expect(screen.getByText("Compensating Control")).toBeInTheDocument();
  });

  it("renders compensating control switch", () => {
    const onChange = vi.fn();
    renderWithIntl(
      <AssessmentForm input={{ hasCompensatingControl: false }} onChange={onChange} />,
    );

    const switches = screen.getAllByRole("switch");
    expect(switches.length).toBeGreaterThanOrEqual(1);
    expect(switches[0]).not.toBeChecked();
  });

  it("renders with pre-selected values", () => {
    const onChange = vi.fn();
    renderWithIntl(
      <AssessmentForm
        input={{
          environment: "OT",
          hasCompensatingControl: true,
        }}
        onChange={onChange}
      />,
    );

    const switches = screen.getAllByRole("switch");
    const checkedSwitch = switches.find((s) => s.getAttribute("aria-checked") === "true");
    expect(checkedSwitch).toBeTruthy();
  });
});
