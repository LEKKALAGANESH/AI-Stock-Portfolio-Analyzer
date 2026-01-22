import { TooltipBox, TooltipWrapper } from "./Tooltip.styles";

export default function Tooltip({ content, children }) {
  return (
    <TooltipWrapper tabIndex={0}>
      {children}
      <TooltipBox role="tooltip">{content}</TooltipBox>
    </TooltipWrapper>
  );
}
