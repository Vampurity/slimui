# React 19 组件库开发 Todo 清单

基于 [`demand.md`](./demand.md) 拆分的任务清单。每完成一项请在方框中打上 `x`。

---

## 一、项目初始化

- [x] 1.1 创建项目目录 `slimui/`
- [x] 1.2 初始化 `package.json`，配置 name、version、description、author、license、keywords
- [x] 1.3 安装 React 19 依赖：`react`、`react-dom`
- [x] 1.4 安装 TypeScript 5.x 及 `@types/react`、`@types/react-dom`
- [x] 1.5 安装构建工具：`tsup`
- [x] 1.6 安装测试工具：`vitest`、`@testing-library/react`、`@testing-library/jest-dom`、`jsdom`
- [x] 1.7 安装代码规范工具：`@biomejs/biome`
- [x] 1.8 配置 `tsconfig.json`（启用 `strict: true`）
- [x] 1.9 配置 `tsup.config.ts`（输出 ESM + CJS + `.d.ts` + CSS + source map）
- [x] 1.10 配置 `vitest.config.ts` 与 `tests/setup.ts`
- [x] 1.11 配置 Biome（`biome.json`）
- [x] 1.12 配置 `package.json` 的 `scripts`（build / test / lint / format）
- [x] 1.13 配置 `package.json` 的 `peerDependencies`：
  - `react: ^19.0.0`
  - `react-dom: ^19.0.0`
- [x] 1.14 配置 `package.json` 的 `exports`、`main`、`module`、`types`、`files`
- [x] 1.15 创建 `README.md` 骨架
- [x] 1.16 创建 `CHANGELOG.md` 初始文件

---

## 二、设计系统与全局样式

- [x] 2.1 创建 `src/styles/tokens.css`，定义全部设计 Tokens
  - [x] 主色：`--color-primary`、`--color-success`、`--color-warning`、`--color-danger`、`--color-info`
  - [x] 中性色：`--color-text`、`--color-text-secondary`、`--color-bg`、`--color-border`、`--color-disabled`
  - [x] 字号：`--font-size-base`、`--font-size-lg`、`--font-size-sm`
  - [x] 行高：`--line-height-base`
  - [x] 字重：`--font-weight-normal`、`--font-weight-medium`、`--font-weight-bold`
  - [x] 圆角：`--radius-sm`、`--radius-md`、`--radius-lg`、`--radius-full`
  - [x] 间距：`--space-xs`、`--space-sm`、`--space-md`、`--space-lg`、`--space-xl`
  - [x] 阴影：`--shadow-sm`、`--shadow-md`、`--shadow-lg`
  - [x] 过渡：`--transition-duration`、`--transition-easing`
  - [x] 层级：`--z-index-mask`、`--z-index-dropdown`、`--z-index-modal`
- [x] 2.2 创建 `src/styles/base.css`，编写全局基础/重置样式
- [x] 2.3 创建 `src/styles.css` 作为样式入口，导入 tokens 与 base
- [x] 2.4 实现暗色主题（可选）：提供 `data-theme="dark"` 或 `dark.css`
- [x] 2.5 确认所有组件不直接使用写死色值

---

## 三、组件开发

### 3.1 Button 组件

- [x] 创建 `src/components/Button/Button.tsx`
- [x] 创建 `src/components/Button/Button.module.css`
- [x] 实现 Props：`variant`、`size`、`loading`、`disabled`、`children`、`onClick`、`className`、`style`
- [x] 支持类型：`default`、`primary`、`danger`、`link`
- [x] 支持尺寸：`small`、`medium`、`large`
- [x] 实现 loading 状态（禁用点击 + 加载标识）
- [x] 确保 `link` 变体仍渲染为 `<button>`
- [x] 应用 BEM 类名前缀 `sui-button`

### 3.2 Input 组件

- [x] 创建 `src/components/Input/Input.tsx`
- [x] 创建 `src/components/Input/Input.module.css`
- [x] 实现 Props：`type`、`value`、`defaultValue`、`onChange`、`onFocus`、`onBlur`、`prefix`、`suffix`、`placeholder`、`disabled`、`error`、`className`、`style`
- [x] 支持受控与非受控模式
- [x] 支持 `error?: boolean | string`
- [x] 实现前缀/后缀渲染区域
- [x] 应用 BEM 类名前缀 `sui-input`

### 3.3 Card 组件

- [x] 创建 `src/components/Card/Card.tsx`
- [x] 创建 `src/components/Card/Card.module.css`
- [x] 实现 Props：`title`、`children`、`actions`、`bordered`、`shadowed`、`hoverable`、`className`、`style`
- [x] 设置默认值：`bordered=true`、`shadowed=false`、`hoverable=false`
- [x] 支持标题区、内容区、操作区布局
- [x] 应用 BEM 类名前缀 `sui-card`

### 3.4 Modal 组件

- [x] 创建 `src/components/Modal/Modal.tsx`
- [x] 创建 `src/components/Modal/Modal.module.css`
- [x] 实现 Props：`open`、`title`、`children`、`footer`、`confirmLoading`、`onClose`
- [x] 实现显示/隐藏控制
- [x] 实现点击遮罩关闭
- [x] 实现 ESC 键关闭
- [x] 实现焦点管理
- [x] 添加 ARIA 属性：`role="dialog"`、`aria-modal="true"`、`aria-labelledby`
- [x] 应用 BEM 类名前缀 `sui-modal`

