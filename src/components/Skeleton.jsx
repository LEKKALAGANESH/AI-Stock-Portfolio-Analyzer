import { SkeletonBlock } from "../styles/Skeleton.styles";

export default function Skeleton({ height, width }) {
  return <SkeletonBlock $height={height} $width={width} />;
}
