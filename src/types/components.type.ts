import { Dispatch, ReactNode, SetStateAction } from "react";
import { Metric, Segment, SnapshotData, SnapshotValue } from "./index";

// ---------- File: App.tsx

export type KpiData = {
  _id: string;
  type: "view" | "edit";
  data: SnapshotData;
};

// ---------- File: AreaChart.tsx

export interface ChildrenProp {
  children: ReactNode;
}

export interface AreaChartProps {
  className?: string;
  values: SnapshotValue[];
}

// ---------- File: EditForm.tsx

export interface EditFormProps extends ChildrenProp {}

// ---------- File: EditFormButton.tsx

export interface EditFormButtonProps {
  type: "add" | "cancel";
}

// ---------- File: EditFormDropdown.tsx

export interface EditFormDropdownProps {
  notClickable?: boolean;
  children?: ReactNode;
  title: string;
}

// ---------- File: EditFormDropdownOptionGroup.tsx

export interface EditFormDropdownOptionProps extends ChildrenProp {
  isLast?: boolean;
}

// ---------- File: EditFormDropdownOptionGroup.tsx

export interface EditFormDropdownOptionGroupProps extends ChildrenProp {
  title: string;
}

// ---------- File: MetricTilesContainer.tsx

export interface MetricTilesContainerProps extends ChildrenProp {}

// ---------- File: PlusIcon.tsx

export interface PlusIconProps {
  direction: "left" | "right";
  parentHasRightBorder?: boolean;
  parentHasLeftBorder?: boolean;
  onClick?: () => void;
}

// ---------- File: MetricTiles.tsx

export interface MetricTilesProps {
  children: ReactNode;
  value: {
    metrics: Metric[];
    segments: Segment[];
    setKpis: Dispatch<SetStateAction<KpiData[]>>;
  };
}

// ---------- File: MetricTilesTile.tsx

export type InfoIn = "daily" | "weekly" | "monthly";

export interface MetricTilesTileProps {
  kpi: KpiData;
}

// ---------- File: ViewData.tsx

export interface ViewDataProps {
  metric: string;
  metricId?: string;
  segmentValue: string;
  infoOfLast: number;
  snapshotValues: SnapshotValue[];
  parentHasLeftBorder: boolean;
  parentHasRightBorder: boolean;
  kpiId: string;
}

// ---------- File: EditData.tsx

export interface EditDataProps {
  activeMetricId?: string;
  activeSegmentId?: string;
}
