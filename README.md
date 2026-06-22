# SlimUI

[![npm version](https://badge.fury.io/js/slimui.svg)](https://www.npmjs.com/package/slimui)

**English** | [中文](#中文文档)

A lightweight, customizable React 19 component library built with TypeScript.

- 📦 **Small**: ~13.5 kB ESM / ~15.9 kB CJS (uncompressed), CSS ~12.9 kB
- 🚀 **React 19 ready**: Built for React 19 with TypeScript strict mode
- 🎨 **Themeable**: Light & dark mode via CSS variables
- ♿ **Accessible**: Keyboard navigation and ARIA attributes
- 📦 **Dual format**: ESM + CJS + TypeScript declarations
- 🧪 **Well tested**: 100% function coverage with Vitest

## Installation

```bash
npm install slimui
# or
yarn add slimui
# or
pnpm add slimui
```

Peer dependencies:

```bash
npm install react react-dom
```

## Quick Start

Import the styles once at your application entry point:

```tsx
import 'slimui/dist/index.css';
```

Then use components:

```tsx
import { SButton, SInput, SCard, SModal, SSelect } from 'slimui';

function App() {
  return (
    <SCard title="Welcome" actions={<SButton>OK</SButton>}>
      <SInput placeholder="Type something" />
    </SCard>
  );
}
```

All components are exported with an `S` prefix to avoid naming collisions:

```tsx
import {
  SButton,
  SInput,
  SCard,
  SModal,
  SSelect,
  type ButtonProps,
  type InputProps,
  type CardProps,
  type ModalProps,
  type SelectProps,
  type SelectOption,
  type SelectValue,
} from 'slimui';
```

## Components

### SButton

```tsx
import { SButton } from 'slimui';

<SButton variant="primary" size="large" loading={false}>
  Submit
</SButton>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'danger' \| 'link'` | `'default'` | Visual style |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner and disable |
| `disabled` | `boolean` | - | Disable the button |
| `onClick` | `(event) => void` | - | Click handler |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| `className` / `style` | `string` / `CSSProperties` | - | Custom styles |

### SInput

```tsx
import { SInput } from 'slimui';

<SInput
  placeholder="Email"
  error="Invalid email"
  prefix="@"
  onChange={(value) => console.log(value)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size |
| `type` | `'text' \| 'password' \| 'number' \| 'email'` | `'text'` | Native input type |
| `value` | `string` / `number` | - | Controlled value |
| `defaultValue` | `string` / `number` | - | Uncontrolled default value |
| `prefix` | `React.ReactNode` | - | Prefix content |
| `suffix` | `React.ReactNode` | - | Suffix content |
| `error` | `boolean \| string` | - | Error state or message |
| `onChange` | `(value, event) => void` | - | Change handler |
| `disabled` | `boolean` | - | Disable the input |
| `className` / `style` | `string` / `CSSProperties` | - | Custom styles |

### SCard

```tsx
import { SCard } from 'slimui';

<SCard title="Card Title" actions={<button type="button">Action</button>} shadowed>
  Card content
</SCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `React.ReactNode` | - | Card title |
| `children` | `React.ReactNode` | - | Card content |
| `actions` | `React.ReactNode` | - | Footer actions |
| `bordered` | `boolean` | `true` | Show border |
| `shadowed` | `boolean` | `false` | Show shadow |
| `hoverable` | `boolean` | `false` | Lift on hover |
| `className` / `style` | `string` / `CSSProperties` | - | Custom styles |

### SModal

```tsx
import { SModal } from 'slimui';

<SModal open={open} title="Confirm" onClose={() => setOpen(false)}>
  Are you sure?
</SModal>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Visibility |
| `title` | `React.ReactNode` | - | Modal title |
| `children` | `React.ReactNode` | - | Modal content |
| `footer` | `React.ReactNode \| null` | default OK/Cancel | Footer content |
| `confirmLoading` | `boolean` | `false` | Loading state for OK button |
| `onClose` | `() => void` | - | Close callback |
| `className` / `style` | `string` / `CSSProperties` | - | Custom styles |

### SSelect

```tsx
import { SSelect } from 'slimui';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana', disabled: true },
];

<SSelect
  options={options}
  value={value}
  onChange={(value) => setValue(value)}
  placeholder="Choose a fruit"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | required | Option list |
| `value` | `string \| number` | - | Controlled value |
| `placeholder` | `string` | `'Please select'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable select |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Select size |
| `onChange` | `(value) => void` | - | Change callback |
| `className` / `style` | `string` / `CSSProperties` | - | Custom styles |

## Theming

SlimUI supports light mode by default. To enable dark mode, add `data-theme="dark"` to a parent element:

```html
<html data-theme="dark">
```

Or let it follow the system preference automatically (default behavior).

## TypeScript

All components are written in TypeScript with strict mode. Type definitions are included in the package.

## License

MIT

---

# 中文文档

SlimUI 是一个轻量、可定制的 React 19 组件库，使用 TypeScript 构建。

- 📦 **体积小**：ESM 约 13.5 kB，CJS 约 15.9 kB（未压缩），CSS 约 12.9 kB
- 🚀 **React 19 就绪**：基于 React 19，开启 TypeScript 严格模式
- 🎨 **可主题化**：通过 CSS 变量支持亮色/暗色主题
- ♿ **可访问性**：支持键盘导航和 ARIA 属性
- 📦 **双格式产物**：ESM + CJS + TypeScript 类型声明
- 🧪 **测试完善**：函数覆盖率 100%

## 安装

```bash
npm install slimui
# 或
yarn add slimui
# 或
pnpm add slimui
```

 peer 依赖：

```bash
npm install react react-dom
```

## 快速开始

在应用入口处引入样式，**只需引入一次**：

```tsx
import 'slimui/dist/index.css';
```

然后使用组件：

```tsx
import { SButton, SInput, SCard, SModal, SSelect } from 'slimui';

function App() {
  return (
    <SCard title="欢迎" actions={<SButton>确定</SButton>}>
      <SInput placeholder="输入内容" />
    </SCard>
  );
}
```

所有组件都带有 `S` 前缀，避免与项目中其他同名组件冲突：

```tsx
import {
  SButton,
  SInput,
  SCard,
  SModal,
  SSelect,
  type ButtonProps,
  type InputProps,
  type CardProps,
  type ModalProps,
  type SelectProps,
  type SelectOption,
  type SelectValue,
} from 'slimui';
```

## 组件

### SButton 按钮

```tsx
import { SButton } from 'slimui';

<SButton variant="primary" size="large" loading={false}>
  提交
</SButton>
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'default' \| 'primary' \| 'danger' \| 'link'` | `'default'` | 视觉变体 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮尺寸 |
| `loading` | `boolean` | `false` | 加载状态（自动禁用点击） |
| `disabled` | `boolean` | - | 是否禁用 |
| `onClick` | `(event) => void` | - | 点击事件 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |
| `className` / `style` | `string` / `CSSProperties` | - | 自定义样式 |

### SInput 输入框

```tsx
import { SInput } from 'slimui';

<SInput
  placeholder="邮箱"
  error="邮箱格式不正确"
  prefix="@"
  onChange={(value) => console.log(value)}
/>
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 输入框尺寸 |
| `type` | `'text' \| 'password' \| 'number' \| 'email'` | `'text'` | 原生 input 类型 |
| `value` | `string` / `number` | - | 受控值 |
| `defaultValue` | `string` / `number` | - | 非受控默认值 |
| `prefix` | `React.ReactNode` | - | 前缀内容 |
| `suffix` | `React.ReactNode` | - | 后缀内容 |
| `error` | `boolean \| string` | - | 错误状态；为字符串时显示错误文本 |
| `onChange` | `(value, event) => void` | - | 值变化回调 |
| `disabled` | `boolean` | - | 是否禁用 |
| `className` / `style` | `string` / `CSSProperties` | - | 自定义样式 |

### SCard 卡片

```tsx
import { SCard } from 'slimui';

<SCard title="卡片标题" actions={<button type="button">操作</button>} shadowed>
  卡片内容
</SCard>
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `React.ReactNode` | - | 卡片标题 |
| `children` | `React.ReactNode` | - | 卡片内容 |
| `actions` | `React.ReactNode` | - | 底部操作区 |
| `bordered` | `boolean` | `true` | 是否显示边框 |
| `shadowed` | `boolean` | `false` | 是否显示阴影 |
| `hoverable` | `boolean` | `false` | 悬停时是否上浮 |
| `className` / `style` | `string` / `CSSProperties` | - | 自定义样式 |

### SModal 模态框

```tsx
import { SModal } from 'slimui';

<SModal open={open} title="确认" onClose={() => setOpen(false)}>
  确定要执行此操作吗？
</SModal>
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `open` | `boolean` | `false` | 是否显示 |
| `title` | `React.ReactNode` | - | 弹窗标题 |
| `children` | `React.ReactNode` | - | 弹窗内容 |
| `footer` | `React.ReactNode \| null` | 默认 确定/取消 按钮 | 底部区域；传 `null` 隐藏 |
| `confirmLoading` | `boolean` | `false` | 确定按钮加载状态 |
| `onClose` | `() => void` | - | 关闭回调 |
| `className` / `style` | `string` / `CSSProperties` | - | 自定义样式 |

### SSelect 下拉选择

```tsx
import { SSelect } from 'slimui';

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana', disabled: true },
];

<SSelect
  options={options}
  value={value}
  onChange={(value) => setValue(value)}
  placeholder="选择水果"
/>
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | `SelectOption[]` | 必填 | 选项列表 |
| `value` | `string \| number` | - | 受控值 |
| `placeholder` | `string` | `'Please select'` | 占位文本 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 选择器尺寸 |
| `onChange` | `(value) => void` | - | 选择回调 |
| `className` / `style` | `string` / `CSSProperties` | - | 自定义样式 |

## 主题切换

SlimUI 默认使用亮色主题。开启暗色主题有两种方式：

### 方式一：手动指定

在任意父元素上添加 `data-theme="dark"`：

```html
<html data-theme="dark">
```

### 方式二：跟随系统

默认已开启。当系统设置为暗色模式，且未显式设置 `data-theme="light"` 时，会自动切换到暗色主题。

## 尺寸对照

| size | SButton 高度 | SInput 高度 | SSelect 高度 |
|------|-------------|-------------|--------------|
| `small` | 28px | 28px | 28px |
| `medium`（默认） | 36px | 36px | 36px |
| `large` | 44px | 44px | 44px |

三个组件并排使用时高度一致。

## TypeScript 支持

所有组件均使用 TypeScript 严格模式编写，类型定义已随包发布，无需额外安装 `@types/slimui`。

## 许可证

MIT

## 更新日志

参见 [CHANGELOG.md](./CHANGELOG.md)。
