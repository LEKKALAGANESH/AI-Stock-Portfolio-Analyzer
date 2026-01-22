import { Card, Label, Subtext, Value } from "../styles/MetricCard.styles";

export default function MetricCard({ label, value, subtext, tone }) {
  return (
    <Card $tone={tone} role="group" aria-label={`${label}: ${value}`}>
      <Label>{label}</Label>
      <Value>{value}</Value>
      {subtext && <Subtext>{subtext}</Subtext>}
    </Card>
  );
}
