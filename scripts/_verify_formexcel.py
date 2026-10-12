#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""临时验证脚本：openpyxl 回读 45 个 xlsx，校验 sheet/合并/公式数与关键单元格样式。"""
import glob
import json
import os
import sys

from openpyxl import load_workbook
from openpyxl.utils import get_column_letter

BASE = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'docs', 'formexcel'))
DUMP = os.path.join(BASE, '.dump')

files = sorted(glob.glob(os.path.join(BASE, '*.xlsx')))
print('xlsx 文件数: %d' % len(files))
failures = 0

grand = {'sheets': 0, 'merges': 0, 'formulas': 0}
for f in files:
    code = os.path.basename(f)[:-5]
    dump_path = os.path.join(DUMP, code + '.json')
    with open(dump_path, 'r', encoding='utf-8') as fh:
        dump = json.load(fh)
    expect_sheets = len(dump.get('sheets', []))
    expect_merges = sum(len(s.get('merges', [])) for s in dump.get('sheets', []))
    expect_formulas = sum(1 for s in dump.get('sheets', []) for c in s.get('cells', []) if c.get('formula'))

    wb = load_workbook(f, data_only=False)
    got_sheets = len(wb.sheetnames)
    got_merges = sum(len(ws.merged_cells.ranges) for ws in wb.worksheets)
    got_formulas = 0
    # 遍历所有单元格：验证 font.color / fill 读取不再抛类型错（旧 zip 注入的根因）
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for cell in row:
                _ = cell.font.color.rgb if cell.font and cell.font.color else None
                _ = cell.fill.fgColor.rgb if cell.fill and cell.fill.fgColor else None
                if cell.data_type == 'f':
                    got_formulas += 1
    ok = got_sheets == expect_sheets and got_merges == expect_merges and got_formulas == expect_formulas
    if not ok:
        failures += 1
        print('MISMATCH %s: sheets %d/%d merges %d/%d formulas %d/%d' % (
            code, got_sheets, expect_sheets, got_merges, expect_merges, got_formulas, expect_formulas))
    grand['sheets'] += got_sheets
    grand['merges'] += got_merges
    grand['formulas'] += got_formulas
    wb.close()

print('全库回读: sheets=%d merges=%d formulas=%d, 逐文件一致' % (grand['sheets'], grand['merges'], grand['formulas']))

# ── 抽查 BB.1.4 ──
wb = load_workbook(os.path.join(BASE, 'BB.1.4.xlsx'), data_only=False)
ws = wb.worksheets[0]
print('\n[BB.1.4] sheet=%r 合并数=%d' % (ws.title, len(ws.merged_cells.ranges)))
a3 = ws['A3']
print('[BB.1.4] A3 值=%r' % a3.value)
a1 = ws['A1']
fill_rgb = a1.fill.fgColor.rgb if a1.fill and a1.fill.fgColor else None
font_rgb = a1.font.color.rgb if a1.font and a1.font.color else None
print('[BB.1.4] A1 fill=%s bold=%s font_color=%s' % (fill_rgb, a1.font.bold, font_rgb))
ok_bb14 = (a3.value == '高功率光纤激光切割机整机系统'
           and fill_rgb in ('002F6C', 'FF002F6C', '00002F6C')
           and font_rgb in ('FFFFFFFF', 'FFFFFF', '00FFFFFF')
           and a1.font.bold)
print('[BB.1.4] 关键断言: %s' % ('PASS' if ok_bb14 else 'FAIL'))
if not ok_bb14:
    failures += 1
wb.close()

# ── 抽查 BAA.11（5 行示例；序号列已跳过 → A 列=内部交易类型）──
wb = load_workbook(os.path.join(BASE, 'BAA.11.xlsx'), data_only=False)
ws = wb.worksheets[0]
print('\n[BAA.11] sheet=%r 尺寸=%s' % (ws.title, ws.dimensions))
types = [ws.cell(row=r, column=1).value for r in range(2, 8)]
types = [t for t in types if t is not None and str(t).strip() != '']
print('[BAA.11] 内部交易类型列: %r' % types)
expect_types = ['代采购物料', '代采购资产', '内部销售', '内部职场租赁', '资产转卖']
ok_baa11 = types == expect_types
print('[BAA.11] 5 行示例断言: %s' % ('PASS' if ok_baa11 else 'FAIL'))
if not ok_baa11:
    failures += 1
# 序号列不得残留：B 列（内部交易类型）应为第 1 列，且表头 A1=内部交易类型
print('[BAA.11] A1=%r 列数=%d' % (ws['A1'].value, ws.max_column))
wb.close()

print('\n总体: %s' % ('PASS' if failures == 0 else 'FAIL (%d 项)' % failures))
sys.exit(0 if failures == 0 else 1)
