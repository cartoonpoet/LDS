# @lawkit/ui

Law.ai Design System -- React component library with built-in design tokens.

## Install

```bash
npm install @lawkit/ui
```

## Quick Start

```tsx
import { Button, lightThemeClass } from "@lawkit/ui";
import "@lawkit/ui/style.css";

function App() {
  return (
    <div className={lightThemeClass}>
      <Button color="primary" size="medium">
        Click me
      </Button>
    </div>
  );
}
```

> `lightThemeClass`를 루트에 적용하면 디자인 토큰(색상, 간격, 타이포 등)이 CSS 변수로 주입됩니다.

## Components (38+)

### Layout & Navigation
`Tabs` `NavigationTab` `ButtonTab` `ChipsNavigation` `Pagination` `Collapse`

### Data Display
`Card` `DataTable` `ListGroup` `TreeView` `Avatar` `AvatarGroup` `Mention` `Widget` `ProgressBar` `StepBar` `Skeleton` `Spinner`

### Form
`Button` `ButtonGroup` `IconButtonGroup` `Input` `InputGroup` `MultiSelect` `Dropdown` `TagSelect` `NumberInput` `Checkbox` `Radio` `RadioGroup` `Switch` `Slider` `RangeSlider` `DatePicker` `DateRangePicker` `FileUploadArea`

### Feedback & Overlay
`Modal` `SweetAlert` `Toast` `Alert` `Tooltip` `Popover` `InfoPopover` `ChartTooltip` `CalendarPopover`

## Theming

### Default Theme

`lightThemeClass`를 적용하면 기본 테마가 활성화됩니다.

### Custom Theme

`createLdsThemeVars()`로 브랜드 컬러를 오버라이드할 수 있습니다:

```tsx
import { createLdsThemeVars } from "@lawkit/ui";

const customTheme = createLdsThemeVars({
  accentPrimary: "#E91E63",
  accentSuccess: "#4CAF50",
  accentDanger: "#F44336",
  accentWarning: "#FF9800",
});

function App() {
  return (
    <div className={lightThemeClass} style={customTheme}>
      {/* 커스텀 테마 적용 */}
    </div>
  );
}
```

## CSS Import

반드시 스타일시트를 import 해야 합니다:

```tsx
import "@lawkit/ui/style.css";
```

## Requirements

- React 18.2+ or React 19
- ES modules (`"type": "module"`)

## License

MIT
