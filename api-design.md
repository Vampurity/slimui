# API 设计规范

> 本规范直接决定每个组件如何编写。所有组件必须遵循统一的 API 设计原则，保持简洁、语义清晰、可预测。

## 1. 设计原则

### 1.1 简洁优先

- 每个组件只暴露最必要的 Props，避免过度设计。
- 优先使用原生 HTML 属性的语义，减少自定义命名。

### 1.2 可预测性

- 同类 Props 在不同组件中命名保持一致，例如 `disabled`、`loading`、`className`、`style`。
- 布尔型 Props 默认值为 `false`，除非需求明确要求默认开启。

### 1.3 可扩展性

- 所有组件必须支持 `className` 和 `style` 透传，便于外部覆盖样式。
- 优先使用组合（Composition）而非配置（Configuration）来支持复杂内容。

### 1.4 可访问性

- 交互组件必须支持键盘操作与 ARIA 属性。
- 表单组件必须正确转发 ref，支持受控与非受控模式。

## 2. 通用 Props 约定

| Prop | 类型 | 说明 | 适用组件 |
|------|------|------|----------|
| `className` | `string` | 自定义类名，追加到组件根元素 | 全部 |
| `style` | `React.CSSProperties` | 自定义内联样式 | 全部 |
| `disabled` | `boolean` | 禁用状态 | Button、Input、Select |
| `loading` | `boolean` | 加载状态 | Button、Modal |
| `size` | `'small' \| 'medium' \| 'large'` | 尺寸，默认 `medium` | Button、Input、Select |

## 3. 组件 API 设计

### 3.1 Button

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger' | 'link';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}
```

- `variant` 控制视觉变体，`link` 仍为 `<button>`，不渲染 `<a>`。
- `loading` 为 `true` 时自动禁用点击，并显示加载标识。
- 原生 `disabled`、`type`、`onClick` 等属性直接继承自 `HTMLButtonElement`。

### 3.2 Input

```ts
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'small' | 'medium' | 'large';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean | string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}
```

- 支持受控（`value` + `onChange`）与非受控（`defaultValue`）模式。
- `error` 为 `string` 时显示错误提示文本，为 `boolean` 时仅展示错误样式。
- `onChange` 提供 `value` 和原始事件，方便表单库集成。

### 3.3 Card

```ts
interface CardProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  bordered?: boolean;
  shadowed?: boolean;
  hoverable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

- 默认 `bordered={true}`，`shadowed={false}`，`hoverable={false}`。
- 通过 `title`、`children`、`actions` 组合结构，不限制内容类型。

### 3.4 Modal

```ts
interface ModalProps {
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode | null;
  confirmLoading?: boolean;
  onClose?: () => void;
}
```

- `footer` 为 `null` 时隐藏底部区域；不传时默认显示确认/取消按钮。
- `confirmLoading` 控制确认按钮加载状态。
- 必须实现遮罩点击关闭、ESC 键关闭、焦点管理。
- 必须添加 ARIA 属性：`role="dialog"`、`aria-modal="true"`、`aria-labelledby`。

### 3.5 Select

```ts
type SelectValue = string | number;

interface SelectOption {
  label: string;
  value: SelectValue;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: SelectValue;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: SelectValue) => void;
  className?: string;
  style?: React.CSSProperties;
}
```

- `options` 为必填项。
- 支持受控模式（`value` + `onChange`）与非受控模式（仅 `options`）。
- 选项支持单独 `disabled`。

## 4. 受控与非受控

| 模式 | 识别方式 | 使用场景 |
|------|----------|----------|
| 受控 | 同时提供 `value` 和 `onChange` | 需要 React 状态管理 |
| 非受控 | 仅提供 `defaultValue`，不提供 `value` | 简单表单，依赖原生表单提交 |

- 不允许同时受控与非受控混用：若提供了 `value`，则必须提供 `onChange`。
- 非受控组件内部使用 `useRef` 或直接读取原生 DOM。

## 5. 事件回调签名

- 表单组件：`onChange(value, event)`，第一个参数为当前值，第二个为原始事件。
- 按钮组件：`onClick(event)`，直接使用原生事件签名。
- Modal 关闭：`onClose()`，不携带参数，由调用方决定是否阻止关闭。

## 6. Ref 转发

- 所有需要操作底层 DOM 的组件必须转发 ref。
- 使用 `React.forwardRef` 或 React 19 的 ref-as-prop 写法。
- 优先暴露最外层的语义化 DOM 节点（如 Button 暴露 `<button>`，Input 暴露 `<input>`）。

## 7. 变更记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-06-18 | 0.1.0 | 初始版本，定义 5 个核心组件的 API 规范 |
