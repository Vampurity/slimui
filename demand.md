# React 19 组件库需求文档

## 项目概述

使用 TypeScript 为 React 19 构建一个轻量级、最常用的基础组件库。组件库包含 5 个核心组件，覆盖日常 UI 开发中最常见的场景。完成后需在本地完成测试并发布到 npm。

**目标受众**：个人开发者 / 小型团队，希望快速引入一套风格统一、无额外依赖的基础组件。

**约束关键词**：轻量、可定制、可访问、易发布。

## 技术栈

- **框架**：React 19
- **语言**：TypeScript 5.x
- **构建工具**：tsup
- **样式方案**：CSS Modules / Tailwind CSS（任选其一）
- **测试工具**：Vitest + React Testing Library + jsdom
- **包管理器**：pnpm（推荐）/ npm
- **类型检查**：TypeScript 严格模式（`strict: true`）
- **代码规范**：Biome

### React 19 兼容要求

- 组件库需兼容 React 19 的 Client Component 模式。
- 若使用 Server Component 相关特性，需显式标注 `'use client'` 或 `'use server'`。
- 事件回调与 ref 处理需符合 React 19 规范（例如 ref 可直接作为 prop 传递）。

## 组件清单

组件库共包含以下 5 个核心组件：

| 组件名 | 英文名 | 核心功能 |
|--------|--------|----------|
| 按钮 | Button | 支持多种类型、尺寸、禁用、加载状态 |
| 输入框 | Input | 支持受控/非受控、前缀/后缀、错误提示、禁用 |
| 卡片 | Card | 支持标题、内容区、操作区、阴影/边框样式 |
| 模态框 | Modal | 支持显示/隐藏、遮罩、标题、底部按钮、ESC 关闭 |
| 下拉选择 | Select | 支持单选、禁用、占位符、选项列表、受控模式 |

## 设计系统与样式统一

为保证五个组件视觉风格一致，组件库必须基于同一套设计 Tokens 实现，所有组件共享同一组 CSS 变量与视觉规范。

### 1. 设计 Tokens

在 `src/styles/tokens.css` 或根样式文件中定义以下变量，所有组件必须引用：

| Token 类别 | 说明 | 示例 |
|------------|------|------|
| 主色 | 品牌主色、成功、警告、危险、信息色 | `--color-primary`, `--color-success`, `--color-warning`, `--color-danger`, `--color-info` |
| 中性色 | 文本、背景、边框、禁用 | `--color-text`, `--color-text-secondary`, `--color-bg`, `--color-border`, `--color-disabled` |
| 字号 | 文本、标题、小号文本 | `--font-size-base`, `--font-size-lg`, `--font-size-sm` |
| 行高 | 文本行高 | `--line-height-base` |
| 字重 | 常规、中等、加粗 | `--font-weight-normal`, `--font-weight-medium`, `--font-weight-bold` |
| 圆角 | 小组件、中组件、大组件、全圆角 | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full` |
| 间距 | 内边距、外边距基准值 | `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl` |
| 阴影 | 卡片、浮层、模态框阴影 | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| 过渡 | 默认过渡时长与缓动 | `--transition-duration`, `--transition-easing` |
| 层级 | 遮罩、浮层、模态框层级 | `--z-index-mask`, `--z-index-dropdown`, `--z-index-modal` |

### 2. 主题支持

- 默认提供 **亮色主题（light）**。
- 建议提供 **暗色主题（dark）** 切换能力，可通过在根节点添加 `data-theme="dark"` 实现。
- 所有颜色必须通过 CSS 变量引用，禁止在组件中写死色值。

> **注意**：若选择 Tailwind CSS，需将 Tokens 同步配置到 `tailwind.config.ts` 的 `theme.extend` 中，并保证编译后仍输出与上述变量名一致的 CSS 变量。

### 3. 组件状态统一

各组件的以下状态样式必须保持一致：

- **禁用（disabled）**：统一使用 `--color-disabled` 背景/文本，并设置 `cursor: not-allowed`、`opacity: 0.6`。
- **聚焦（focus）**：统一使用 `--color-primary` 的 outline 或 ring 效果，宽度一致（建议 2px）。
- **悬停（hover）**：统一过渡时长 `--transition-duration`。
- **错误（error）**：统一使用 `--color-danger` 边框与提示文本。

### 4. 尺寸规范

组件尺寸遵循统一的尺寸枚举。以下高度为 Button、Input、Select 的标准高度（含边框）：

- `small`：高度 28px
- `medium`：高度 36px（默认）
- `large`：高度 44px

Button、Input、Select 的高度与水平内边距必须对齐，保证并排展示时视觉一致。

### 5. 类名命名规范

采用 BEM 命名约定，统一前缀 `sui-`（slimUI）：

```
sui-button
sui-button--primary
sui-button--large
sui-button--disabled
sui-input
sui-input__prefix
sui-input--error
```

### 6. 样式组织

- 全局基础变量：`src/styles/tokens.css`
- 基础重置样式：`src/styles/base.css`
- 组件样式：每个组件目录下 `Component.module.css` 或 `Component.css`
- 入口统一引入：`src/styles.css` 或 `src/index.ts` 中导入全局变量
- 构建时 CSS 需被正确打包并随 npm 包发布

## 通用要求

- 所有组件必须提供完整的 TypeScript 类型定义。
- 每个组件的 Props 需保持简洁、语义清晰。
- 组件必须支持 `className` 与 `style` 透传，便于外部扩展。
- 组件事件回调符合 React 19 规范。
- 支持 ESM 与 CJS 两种产物格式，并输出 `.d.ts` 类型声明文件。
- 产物需包含 source map（`.js.map`、`.css.map`）。
- 提供 `package.json` 中正确的 `exports`、`types`、`main`、`module` 配置。
- 明确声明 `peerDependencies`：
  - `react: ^19.0.0`
  - `react-dom: ^19.0.0`

## 各组件详细需求

### 1. Button

- **类型**：`default`、`primary`、`danger`、`link`
  - `link` 仅为视觉变体，仍渲染为 `<button>`，通过 `onClick` 处理点击。
- **尺寸**：`small`、`medium`、`large`
- **状态**：`disabled`、`loading`
- **事件**：`onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void`
- **children**：按钮文本或自定义内容
- **Props 示例**：
  ```ts
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'danger' | 'link';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
  }
  ```

### 2. Input

- **类型**：`type?: 'text' | 'password' | 'number' | 'email'`
- **受控模式**：`value` + `onChange`
- **非受控模式**：`defaultValue`
- **扩展**：`prefix`、`suffix`、`placeholder`、`disabled`、`error`
- **错误状态**：`error?: boolean | string`；为 `string` 时显示错误提示文本。
- **事件**：`onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void`、`onFocus`、`onBlur`

### 3. Card

- **结构**：`title`、`children`、`actions`
- **样式开关**：
  - `bordered?: boolean`（默认 `true`）
  - `shadowed?: boolean`（默认 `false`）
  - `hoverable?: boolean`（默认 `false`）
- **扩展**：支持透传 `className` 与 `style`
- **Props 示例**：
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

### 4. Modal

- **显示控制**：`open`、`onClose`
- **结构**：`title`、`children`、`footer`
- **交互**：点击遮罩关闭、ESC 键关闭、`confirmLoading`
- **可访问性**：焦点管理、ARIA 属性（`role="dialog"`、`aria-modal="true"`、`aria-labelledby`）
- **Props 示例**：
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

### 5. Select

- **选项**：`options: { label: string; value: string | number; disabled?: boolean }[]`
- **受控模式**：`value` + `onChange`
- **状态**：`disabled`、`placeholder`
- **事件**：`onChange?: (value: string | number) => void`
- **Props 示例**：
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
  }
  ```