### 3.5 Select 组件

- [x] 创建 `src/components/Select/Select.tsx`
- [x] 创建 `src/components/Select/Select.module.css`
- [x] 实现 Props：`options`、`value`、`placeholder`、`disabled`、`onChange`、`className`、`style`
- [x] 定义类型：`SelectValue = string | number`、`SelectOption = { label, value, disabled? }`
- [x] 支持受控模式
- [x] 实现选项列表展开/收起
- [x] 支持禁用选项
- [x] 应用 BEM 类名前缀 `sui-select`

### 3.6 统一导出

- [x] 创建 `src/index.ts`，统一导出 5 个组件及其类型
- [x] 导入 `src/styles.css`

---

## 四、样式统一检查

- [x] 4.1 确认 Button、Input、Select 高度与内边距对齐
- [x] 4.2 统一 disabled 状态样式：`--color-disabled` + `cursor: not-allowed` + `opacity: 0.6`
- [x] 4.3 统一 focus 状态样式：`--color-primary` outline/ring，宽度 2px
- [x] 4.4 统一 hover 过渡时长：`--transition-duration`
- [x] 4.5 统一 error 状态样式：`--color-danger` 边框与提示文本
- [x] 4.6 确认所有组件类名符合 BEM 规范且前缀为 `sui-`
- [x] 4.7 确认暗色主题下颜色变量切换正常（如已实现）

---

## 五、测试

### 5.1 测试环境

- [x] 确认 `vitest.config.ts` 已配置 `environment: 'jsdom'`
- [x] 确认 `tests/setup.ts` 已导入 `@testing-library/jest-dom`

### 5.2 Button 测试

- [x] 测试 Button 正确渲染
- [x] 测试点击事件触发
- [x] 测试 disabled 状态禁用点击
- [x] 测试 loading 状态

### 5.3 Input 测试

- [x] 测试 Input 正确渲染
- [x] 测试受控模式 value/onChange
- [x] 测试非受控模式 defaultValue
- [x] 测试 disabled 状态
- [x] 测试 error 状态显示

### 5.4 Card 测试

- [x] 测试 Card 正确渲染
- [x] 测试 title、children、actions 渲染
- [x] 测试 bordered/shadowed/hoverable 类名

### 5.5 Modal 测试

- [x] 测试 Modal 显示/隐藏
- [x] 测试点击遮罩关闭
- [x] 测试 ESC 键关闭
- [x] 测试 confirmLoading 状态
- [x] 测试焦点管理

### 5.6 Select 测试

- [x] 测试 Select 正确渲染
- [x] 测试选项列表展开
- [x] 测试选中后 onChange 回调
- [x] 测试受控模式
- [x] 测试禁用选项

### 5.7 测试汇总

- [x] 运行 `pnpm test` 全部通过
- [x] 检查覆盖率，确认行覆盖率 ≥ 80%

---

## 六、构建与打包验证

- [x] 6.1 运行 `pnpm build`（或 `npm run build`）
- [x] 6.2 确认输出目录包含 ESM 产物
- [x] 6.3 确认输出目录包含 CJS 产物
- [x] 6.4 确认输出目录包含 `.d.ts` 类型声明
- [x] 6.5 确认输出目录包含 CSS 文件
- [x] 6.6 确认输出目录包含 source map
- [x] 6.7 运行 `npm pack`，检查 tarball 内容
- [x] 6.8 运行 `npm publish --dry-run`，确认无报错

---

## 七、文档完善

- [x] 7.1 README 包含项目简介
- [x] 7.2 README 包含安装命令
- [x] 7.3 README 包含快速开始示例
- [x] 7.4 README 包含每个组件的基础使用示例
- [x] 7.5 README 包含 Props 说明表格
- [x] 7.6 README 包含主题切换说明（如已实现暗色主题）
- [x] 7.7 CHANGELOG 记录初始版本变更

---

## 八、发布

- [ ] 8.1 确认 npm 账号已注册
- [ ] 8.2 确认包名未被占用
- [ ] 8.3 设置首次版本号（建议 `0.1.0`）
- [ ] 8.4 执行 `npm login`
- [ ] 8.5 执行 `npm publish --access public`
- [ ] 8.6 在 npm 官网确认包已发布成功
- [ ] 8.7 提供 npm 包链接与安装命令到 README 或交付文档

---

## 九、可选扩展

- [ ] 9.1 搭建 Storybook 文档站点
- [ ] 9.2 实现 `data-theme="dark"` 主题切换示例
- [ ] 9.3 README 中补充 gzip 后 bundle size 信息（目标 < 20KB）
- [ ] 9.4 配置 GitHub Actions CI（测试 + 构建）
- [ ] 9.5 配置 GitHub Actions 自动发布工作流

---

## 当前进度

| 阶段 | 总数 | 已完成 |
|------|------|--------|
| 一、项目初始化 | 16 | 16 |
| 二、设计系统与全局样式 | 5 | 5 |
| 三、组件开发 | 30 | 30 |
| 四、样式统一检查 | 7 | 7 |
| 五、测试 | 26 | 26 |
| 六、构建与打包验证 | 8 | 7 |
| 七、文档完善 | 7 | 7 |
| 八、发布 | 7 | 0 |
| 九、可选扩展 | 5 | 0 |
| **合计** | **111** | **98** |
