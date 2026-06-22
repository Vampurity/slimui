# 代码规范

> 统一代码风格，降低协作成本，保证组件库代码质量一致。
> 本项目使用 **Biome** 替代 ESLint + Prettier，统一负责格式化与代码质量检查。

## 1. 项目结构

```
slimui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── __tests__/
│   │   │       └── Button.test.tsx
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── Select/
│   ├── styles/
│   │   ├── tokens.css
│   │   └── base.css
│   ├── index.ts
│   └── styles.css
├── tests/
│   └── setup.ts
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
├── biome.json
├── README.md
├── CHANGELOG.md
├── api-design.md
├── tech-decisions.md
└── coding-conventions.md
```

## 2. 文件与目录命名

- 组件目录：大驼峰，如 `Button/`、`Modal/`。
- 组件文件：与目录同名，如 `Button.tsx`。
- 样式文件：`Component.module.css`，与组件文件同目录。
- 测试文件：`Component.test.tsx`，放在组件目录下的 `__tests__/` 中。
- 工具/类型文件：小驼峰，如 `utils.ts`、`types.ts`。

## 3. TypeScript 规范

### 3.1 类型定义

- 组件 Props 必须显式定义接口，命名规则：`{Component}Props`。
- 优先使用 `interface` 定义对象类型，使用 `type` 定义联合类型或别名。
- 所有可选 Props 使用 `?` 标记，避免使用 `undefined` 作为默认值类型。

```ts
// ✅ 推荐
interface ButtonProps {
  variant?: 'default' | 'primary' | 'danger' | 'link';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

// ❌ 避免
interface ButtonProps {
  variant: 'default' | 'primary' | 'danger' | 'link' | undefined;
}
```

### 3.2 组件声明

- 函数组件使用函数声明或箭头函数均可，但同一个项目内保持一致。
- 需要转发 ref 的组件使用 `React.forwardRef`。
- 组件默认导出放在文件末尾。

```tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'medium', loading = false, children, ...rest }, ref) => {
    return (
      <button ref={ref} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

### 3.3 默认值

- 使用解构赋值设置默认值，避免在组件体内使用 `||` 或 `??` 处理。

```ts
// ✅ 推荐
function Button({ variant = 'default', size = 'medium' }: ButtonProps) {}

// ❌ 避免
function Button(props: ButtonProps) {
  const variant = props.variant || 'default';
}
```

## 4. 样式规范

### 4.1 BEM 命名

- 统一前缀 `sui-`（slimUI）。
- 块（Block）：`.sui-button`
- 元素（Element）：`.sui-button__icon`
- 修饰符（Modifier）：`.sui-button--primary`、`.sui-button--large`、`.sui-button--disabled`

```css
.sui-button {
  display: inline-flex;
}

.sui-button__icon {
  margin-right: var(--space-xs);
}

.sui-button--primary {
  background-color: var(--color-primary);
}

.sui-button--large {
  height: 44px;
}
```

### 4.2 CSS Variables

- 所有颜色、尺寸、间距、阴影、过渡、层级必须使用 `src/styles/tokens.css` 中定义的变量。
- 禁止在组件样式中写死色值或魔法数字。

```css
/* ✅ 推荐 */
.sui-button {
  color: var(--color-text);
  border-radius: var(--radius-md);
  transition: all var(--transition-duration) var(--transition-easing);
}

/* ❌ 避免 */
.sui-button {
  color: #333;
  border-radius: 4px;
  transition: all 0.2s ease;
}
```

### 4.3 状态样式

- `disabled`：`--color-disabled`、`cursor: not-allowed`、`opacity: 0.6`。
- `focus`：`--color-primary` outline/ring，宽度 2px。
- `hover`：使用 `--transition-duration` 过渡。
- `error`：`--color-danger` 边框与提示文本。

## 5. 组件实现规范

### 5.1 Props 透传

- 优先继承原生 HTML 属性类型，避免重复声明。
- 必须支持 `className` 和 `style` 透传。

### 5.2 事件处理

- 事件回调签名遵循 `api-design.md` 约定。
- 内部事件处理函数以 `handle` 开头，如 `handleClick`、`handleChange`。

### 5.3 可访问性

- 交互元素必须可通过键盘访问。
- Modal 等浮层必须管理焦点、支持 ESC 关闭、添加正确 ARIA 属性。
- 表单组件必须正确关联 `label` 所需的 `id`（如有需要）。

## 6. 测试规范

### 6.1 测试文件

- 每个组件必须至少包含一个测试文件。
- 测试文件命名：`Component.test.tsx`。

### 6.2 测试覆盖维度

每个组件至少覆盖以下 3 项：
- 是否正确渲染；
- 用户交互事件是否被正确触发；
- 禁用/加载等状态是否正确生效；
- 受控属性变化是否正确响应；
- 错误提示是否正确显示。

### 6.3 测试写法

- 使用 React Testing Library 的 `render`、`screen`、`fireEvent`、`userEvent`。
- 优先使用 `userEvent` 模拟真实用户交互。
- 断言优先使用 `@testing-library/jest-dom` 提供的匹配器。

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /Click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 7. 提交与版本规范

- 使用语义化版本（SemVer）：`MAJOR.MINOR.PATCH`。
- 首次发布版本号为 `0.1.0`。
- 提交信息建议采用简明英文，如 `feat: add Button component`、`fix: correct Modal focus trap`。

## 8. 变更记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-06-18 | 0.1.0 | 初始代码规范，定义文件命名、TypeScript、CSS、测试等约定 |
