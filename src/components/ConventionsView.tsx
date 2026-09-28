import React from 'react';
import { PageDocView } from './content/PageDocView';
import { conventionDoc } from '../data/pages/conventionDoc';

/**
 * T2 需求设计假设及原则：通用约定（表样 / 数据列 / 维度 / 口径 / 字段 / 假设）。
 * 内容在 src/data/pages/conventionDoc.ts（数据层），渲染与 Markdown 编辑走通用 PageDocView。
 */
export const ConventionsView: React.FC = () => <PageDocView doc={conventionDoc} />;
