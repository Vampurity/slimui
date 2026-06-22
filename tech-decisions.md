# 技术决策记录

> 记录项目关键技术选型及其原因，避免开发过程中反复摇摆。

## 1. 核心栈

| 领域 | 选型 | 版本/说明 |
|------|------|-----------|
| 框架 | React | ^19.0.0 |
| 语言 | TypeScript | 5.x，启用 `strict: true` |
| 构建工具 | tsup | 基于 esbuild，支持 ESM + CJS + `.d.ts` |
| 样式方案 | CSS Modules + CSS Variables | 组件级样式隔离 + 全局设计 Tokens |
| 测试框架 | Vitest | 配合 `@testing-library/react` 与 `jsdom` |
| 代码规范 | Biome | 统一代码风格与质量检查，减少配置成本 |
| 包管理器 | pnpm | 节省磁盘空间，依赖解析稳定 |

## 2. 决策详情

### 2.1 使用 React 19

**决策**：组件库目标运行时为 React 19。

**原因**：
- 项目需求明确要求基于 React 19 构建。
- 可利用 ref-as-prop、改进的 Suspense、Server Component 支持等新特性。
- 面向个人开发者和小团队，愿意接受较新的 React 版本。

**影响**：
- `peerDependencies` 中声明 `react: ^19.0.0` 和 `react-dom: ^19.0.0`。
- 事件回调与 ref 处理需符合 React 19 规范。
- 若使用 Server Component 特性，需显式标注 `'use client'`。

### 2.2 使用 TypeScript 5.x 并开启严格模式

**决策**：全部源码使用 TypeScript，启用 `strict: true`。

**原因**：
- 组件库对外暴露 API，类型安全直接影响使用者体验。
- 严格模式可在编译期捕获更多潜在错误，减少运行时问题。

**影响**：
- 每个组件必须提供完整的 Props 类型定义。
- 构建时输出 `.d.ts` 类型声明文件。

### 2.3 使用 tsup 作为构建工具

**决策**：使用 `tsup` 打包，输出 ESM + CJS + `.d.ts` + CSS + source map。

**原因**：
- 配置简单，一条命令即可生成多种格式产物。
- 基于 esbuild，构建速度快。
- 原生支持 CSS 导入与类型声明输出。

**替代方案**：
- Rollup：更灵活，但配置复杂，对本项目来说过度设计。
- Vite：适合应用项目，库模式配置不如 tsup 直接。

### 2.4 使用 CSS Modules + CSS Variables

**决策**：组件样式使用 CSS Modules，设计 Tokens 使用 CSS Variables。

**原因**：
- CSS Modules 提供组件级样式隔离，避免类名冲突。
- CSS Variables 支持运行时主题切换（如暗色模式），无需重新编译。
- 不引入 Tailwind CSS，保持轻量、无额外依赖，符合项目约束关键词“轻量”。

**替代方案**：
- Tailwind CSS：原子类效率高，但会增加构建复杂度和学习成本。
- CSS-in-JS：运行时开销大，与 React 19 Server Component 兼容性需谨慎评估。

### 2.5 使用 Vitest 进行测试

**决策**：使用 Vitest + React Testing Library + jsdom。

**原因**：
- Vitest 与 Vite 生态一致，配置简单，速度快。
- React Testing Library 鼓励以用户视角编写测试。
- jsdom 可在 Node 环境模拟浏览器 DOM。

**目标**：
- 每个组件至少 3 个测试用例。
- 行覆盖率 ≥ 80%。

### 2.6 使用 Biome

**决策**：使用 Biome 同时负责代码格式化与代码质量检查。

**原因**：
- Biome 速度显著快于 ESLint + Prettier，对组件库迭代更友好。
- 单工具即可覆盖格式化与 lint，避免 ESLint 与 Prettier 的规则冲突和重复配置。
- 原生支持 TypeScript 与 JSX，配置简洁，与 React 19 项目兼容良好。

**影响**：
- 使用 `biome.json` 作为唯一配置文件。
- `package.json` 中不再需要 `eslint`、`prettier`、`eslint-config-prettier` 等依赖。

### 2.7 使用 pnpm

**决策**：推荐使用 pnpm 作为包管理器。

**原因**：
- 硬链接机制节省磁盘空间。
- `pnpm-lock.yaml` 严格管理依赖版本，避免幽灵依赖。

## 3. 暂不采用的方案

| 方案 | 原因 |
|------|------|
| Storybook | 项目初期增加额外复杂度，列为可选扩展 |
| 暗色主题自动检测 | 先实现 `data-theme="dark"` 手动切换，自动检测后续迭代 |
| Monorepo | 仅 5 个组件，单包结构更简单 |

## 4. 变更记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-06-18 | 0.1.0 | 初始技术决策，确定 React 19 + TypeScript + tsup + CSS Modules 方案 |
