#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""临时验证：渲染 png 的像素颜色分布统计（白底 / 深蓝表头 / 黑字像素证据）。"""
import sys
from collections import Counter

from PIL import Image

def analyze(path, label):
    img = Image.open(path).convert('RGBA')
    white_bg = Image.new('RGBA', img.size, (255, 255, 255, 255))
    comp = Image.alpha_composite(white_bg, img).convert('RGB')
    w, h = comp.size
    px = list(comp.getdata())
    total = len(px)
    cnt = Counter(px)

    def near(color, tol):
        r0, g0, b0 = color
        return sum(n for (r, g, b), n in cnt.items()
                   if abs(r - r0) <= tol and abs(g - g0) <= tol and abs(b - b0) <= tol)

    white = near((255, 255, 255), 6)
    dark_blue = near((0, 47, 108), 24)      # #002F6C 表头深蓝
    other_blue = near((0, 30, 74), 24)      # #001E4A 合计深蓝
    gray_blue = near((71, 85, 105), 24)     # #475569 只读列
    amber = near((180, 83, 9), 30)          # #B45309 可修改列
    black = near((0, 0, 0), 40)
    near_black = sum(n for (r, g, b), n in cnt.items() if r < 80 and g < 80 and b < 80)
    very_dark = near_black
    overall_dark = sum(n for (r, g, b), n in cnt.items() if (r + g + b) / 3 < 60)

    print('\n=== %s === (%s, %dx%d, %d px)' % (label, path, w, h, total))
    print('top 10 colors:')
    for color, n in cnt.most_common(10):
        pct = n * 100.0 / total
        print('  #%02X%02X%02X  %d px (%.2f%%)' % (color[0], color[1], color[2], n, pct))
    print('白色(±6): %d px (%.2f%%)' % (white, white * 100.0 / total))
    print('深蓝表头 #002F6C(±24): %d px (%.2f%%)' % (dark_blue, dark_blue * 100.0 / total))
    print('深蓝合计 #001E4A(±24): %d px (%.2f%%)' % (other_blue, other_blue * 100.0 / total))
    print('灰蓝只读 #475569(±24): %d px (%.2f%%)' % (gray_blue, gray_blue * 100.0 / total))
    print('琥珀可改 #B45309(±30): %d px (%.2f%%)' % (amber, amber * 100.0 / total))
    print('黑色(±40): %d px (%.2f%%)' % (black, black * 100.0 / total))
    print('近黑(RGB<80): %d px (%.2f%%)' % (near_black, near_black * 100.0 / total))
    print('整图平均亮度<60 的像素: %d px (%.2f%%)' % (overall_dark, overall_dark * 100.0 / total))

    ok = (white > total * 0.35 and dark_blue > total * 0.01 and black > 200
          and overall_dark < total * 0.25)
    print('判定: %s (白底%.2f%% 深蓝%.2f%% 黑字%dpx 暗像素%.2f%%)' % (
        'PASS' if ok else 'FAIL', white * 100.0 / total, dark_blue * 100.0 / total, black, overall_dark * 100.0 / total))
    return ok

a = analyze(r'D:\budgetdemo\.tmp_render\bb14\page-0001.png', 'BB.1.4')
b = analyze(r'D:\budgetdemo\.tmp_render\bb11\page-0001.png', 'BB.1.1')
sys.exit(0 if (a and b) else 1)
