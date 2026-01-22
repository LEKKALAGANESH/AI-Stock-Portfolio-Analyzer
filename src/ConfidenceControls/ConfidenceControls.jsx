import {
  ControlsBox,
  HelperText,
  Label,
  RangeInput,
} from "./ConfidenceControls.styles";

export default function ConfidenceControls({ threshold, onChange }) {
  return (
    <ControlsBox>
      <Label>
        Minimum signal confidence
        <span>{Math.round(threshold * 100)}%</span>
      </Label>

      <RangeInput
        type="range"
        min="0.4"
        max="0.9"
        step="0.05"
        value={threshold}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Minimum signal confidence threshold"
        aria-valuemin={0.4}
        aria-valuemax={0.9}
        aria-valuenow={threshold}
        aria-valuetext={`${Math.round(threshold * 100)} percent`}
      />

      <HelperText>
        Signals below this confidence will be shown as HOLD.
      </HelperText>
    </ControlsBox>
  );
}
