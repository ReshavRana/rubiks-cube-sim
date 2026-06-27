import type { ViewAxis } from "./viewPresets";

type ViewControl = {
  axis: ViewAxis;
  label: string;
};

const VIEW_CONTROLS: ViewControl[] = [
  { axis: "x", label: "X-Axis" },
  { axis: "y", label: "Y-Axis" },
  { axis: "z", label: "Z-Axis" },
  { axis: "iso", label: "Reset" },
];

type ViewControlsProps = {
  activeView: ViewAxis;
  onChangeView: (axis: ViewAxis) => void;
};

export function ViewControls({ activeView, onChangeView }: ViewControlsProps) {
  return (
    <div className="view-controls" aria-label="Camera view controls">
      {VIEW_CONTROLS.map(({ axis, label }) => (
        <button
          className="view-controls__button"
          data-active={activeView === axis}
          key={axis}
          onClick={() => onChangeView(axis)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