## 本地测试要求

1. 使用 Vitest + React Testing Library 为每个组件编写测试用例。
2. 每个组件至少 3 个测试用例，覆盖以下维度中的至少 3 项：
   - 组件是否正确渲染；
   - 用户交互事件是否被正确触发；
   - 禁用/加载等状态是否正确生效；
   - 受控属性变化是否正确响应；
   - 错误提示是否正确显示。
3. 运行 `pnpm test`（或 `npm test`）所有测试必须通过。
4. 建议行覆盖率达到 80% 以上。

## 发布要求

1. 在 npm 注册账号（如尚未注册）。
2. 确认包名未被占用，建议包名为 `slimui`（全小写），也可使用 scoped 包如 `@<你的用户名>/slimui`。
3. 配置 `package.json` 中的 `name`、`version`、`description`、`author`、`license`、`keywords`、`files`、`exports`、`main`、`module`、`types`。
4. 明确 `peerDependencies`：
   ```json
   {
     "peerDependencies": {
       "react": "^19.0.0",
       "react-dom": "^19.0.0"
     }
   }
   ```
5. 执行构建命令生成产物（ESM + CJS + `.d.ts` + CSS + source map）。
6. 本地验证：
   - `npm pack` 检查打包内容。
   - `npm publish --dry-run` 模拟发布。
7. 登录 npm：`npm login`。
8. 发布：
   - 公开包：`npm publish --access public`
   - 私有包：`npm publish --access restricted`（需 npm Pro 或组织）
9. 首次发布建议版本号为 `0.1.0`，后续按 SemVer 规范升级。
10. 发布成功后提供 npm 包链接与安装命令，并维护 `CHANGELOG.md`。

## 目录结构建议

```
slimui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── __tests__/Button.test.tsx
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── Select/
│   ├── styles/
│   │   ├── tokens.css      # 设计 Tokens
│   │   └── base.css        # 全局基础样式/重置
│   ├── index.ts            # 组件统一导出
│   └── styles.css          # 样式入口
├── tests/
│   └── setup.ts            # Vitest 测试环境配置
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
├── biome.json
├── CHANGELOG.md
└── README.md
```

## 验收标准

- [ ] 项目使用 TypeScript 5.x + React 19 初始化。
- [ ] 包含 Button、Input、Card、Modal、Select 五个组件。
- [ ] 每个组件具备完整的 Props 类型与基础样式。
- [ ] 所有颜色通过 CSS 变量引用，无写死色值。
- [ ] Button、Input、Select 尺寸对齐，并排展示视觉一致。
- [ ] 本地测试全部通过（`vitest run`），行覆盖率 ≥ 80%。
- [ ] 构建产物成功生成 ESM + CJS + `.d.ts` + CSS + source map。
- [ ] `package.json` 的 `exports`、`types`、`main`、`module`、`peerDependencies` 配置正确。
- [ ] 包已成功发布到 npm 且可正常安装使用。
- [ ] README 中包含安装方式、快速开始与每个组件的基础使用示例。
- [ ] 提供 CHANGELOG.md 记录版本变更。

## 可选扩展

以下项不影响核心验收，但建议作为加分项：

- 提供 Storybook 或在线文档站点，用于交互式展示组件。
- 提供暗色主题 `dark.css` 或 `data-theme="dark"` 切换示例。
- 在 README 中提供 Bundle size 信息，建议核心产物 gzip 后 < 20KB。
- 配置 GitHub Actions 实现 CI 测试与自动发布。
