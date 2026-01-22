import Tooltip from "../Tooltip/Tooltip";
import { Badge, Confidence } from "../styles/SignalBadge.styles";

export default function SignalBadge({
  signal,
  confidence,
  explanation,
  muted = false,
}) {
  return (
    <Tooltip content={explanation}>
      <Badge
        $signal={signal}
        $muted={muted}
        role="status"
        aria-label={`Signal ${signal}, confidence ${Math.round(
          confidence * 100,
        )} percent`}
      >
        {signal}
        <Confidence>({Math.round(confidence * 100)}%)</Confidence>
      </Badge>
    </Tooltip>
  );
}
