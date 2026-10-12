# BB.3.X 进销存预算

<style>
table{border-collapse:collapse;font-size:12px;font-family:"Microsoft YaHei",Arial,sans-serif}
table th{background:#002f6c;color:#fff;font-weight:600;text-align:center;border:1px solid #cbd5e1;padding:6px 10px;white-space:nowrap}
table td{border:1px solid #cbd5e1;padding:6px 10px;vertical-align:top}
.t3a-html-sheet th,.t3a-html-sheet td{white-space:nowrap}
.t3a-html-sheet th.t3a-th--time{background:#001e4a}
.t3a-html-sheet td.t3a-num{text-align:right}
.t3a-html-sheet tbody tr:nth-child(2n){background:#f8fafc}
.t3a-sheet-scroll{max-width:100%;overflow-x:auto;transform:rotateX(180deg)}
.t3a-sheet-scroll > table.t3a-html-sheet{transform:rotateX(180deg)}
.t3a-html-sheet{display:block;width:max-content}
.t3a-sheet-scroll::-webkit-scrollbar{height:10px}
.t3a-sheet-scroll::-webkit-scrollbar-track{background:#eef2f7}
.t3a-sheet-scroll::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:5px}
.t3a-html-sheet::-webkit-scrollbar{height:10px}
.t3a-html-sheet::-webkit-scrollbar-track{background:#eef2f7}
.t3a-html-sheet::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:5px}
</style>

## ① 预算表样

### BB.3.X 进销存预算

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th" rowspan="2">法人公司</th>
      <th class="t3a-th" rowspan="2">存货类别</th>
      <th class="t3a-th" rowspan="2">年初余额</th>
      <th class="t3a-th" colspan="4">1月</th>
      <th class="t3a-th" colspan="4">2月</th>
      <th class="t3a-th" colspan="4">3月</th>
      <th class="t3a-th" colspan="4">4月</th>
      <th class="t3a-th" colspan="4">5月</th>
      <th class="t3a-th" colspan="4">6月</th>
      <th class="t3a-th" colspan="4">7月</th>
      <th class="t3a-th" colspan="4">8月</th>
      <th class="t3a-th" colspan="4">9月</th>
      <th class="t3a-th" colspan="4">10月</th>
      <th class="t3a-th" colspan="4">11月</th>
      <th class="t3a-th" colspan="4">12月</th>
      <th class="t3a-th t3a-th--time" rowspan="2">年末余额</th>
      <th class="t3a-th" rowspan="2">其中:内部加成-年初</th>
      <th class="t3a-th" rowspan="2">其中:内部加成-本年新增</th>
      <th class="t3a-th" rowspan="2">其中:内部加成-本年实现</th>
      <th class="t3a-th" rowspan="2">其中:内部加成-年末</th>
    </tr>
    <tr>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
      <th class="t3a-th">期初数</th>
      <th class="t3a-th">转入数</th>
      <th class="t3a-th">转出数</th>
      <th class="t3a-th">期末数</th>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>在制品</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>产成品</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">5.2</td>
      <td class="t3a-num">5.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">4.3</td>
      <td class="t3a-num">4.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>生产物料</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>研发物料</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>服务物料</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>专项储备</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>其他物料</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>甜甜圈集团公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">-0.3</td>
      <td class="t3a-num">-0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">-1.2</td>
      <td class="t3a-num">-1.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">-2.1</td>
      <td class="t3a-num">-2.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">-3.9</td>
      <td class="t3a-num">-3.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">-4.5</td>
      <td class="t3a-num">-4.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">-5.1</td>
      <td class="t3a-num">-5.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-5.4</td>
      <td class="t3a-num">-5.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-5.7</td>
      <td class="t3a-num">-5.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-6.0</td>
      <td class="t3a-num">-6.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>在制品</td>
      <td class="t3a-num">16.5</td>
      <td class="t3a-num">16.5</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">16.7</td>
      <td class="t3a-num">16.7</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">17.1</td>
      <td class="t3a-num">17.1</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">17.1</td>
      <td class="t3a-num">17.1</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">17.3</td>
      <td class="t3a-num">17.3</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">17.3</td>
      <td class="t3a-num">17.3</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">17.7</td>
      <td class="t3a-num">17.7</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">17.5</td>
      <td class="t3a-num">17.5</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">17.7</td>
      <td class="t3a-num">17.7</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">17.9</td>
      <td class="t3a-num">17.9</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">17.9</td>
      <td class="t3a-num">17.9</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">18.1</td>
      <td class="t3a-num">18.1</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">18.1</td>
      <td class="t3a-num">18.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>产成品</td>
      <td class="t3a-num">19.8</td>
      <td class="t3a-num">19.8</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">19.1</td>
      <td class="t3a-num">19.1</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">18.3</td>
      <td class="t3a-num">18.3</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">17.4</td>
      <td class="t3a-num">17.4</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">16.6</td>
      <td class="t3a-num">16.6</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">15.7</td>
      <td class="t3a-num">15.7</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">15.3</td>
      <td class="t3a-num">15.3</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">14.7</td>
      <td class="t3a-num">14.7</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">13.8</td>
      <td class="t3a-num">13.8</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">13.4</td>
      <td class="t3a-num">13.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">12.8</td>
      <td class="t3a-num">12.8</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">12.4</td>
      <td class="t3a-num">12.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">12.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>生产物料</td>
      <td class="t3a-num">5.5</td>
      <td class="t3a-num">5.5</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">5.9</td>
      <td class="t3a-num">5.9</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">6.7</td>
      <td class="t3a-num">6.7</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">7.1</td>
      <td class="t3a-num">7.1</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">7.5</td>
      <td class="t3a-num">7.5</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">7.9</td>
      <td class="t3a-num">7.9</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">8.3</td>
      <td class="t3a-num">8.3</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">8.7</td>
      <td class="t3a-num">8.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">9.1</td>
      <td class="t3a-num">9.1</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">9.5</td>
      <td class="t3a-num">9.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">9.9</td>
      <td class="t3a-num">9.9</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">10.3</td>
      <td class="t3a-num">10.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>研发物料</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>服务物料</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>专项储备</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">7.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.4</td>
      <td class="t3a-num">7.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.4</td>
      <td class="t3a-num">7.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.4</td>
      <td class="t3a-num">7.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">8.6</td>
      <td class="t3a-num">8.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>其他物料</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>草莓慕斯公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">4.4</td>
      <td class="t3a-num">4.4</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">4.4</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">4.4</td>
      <td class="t3a-num">-1.1</td>
      <td class="t3a-num">-1.1</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">5.5</td>
      <td class="t3a-num">-4.4</td>
      <td class="t3a-num">-4.4</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">5.5</td>
      <td class="t3a-num">-7.7</td>
      <td class="t3a-num">-7.7</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">-11.0</td>
      <td class="t3a-num">-11.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">-14.3</td>
      <td class="t3a-num">-14.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">-16.5</td>
      <td class="t3a-num">-16.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">-18.7</td>
      <td class="t3a-num">-18.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">-19.8</td>
      <td class="t3a-num">-19.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">-20.9</td>
      <td class="t3a-num">-20.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">-22.0</td>
      <td class="t3a-num">-22.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>在制品</td>
      <td class="t3a-num">13.5</td>
      <td class="t3a-num">13.5</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">13.7</td>
      <td class="t3a-num">13.7</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">14.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">14.1</td>
      <td class="t3a-num">14.1</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">14.1</td>
      <td class="t3a-num">14.1</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">14.5</td>
      <td class="t3a-num">14.5</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">14.4</td>
      <td class="t3a-num">14.4</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">14.6</td>
      <td class="t3a-num">14.6</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">14.8</td>
      <td class="t3a-num">14.8</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">14.8</td>
      <td class="t3a-num">14.8</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">14.9</td>
      <td class="t3a-num">14.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">14.9</td>
      <td class="t3a-num">14.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">2.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>产成品</td>
      <td class="t3a-num">16.2</td>
      <td class="t3a-num">16.2</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">15.6</td>
      <td class="t3a-num">15.6</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">14.9</td>
      <td class="t3a-num">14.9</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">14.2</td>
      <td class="t3a-num">14.2</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">13.5</td>
      <td class="t3a-num">13.5</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">12.7</td>
      <td class="t3a-num">12.7</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">12.3</td>
      <td class="t3a-num">12.3</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">11.7</td>
      <td class="t3a-num">11.7</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">10.9</td>
      <td class="t3a-num">10.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">10.5</td>
      <td class="t3a-num">10.5</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">9.9</td>
      <td class="t3a-num">9.9</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">9.6</td>
      <td class="t3a-num">9.6</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">9.2</td>
      <td class="t3a-num">9.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>生产物料</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">5.2</td>
      <td class="t3a-num">5.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">5.6</td>
      <td class="t3a-num">5.6</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">5.9</td>
      <td class="t3a-num">5.9</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">7.2</td>
      <td class="t3a-num">7.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">7.6</td>
      <td class="t3a-num">7.6</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">7.9</td>
      <td class="t3a-num">7.9</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">8.5</td>
      <td class="t3a-num">8.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>研发物料</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>服务物料</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>专项储备</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">5.7</td>
      <td class="t3a-num">5.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">5.7</td>
      <td class="t3a-num">5.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>其他物料</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蓝莓蛋挞公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">-0.9</td>
      <td class="t3a-num">-0.9</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">-6.3</td>
      <td class="t3a-num">-6.3</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">-9.0</td>
      <td class="t3a-num">-9.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">-11.7</td>
      <td class="t3a-num">-11.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">-13.5</td>
      <td class="t3a-num">-13.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">-15.3</td>
      <td class="t3a-num">-15.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">-16.2</td>
      <td class="t3a-num">-16.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">-17.1</td>
      <td class="t3a-num">-17.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">-18.0</td>
      <td class="t3a-num">-18.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>在制品</td>
      <td class="t3a-num">7.5</td>
      <td class="t3a-num">7.5</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">7.6</td>
      <td class="t3a-num">7.6</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">7.9</td>
      <td class="t3a-num">7.9</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">7.9</td>
      <td class="t3a-num">7.9</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">8.1</td>
      <td class="t3a-num">8.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">8.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">8.1</td>
      <td class="t3a-num">8.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">8.2</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">8.3</td>
      <td class="t3a-num">8.3</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">8.3</td>
      <td class="t3a-num">8.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>产成品</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">9.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">8.7</td>
      <td class="t3a-num">8.7</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">8.3</td>
      <td class="t3a-num">8.3</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">7.9</td>
      <td class="t3a-num">7.9</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">7.5</td>
      <td class="t3a-num">7.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">7.1</td>
      <td class="t3a-num">7.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">5.7</td>
      <td class="t3a-num">5.7</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">5.5</td>
      <td class="t3a-num">5.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">5.3</td>
      <td class="t3a-num">5.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>生产物料</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.3</td>
      <td class="t3a-num">4.3</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>研发物料</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>服务物料</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>专项储备</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>其他物料</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>芒果班戟公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">-0.5</td>
      <td class="t3a-num">-0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">-2.0</td>
      <td class="t3a-num">-2.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">-3.5</td>
      <td class="t3a-num">-3.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">-5.0</td>
      <td class="t3a-num">-5.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">-6.5</td>
      <td class="t3a-num">-6.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">-7.5</td>
      <td class="t3a-num">-7.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">-8.5</td>
      <td class="t3a-num">-8.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">-9.0</td>
      <td class="t3a-num">-9.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">-9.5</td>
      <td class="t3a-num">-9.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">-10.0</td>
      <td class="t3a-num">-10.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>在制品</td>
      <td class="t3a-num">6.7</td>
      <td class="t3a-num">6.7</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">6.8</td>
      <td class="t3a-num">6.8</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">7.1</td>
      <td class="t3a-num">7.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">7.1</td>
      <td class="t3a-num">7.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">7.2</td>
      <td class="t3a-num">7.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">7.3</td>
      <td class="t3a-num">7.3</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">7.3</td>
      <td class="t3a-num">7.3</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">7.3</td>
      <td class="t3a-num">7.3</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">7.3</td>
      <td class="t3a-num">7.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">1.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>产成品</td>
      <td class="t3a-num">8.1</td>
      <td class="t3a-num">8.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">7.8</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">7.5</td>
      <td class="t3a-num">7.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">7.1</td>
      <td class="t3a-num">7.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">6.8</td>
      <td class="t3a-num">6.8</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">6.4</td>
      <td class="t3a-num">6.4</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">5.9</td>
      <td class="t3a-num">5.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">5.5</td>
      <td class="t3a-num">5.5</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">5.3</td>
      <td class="t3a-num">5.3</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>生产物料</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">4.4</td>
      <td class="t3a-num">4.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>研发物料</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>服务物料</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>专项储备</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>其他物料</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>西瓜泡芙公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">-0.4</td>
      <td class="t3a-num">-0.4</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">-1.7</td>
      <td class="t3a-num">-1.7</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">-4.4</td>
      <td class="t3a-num">-4.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">-5.7</td>
      <td class="t3a-num">-5.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">-6.6</td>
      <td class="t3a-num">-6.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">-7.5</td>
      <td class="t3a-num">-7.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">-7.9</td>
      <td class="t3a-num">-7.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">-8.3</td>
      <td class="t3a-num">-8.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">-8.7</td>
      <td class="t3a-num">-8.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>在制品</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">6.1</td>
      <td class="t3a-num">6.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">6.2</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">6.4</td>
      <td class="t3a-num">6.4</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">6.4</td>
      <td class="t3a-num">6.4</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">6.5</td>
      <td class="t3a-num">6.5</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>产成品</td>
      <td class="t3a-num">7.2</td>
      <td class="t3a-num">7.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">6.9</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">6.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">6.3</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">6.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">5.6</td>
      <td class="t3a-num">5.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">5.1</td>
      <td class="t3a-num">5.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>生产物料</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>研发物料</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>服务物料</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>专项储备</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>其他物料</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>抹茶曲奇公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">-0.4</td>
      <td class="t3a-num">-0.4</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">-1.6</td>
      <td class="t3a-num">-1.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">-2.8</td>
      <td class="t3a-num">-2.8</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">-4.0</td>
      <td class="t3a-num">-4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">-5.2</td>
      <td class="t3a-num">-5.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">-6.0</td>
      <td class="t3a-num">-6.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">-6.8</td>
      <td class="t3a-num">-6.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">-7.2</td>
      <td class="t3a-num">-7.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">-7.6</td>
      <td class="t3a-num">-7.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">-8.0</td>
      <td class="t3a-num">-8.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>在制品</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">4.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">4.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.7</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>产成品</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">5.4</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">5.2</td>
      <td class="t3a-num">5.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">5.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">4.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">4.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">4.3</td>
      <td class="t3a-num">4.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>生产物料</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>研发物料</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>服务物料</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>专项储备</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>其他物料</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>樱桃华夫公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">-0.3</td>
      <td class="t3a-num">-0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">-1.2</td>
      <td class="t3a-num">-1.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">-2.1</td>
      <td class="t3a-num">-2.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">-3.9</td>
      <td class="t3a-num">-3.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">-4.5</td>
      <td class="t3a-num">-4.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">-5.1</td>
      <td class="t3a-num">-5.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-5.4</td>
      <td class="t3a-num">-5.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-5.7</td>
      <td class="t3a-num">-5.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-6.0</td>
      <td class="t3a-num">-6.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>在制品</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>产成品</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.4</td>
      <td class="t3a-num">4.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>生产物料</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>研发物料</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>服务物料</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>专项储备</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>其他物料</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>椰香可露丽公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">-0.2</td>
      <td class="t3a-num">-0.2</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">-0.9</td>
      <td class="t3a-num">-0.9</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">-1.6</td>
      <td class="t3a-num">-1.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">-2.4</td>
      <td class="t3a-num">-2.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">-3.1</td>
      <td class="t3a-num">-3.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">-4.1</td>
      <td class="t3a-num">-4.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-4.3</td>
      <td class="t3a-num">-4.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-4.5</td>
      <td class="t3a-num">-4.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-4.7</td>
      <td class="t3a-num">-4.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>在制品</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">3.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>产成品</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">4.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.4</td>
      <td class="t3a-num">4.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">4.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">4.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">3.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">3.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>生产物料</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>研发物料</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>服务物料</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>专项储备</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">1.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">2.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>其他物料</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>海盐芝士公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">-0.2</td>
      <td class="t3a-num">-0.2</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">-0.9</td>
      <td class="t3a-num">-0.9</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">-1.6</td>
      <td class="t3a-num">-1.6</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">1.5</td>
      <td class="t3a-num">-2.4</td>
      <td class="t3a-num">-2.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">-3.1</td>
      <td class="t3a-num">-3.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">-4.1</td>
      <td class="t3a-num">-4.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-4.3</td>
      <td class="t3a-num">-4.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-4.5</td>
      <td class="t3a-num">-4.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-4.7</td>
      <td class="t3a-num">-4.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>在制品</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>产成品</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>生产物料</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>研发物料</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>服务物料</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>专项储备</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>其他物料</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>蜜桃千层公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">-0.2</td>
      <td class="t3a-num">-0.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">-0.8</td>
      <td class="t3a-num">-0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">-1.4</td>
      <td class="t3a-num">-1.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">-2.0</td>
      <td class="t3a-num">-2.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">-2.6</td>
      <td class="t3a-num">-2.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">-3.4</td>
      <td class="t3a-num">-3.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-3.8</td>
      <td class="t3a-num">-3.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-4.0</td>
      <td class="t3a-num">-4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>在制品</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">3.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.2</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.0</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.4</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>产成品</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">3.1</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>生产物料</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>研发物料</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>服务物料</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>专项储备</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>其他物料</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>香橙舒芙蕾公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">-0.2</td>
      <td class="t3a-num">-0.2</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">-0.8</td>
      <td class="t3a-num">-0.8</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">-1.4</td>
      <td class="t3a-num">-1.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">-2.0</td>
      <td class="t3a-num">-2.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">-2.6</td>
      <td class="t3a-num">-2.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">-3.4</td>
      <td class="t3a-num">-3.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-3.8</td>
      <td class="t3a-num">-3.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">-4.0</td>
      <td class="t3a-num">-4.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>在制品</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">3.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">3.0</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">2.8</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>　　料</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>　　工</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>　　费</td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.5</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.6</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>　　结转</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.8</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.3</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="t3a-num">0.9</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>产成品</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">2.7</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">2.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">1.8</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">2.2</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">2.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>生产物料</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">1.3</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">1.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">2.1</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">2.5</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">3.3</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">3.7</td>
      <td class="t3a-num">0.7</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">4.1</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>研发物料</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>服务物料</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.8</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">1.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">1.1</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">1.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>专项储备</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">1.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">1.9</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">2.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">2.9</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">3.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>其他物料</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.4</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.2</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
    <tr>
      <td>青提马卡龙公司</td>
      <td>自制设备用料</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">-0.0</td>
      <td class="t3a-num">-0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">-0.3</td>
      <td class="t3a-num">-0.3</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">-0.9</td>
      <td class="t3a-num">-0.9</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">-1.5</td>
      <td class="t3a-num">-1.5</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">0.9</td>
      <td class="t3a-num">-1.8</td>
      <td class="t3a-num">-1.8</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.6</td>
      <td class="t3a-num">-2.4</td>
      <td class="t3a-num">-2.4</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-2.7</td>
      <td class="t3a-num">-2.7</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">-3.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-3.3</td>
      <td class="t3a-num">-3.3</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">-3.6</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.3</td>
      <td class="t3a-num">-3.9</td>
      <td class="t3a-num">-3.9</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
      <td class="t3a-num">0.0</td>
    </tr>
  </tbody>
</table>
</div>

### BB.3.X.b 转入转出逻辑明细表

<div class="t3a-sheet-scroll">
<table class="t3a-html-sheet">
  <tbody>
    <tr>
      <th class="t3a-th">存货品类</th>
      <th class="t3a-th">方向</th>
      <th class="t3a-th">数据来源 / 去向</th>
      <th class="t3a-th">处理规则（口径）</th>
    </tr>
    <tr>
      <td>生产物料</td>
      <td>转入</td>
      <td>BB.3.3.C「到货额」arrivalAmount（物料类别=生产物料，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +（到货额为含加成完整转移价、加成随存货入账，不另记 6602）</td>
      <td>采购入库，按 AB.9（IMC-01 生产物料）归集，随到货自动关联；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>生产物料</td>
      <td>转出</td>
      <td>取同一法人在制品「料」转入数（生产物料转出 = 在制品料转入） + 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）</td>
      <td>生产领料形态转换：直接取自在制品「料」行手工录入的转入数，生产物料转出对应在制品料投入；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>研发物料</td>
      <td>转入</td>
      <td>BB.3.3.C「到货额」arrivalAmount（物料类别=研发物料，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +（到货额为含加成完整转移价、加成随存货入账，不另记 6602）</td>
      <td>采购入库，按 AB.9（IMC-02 研发物料）归集；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>研发物料</td>
      <td>转出</td>
      <td>BAP.2「月度消耗金额」monthlyAmount（领料用途=研发类、物料类别=研发物料）→ 6603 研发费用 + 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）</td>
      <td>研发试制/测试验证/实验开发消耗；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>服务物料</td>
      <td>转入</td>
      <td>BB.3.3.C「到货额」arrivalAmount（物料类别=服务物料，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +（到货额为含加成完整转移价、加成随存货入账，不另记 6602） + 销售线物料明细内部供应商真实购销转入（BB.1.3.f 物料明细_财务查询 中「内部供应商」非空且≠签约主体的物料行：签约主体单体按采购价＝出库成本+加成款采购入库，加成进成本不走 6602，集团合并层抵销内部购销与加成利润、只保留原始出库成本）</td>
      <td>采购入库，按 AB.9（IMC-03 服务物料）归集；内部交易在集团合并层抵销、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>服务物料</td>
      <td>转出</td>
      <td>BB.1.3.d/f「serviceMaterials.monthlyCosts 成本」（服务物料明细）→ 640103 主营业务成本（法人落点=签约主体）+ 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +） + 销售线物料明细内部供应商出库转出（BB.1.3.d/.f 物料明细「内部供应商」非空且≠签约主体的物料行：提供方（内部供应商归属法人）侧按原始出库成本出库转出 −，确认 6001.2 收入与 6401.2 成本；签约主体单体采购价含加成并随服务消耗进 6401.1）</td>
      <td>售后维保/交付调试/客户现场技术支持消耗；单体公司层面按业务本质处理，集团合并层抵销内部购销与加成利润，只保留提供方真实出库成本</td>
    </tr>
    <tr>
      <td>专项储备</td>
      <td>转入</td>
      <td>BB.3.3.C「到货额」arrivalAmount（物料类别=专项储备，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +（到货额为含加成完整转移价、加成随存货入账，不另记 6602）</td>
      <td>采购入库，按 AB.9（IMC-04 专项储备）归集；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>专项储备</td>
      <td>转出</td>
      <td>本表「转出数」列手工录入（手工调整，大类=专项储备） + 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）</td>
      <td>应急调拨/定期报废，战略保供/长周期关键件/应急安全库存，日常不轻易出库；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>其他物料</td>
      <td>转入</td>
      <td>BB.3.3.C「到货额」arrivalAmount（物料类别=其他物料，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +（到货额为含加成完整转移价、加成随存货入账，不另记 6602）</td>
      <td>采购入库，按 AB.9（IMC-05 其他物料）归集；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>其他物料</td>
      <td>转出</td>
      <td>BAP.2「月度消耗金额」monthlyAmount（领料用途=销售类/管理类及其他、物料类别=其他物料）→ 6601 销售费用 / 6602 管理费用 + 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）</td>
      <td>行政办公/仓储包装/厂务运维及零星杂项通用物料；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>自制设备用料</td>
      <td>转入</td>
      <td>BB.3.3.C「到货额」arrivalAmount（物料类别=自制设备用料，按法人） + 代采购物料平价转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧平价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +（到货额为含加成完整转移价、加成随存货入账，不另记 6602）</td>
      <td>采购入库，按 AB.9（IMC-06 自制设备用料）归集；代采购物料平价转入为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>自制设备用料</td>
      <td>转出</td>
      <td>BB.4.1.c「月度领料金额」monthlyAmount → 1604 在建工程 + 代采购物料平价转出（BB.3.3.D 下单主体法人侧转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）</td>
      <td>自制设备/自制在建工程建造装配专用，转固后按 AA.9 参数计提折旧；代采购物料平价转出为集团内平价转移，集团合并层抵消、不改变集团合并层存货净额</td>
    </tr>
    <tr>
      <td>在制品-料</td>
      <td>转入</td>
      <td>本表手工填写（无前置收集表，根据生产计划填报投料成本）</td>
      <td>在制品成本「料」小类：无前置物料消耗收集表，由编制人员在在制品「料」行直接手工录入；其金额同时自动驱动生产物料的转出数</td>
    </tr>
    <tr>
      <td>在制品-工</td>
      <td>转入</td>
      <td>BB.5.1「制造费用」mfgExpense（按法人）</td>
      <td>在制品成本「工」小类，直接人工</td>
    </tr>
    <tr>
      <td>在制品-费</td>
      <td>转入</td>
      <td>BB.5.2「制造费用」mfgExpense + BB.4.X.A「制造费用折旧」小计（按法人，含存量、本年新增与使用权资产折旧）</td>
      <td>在制品成本「费」小类，制造费用（含折旧：固定资产/无形资产折旧 + 使用权资产折旧）；折旧唯一入口=BB.4.5 增量资产折旧计算表（使用权资产与其它新增资产同链路）/BB.4.X.A 折旧小计，各来源不重叠取数、全链只取一次，与 BB.5.2 不得重叠取数</td>
    </tr>
    <tr>
      <td>在制品-结转</td>
      <td>转出</td>
      <td>BB.2.1「月度产量」monthlyProduction × BAA.2「标准成本」standardCost</td>
      <td>完工生产成本，同一法人内转出至产成品（14xx 存货总额不变）</td>
    </tr>
    <tr>
      <td>产成品</td>
      <td>转入</td>
      <td>在制品「结转」转出（同一笔完工入库）</td>
      <td>完工入库增加产成品（14xx 存货总额不变）</td>
    </tr>
    <tr>
      <td>产成品</td>
      <td>转出</td>
      <td>BB.1.2.c「预计销售成本」monthlyCost（对外销售，法人=签约主体）</td>
      <td>随对外销售成本结转（驱动主营业务成本硬件直接材料）</td>
    </tr>
    <tr>
      <td>各品类（手工调整）</td>
      <td>转入/转出</td>
      <td>本表「转入数」/「转出数」列手工录入（手工调整，按本表法人与存货类别行直接填列）</td>
      <td>盘盈/盘亏/报废、跨期补记等手工调整，作为各品类转入/转出的补充调整来源（与自动取数互斥、不重复计）</td>
    </tr>
  </tbody>
</table>
</div>

## 表概述

【是什么】全集团存货进销存汇总表。按法人展开原材料、在制品（料工费结转）和产成品，表尾单独跟踪内部加成变动。
【谁填】各子公司成本会计录入年初余额和手工出入库调整；月度期初、采购入库、完工入库、销售出库和期末结存由系统自动计算。
【怎么填】按“法人公司 × 存货类别”逐行展开；采购入库取自采购表，完工入库取自产量与标准成本；原材料代采购加成由 BB.3.3.D 自动滚入表尾加成列。
【系统怎么处理】单体公司内在制品料工费结转产成品；跨法人代采购的物料按完整价入库，加成额在表尾内部加成列按月滚动。
【合并时】合并引擎读取各法人期末内部加成余额变动，冲减合并存货原值与营业成本，还原为最初对外采购成本。

## ② 字段与值说明

| 字段 | 来源 | 说明 |
| :--- | :--- | :--- |
| 法人公司 | AA.2 法人组织架构 | 维度列最左；一行=法人公司×存货类别（平表一表到底，无分组行、无自动合计行）；集团口径=各法人同品类同月加总，本表不设自动合计行 |
| 存货类别 | AB.9 存货物料类别字典 | 大类+小类；大类含系统固定枚举（在制品/产成品），在制品为汇总行、下按料/工/费/结转拆小类 |
| 年初余额 | 本表录入 | 按「法人公司×存货类别」逐行手工一次性填报，作为1月期初数的取数基础 |
| 月度期初数 | 本表公式 | 1月=年初余额；2~12月=同一法人同一品类上月期末数（滚动结转） |
| 月度转入数 | BB.3.3.C各法人到货额 / BB.3.3.D代采购物料内部转入（含加成）/ BB.2.1法人产量×BAA.2 / 在制品「料」手工填报 / BB.5.1·BB.5.2·BB.4.X.A / 本表录入（手工调整） | 逐来源按法人取数、不按比例拆分（BAA.10 不参与）：采购入库=BB.3.3.C 各法人到货额 + 物料类存货另含代采购物料内部转入（BB.3.3.D 下单主体法人侧转出、受益主体法人侧按含加成完整价转入，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）；加成部分单独在本表 internalTransferIn 列跟踪，未对外销售/领用前挂账为合并层未实现利润，由 BO.ELIM 第④类抵销；产成品转入=同一法人在制品「结转」转出（BB.2.1 法人产量×BAA.2 标准成本）；在制品「料」无前置物料消耗收集表，转入数直接在在制品「料」行手工填报；在制品「工」=BB.5.1 制造费用（法人）、「费」=BB.5.2+BB.4.X.A 制造费用与折旧（法人）；其他出入库调整（盘盈/盘亏/报废/跨期补记等）=本表「转入数」列手工录入（手工调整项） |
| 月度转出数 | BB.1.2财务视角销售成本（含已实现加成）/ BB.3.3.D代采购物料内部转出 / 同一法人在制品「料」转入数 / BAP.2非生产类领料 / 本表录入（手工调整） | 产成品转出=BB.1.2 财务视角对外销售成本（法人归属按订单/合同所属法人=签约主体）；服务物料/备品备件转出=BB.1.3 服务物料明细成本（对外销售消耗）；物料类存货转出另含代采购物料内部转出（BB.3.3.D 下单主体法人侧按到货额（平价）转出，按 BB.3.3.D.物料类别 对应到 BB.3.X 同类别行：下单主体法人该类别转出 − / 受益主体法人同类别转入 +）——与受益主体法人侧内部转入（按含加成完整价）配对，单体层面加成随销售成本/领料实现，合并层由 BO.ELIM 抵销；在制品「结转」转出=同一法人完工生产成本结转（14xx 存货总额不变，跨法人代工/调拨走 BJ.C 关联交易与内部抵销）；生产物料转出数直接取自同一法人在制品「料」的转入数（生产物料转出 = 在制品料转入，形态转换）；非生产类物料转出=BAP.2（研发/销售/管理领料按法人取数）；其他出入库调整（盘盈/盘亏/报废、跨期补记等）在本表「转出数」列直接手工录入（手工调整项，与自动取数互斥、不重复计） |
| 月度期末数 | 本表公式 | =期初数+转入数−转出数 |
| 年末余额 | 本表公式 | =12月期末数；期末存货按法人公司列示，各法人加总=集团存货列报 |
| 其中:内部加成-期初 | 本表录入/本表公式 | 1月=年初内部加成余额（手工录入上年末数）；2~12月=上月internalClosing；本列单独记录本法人本类别存货中含的集团内部加成利润，不随外部采购波动 |
| 其中:内部加成-本月转入 | BB.3.3.D 代采购物料加成款 | 本月因内部代采购入库而新增的加成利润；按 BB.3.3.D 当月加成款（monthlyMarkupFee）同法人×物料类别归集；外部采购无加成、本列为0 |
| 其中:内部加成-本月转出 | BB.1.2.c/BB.1.3.f 对外销售成本含加成 + BAP.2 领料含加成 | 本月因对外销售/生产领料/研发领料而实现的内部加成利润；按对外销售成本与领料金额×该类别内部加成率估算（加成率=internalClosing÷monthlyClosing 移动加权）；盘亏报废等手工调整在本表 internalTransferOut 手工补记 |
| 其中:内部加成-期末 | 本表公式 | =internalOpening+internalTransferIn−internalTransferOut；本月数即合并 BS 应抵销的存货中未实现内部利润（贡献给 BO.ELIM 第④类） |
| 其中:内部加成-年末余额 | 本表公式 | =12月 internalClosing；供 BO.ELIM 第④类抵销与 BO.BS 存货合并口径核对 |

## ③ 关键规则要点

**BB.3.X 进销存预算**

- 本表为法人级单表（一表到底）：维度=法人公司×存货类别，一行=法人公司×存货类别，平表结构（法人公司与存货类别为前两个维度列，无分组行、无自动合计行）；不再保留「集团口径主表 + 按比例拆到法人」的两层结构，原「分法人进销存预算」Tab（按比例拆分的结果表）已取消，BAA.10 不再参与本表拆分。
- 维度与品类：存货类别=大类+小类；品类拆分为：在制品（下设料/工/费/结转4个小类）、产成品、生产物料、研发物料、服务物料、专项储备、其他物料、自制设备用料；列结构=法人公司/存货类别/年初余额 + 1~12月（每月 期初数/转入数/转出数/期末数）+ 年末余额，共 52 列（在原集团口径主表 51 列基础上最左侧增加「法人公司」列）。
- 度量口径：年初余额（按「法人公司×存货类别」手工一次性填报）、月度期初数（公式，1月=年初余额，2~12月=同一法人同一品类上月期末数滚动）、月度转入数/转出数（系统带出）、月度期末数（公式=期初数+转入数−转出数）、年末余额（公式=12月期末数）。
- 【各来源法人取数口径】各品类的转入/转出逐来源按法人取数、不乘比例：采购入库=BB.3.3.C 财务视角各法人到货额（按 AB.9 类别转入各物料大类对应法人行）；完工入库=BB.2.1 法人产量×BAA.2 标准成本（产成品转入=同一法人在制品「结转」转出）；在制品「料」无前置物料消耗收集表，转入数直接在在制品「料」行手工填写；生产物料转出数直接取自该转入数（同一法人：生产物料转出 = 在制品料转入，形态转换）、「工」=BB.5.1 制造费用（法人）、「费」=BB.5.2 制造费用+BB.4.X.A 制造费用折旧小计（法人，含存量、本年新增与使用权资产）；服务物料转出=BB.1.3 服务物料明细成本（按服务主体/项目所属法人）；自制设备用料转出=BB.4.1.c 领料投入（按领料法人归属）；其他出入库调整（盘盈/盘亏/报废、跨期补记等）=本表「转入数」/「转出数」列直接手工录入（按法人归属，不再单独设存货出入库调整表）；产成品转出=BB.1.2 财务视角对外销售成本（法人=签约主体）；产成品转入=同一法人在制品「结转」转出。
- 【同一法人内结转硬约束】在制品→产成品的形态转换必须在同一法人公司内部结转（法人甲的在制品只能转为法人甲的产成品，14xx 存货总额不变）；若存在跨法人代工/调拨，属内部交易，走 BJ.C 关联交易与内部抵销，不在本表内直接结转。销售线物料明细（BB.1.3.d/.f）「内部供应商」非空且≠签约主体的物料行属跨法人内部供货：单体公司层面按真实购销与业务本质处理——兄弟公司（供料方）侧存货 1405 按原始出库成本（数量×BAA.4 标准成本）出库转出、确认 6001.2 内部销售收入（出库成本+加成款）并结转 6401.2 成本；签约主体（现场服务方）单体按内部采购价（出库成本+加成款）入库并计入服务物料成本 6401.1（加成进成本，不走 6602）；集团合并层面进行合并抵销（内部销售收入 6001.2 ↔ 内部采购成本 6401.1/1405 全额抵销，还原兄弟公司原始出库成本，彻底消除内部未实现加成利润；内部往来与税额同额互抵）。
- 【产成品转出法人口径】产成品转出=当月对外销售成本（BB.1.2 财务视角，法人=签约主体），与 BB.1.2 财务视角销售成本同口径、不重复取数。
- 集团口径：各法人同品类同月加总即为集团口径（仅文字口径说明，本表不新增自动合计行，遵循「不做表间自发合计」的约定）。
- ⚠ 【手工调库·进与出】除自动取数外的手工出入库调整（盘盈入库、盘亏/报废出库、跨期补记等）直接在本表「转入数」/「转出数」列手工录入——进（转入数）=盘盈入库等增加存货；出（转出数）=盘亏/报废等减少存货；按「法人公司×存货类别」落到本表同一法人行，作为各品类转入/转出的补充调整来源，与自动取数互斥、不重复计（不再单独设存货出入库调整表）。
- ⚠ 【防重复提示】BAP.2 只承载常规物料（领料用途=生产类/研发类/销售类/管理类及其他）；服务物料消耗由 BB.1.3 服务物料明细表、自制设备工程领料由 BB.4.1.c 领料投入明细表各自承载，按 AB.9 存货物料类别做标识隔离，确保同一笔领用只在一处出库、不重复计入。

**BB.3.X.c 转入转出逻辑明细表**

- 各品类转入/转出逐来源取数逻辑明细展示；仅展示口径、不生成会计分录。

## ④ 适用业务情形

**适用于**

- 存货进销存滚动余额测算（法人公司×存货类别一表到底，原材料/在制品/产成品/一般物料），期初+转入−转出=期末，月末滚动结转；在制品按料/工/费/结转四个小类在同一法人公司内部归集与结转；各法人期末存货加总=集团列报

**不适用于**

- 采购/生产/销售的具体编制（分别属 BB.3.1/BB.2.1/BB.1.2 等）

## ⑤ 预算编制视角：数据关系总结

存货进销存滚动余额测算表（法人级单表：法人公司×存货类别，一表到底，平表无分组行、无自动合计行；原「集团口径主表 + 按比例拆到法人」两层结构与分法人 Tab 已取消，BAA.10 不参与本表拆分、仅作无来源品类兜底且本年度不启用），按「法人公司×大类/小类」登记年初余额、期初、转入、转出、期末，月末余额滚动结转；各法人的转入/转出逐来源按法人取数（采购入库=BB.3.3.C 各法人到货额、完工入库=BB.2.1 法人产量×BAA.2、在制品料工费分别按 BAP.2（法人+部门）/BB.5.1（法人）/BB.5.2+BB.4.X.A 制造费用折旧小计（含存量、本年新增与使用权资产，按法人；折旧唯一入口=BB.4.5/BB.4.X.A、各来源不重叠取数）、其他出入库调整（盘盈/盘亏/报废、跨期补记等）在本表「转入数」/「转出数」列直接手工录入、不另设专门调整表）；在制品→产成品必须在同一法人公司内部结转（14xx 存货总额不变），跨法人代工/调拨属内部交易：销售线物料明细（BB.1.3.d/.f）「内部供应商」登记的，单体公司层面按业务本质处理（兄弟公司出料带加成，按原始出库成本转出并确认 6001.2 收入与 6401.2 成本，签约主体按出库成本+加成款采购进 1405/6401.1，加成进成本），集团合并层面抵销内部购销与未实现利润；代采购物料等其余内部交易走 BJ.C 关联交易与内部抵销；产成品转出=BB.1.2 财务视角对外销售成本、法人归属=销售订单签约主体所在法人公司；服务物料转出=BB.1.3 服务物料明细成本；各法人同品类同月加总=集团口径，期末存货各法人加总与 BO.BS 存货列报数绝对一致。

**数据来源（上游）**

| 来源表 | 编码 | 取数字段 | 关系说明 |
| :--- | :--- | :--- | :--- |
| 物料类采购预算 | BB.3.3 | 1~12月到货额 | 取财务视角 BB.3.3.C 各法人到货额，按 AB.9 类别对应转入各物料大类同一法人行（逐来源按法人取数，不按比例拆分） |
| 生产制造产量计划表 | BB.2.1 | 1~12月产量 | 各月完工生产成本 = 法人产量 × BAA.2 标准成本，作为同一法人在制品「结转」转出与产成品转入的金额标准（同一法人内结转，14xx 总额不变） |
| 软硬件收入与成本预算 | BB.1.2 | 产品销售成本同步结转 | 产成品大类转出数 = 对应月度对外销售成本（BB.1.2 财务视角，法人=签约主体），随销售出库结转 |
| 物料消耗需求汇总表_常规 | BAP.2 | 领料用途 | 生产类领料（法人公司+部门）→ 在制品「料」转入；非生产类领料 → 同法人的一般物料转出（领料结转分录由 BB.3.X.b 领料与结转视图按法人公司+预算部门归集生成） |
| 雇员费用编制/导入表 | BB.5.1 | 制造费用项金额 | 在制品「工」入库 = BB.5.1 制造费用项金额（按法人公司取数） |
| 经营费用转换结果表 | BB.5.2 | 制造费用项金额 | 在制品「费」入库来源之一（按法人公司取数；与 BB.4.X.A 制造费用折旧小计（含存量、本年新增与使用权资产）并列，各来源不得重叠取数） |
| 折旧费用汇总表 | BB.4.X.A | 制造费用折旧小计 | 在制品「费」入库来源之一（按法人公司取数），制造费用折旧只进「费」腿；汇总范围含资产类别=使用权资产（其折旧由 BB.4.5 计提、经本表归集，各来源不重叠取数） |
| 技术服务收入与成本预算 | BB.1.3 | 服务物料明细表成本 | 服务物料转出（售后与交付服务消耗），按服务主体/项目所属法人取数 |
| 自制设备工程预算 | BB.4.1 | 领料投入 | 自制设备工程领料出库（BB.4.1.c 含法人公司列），自制设备用料转出按领料法人归属 |
| 进销存按法人拆分比例表 | BAA.10 | 各法人占比 | 本年度不启用：BB.3.X 改为法人级单表后不再按比例拆分，本表仅作「无来源品类」的兜底比例保留，后续年度启用时再由本表提供兜底口径 |
| 产品标准成本设置 | BAA.2 | 标准成本 | 完工生产成本 = 产量 × 单位标准成本 |

**输出影响（下游）**

| 目标报表 | 取数路径 |
| :--- | :--- |
| BO.BS 资产负债表—存货(1405) | 期末存货余额按法人公司列示、各法人加总必须与 BO.BS 集团存货列报数绝对一致（本表即分法人 BO.BS 存货列报的直接取数来源，法人公司维度直接落表，不经过比例拆分） |
| BO.PL 利润表—营业成本（6401.1 其中：主营业务成本） | 产成品出库驱动主营业务成本（硬件直接材料） |
| BO.CF 现金流量表—补充资料 | 间接法现金流量表补充资料引用「存货的减少（减：增加）」 |

**关键编制规则**

- 在制品→产成品必须在同一法人公司内部结转（法人甲的在制品只能转为法人甲的产成品，14xx 存货总额不变）；跨法人代工/调拨属内部交易，走 BJ.C 关联交易与内部抵销，不在本表内直接结转。销售线物料明细（BB.1.3.d/.f）「内部供应商」非空且≠签约主体的物料行属跨法人内部供货：单体公司层面按真实购销与业务本质处理（兄弟公司按原始出库成本出库存货 1405 并确认 6001.2 收入与 6401.2 成本，签约主体按采购价＝出库成本+加成款入库并计入 6401.1 物料成本，加成进成本不走 6602），集团合并层面进行合并抵销（抵销内部购销 6001.2 ↔ 6401.1/1405 与未实现利润，还原为真实出库成本；内部往来与增值税对冲）。
- 各品类的转入/转出逐来源按法人取数、不乘比例：采购入库=BB.3.3.C 各法人到货额、完工入库=BB.2.1 法人产量×BAA.2、料工费按 BAP.2/BB.5.1/BB.5.2+BB.4.X.A 制造费用折旧小计（含存量、本年新增与使用权资产）的法人归属、其他出入库调整（盘盈/盘亏/报废、跨期补记等）在本表「转入数」/「转出数」列直接手工录入（不再单独设存货出入库调整表）；BAA.10 仅作无来源品类兜底且本年度不启用。
- 集团口径=各法人同品类同月加总（仅文字口径说明，本表不设自动合计行）；期末存货按法人列示，各法人加总=集团 BO.BS 存货列报。

## ⑥ 财务报表项转换规则

**存货收发结存** `月度转入数 / 月度转出数`

- 取数说明：月度期末数=期初数+转入数−转出数（公式），年初余额手工一次性录入；本表为进销存全貌管理表
- 损益表 PL：—（转入/转出为存货数量金额过程管理，损益影响经各业务表归集）
- 资产负债表 BS：存货 1405 年末余额 = 12月期末数（口径勾稽参考，正式取数以各业务表转换为准）
- 现金流量表 CF：—
- 科目影响：综合勾稽表，不单独生成基础分录；校验引擎执行勾稽：期末存货余额(14xx) ≡ 期初存货余额 + Σ(采购入库+完工入库) − Σ(销售结转+领用出库)
- 其他备注：涵盖原材料、在制品、产成品、备品备件大类；校验公式：期末存货必须与 BO.BS 存货列报数绝对一致。一般物料大类的转入数=对应月度到货额，来自 BB.3.3 物料采购预算表"原材料及零部件采购到货入库"（monthlyArrival），即采购入库随采购到货关联，不在本表单独手工填报（BB.3.3到货额=本表「一般物料」大类的转入数主来源）；在制品大类的转入数=料工费归集（BAP.2领料用途=生产类的物料消耗 + BB.5.1「制造费用」项的金额 + BB.5.2经营费用转换结果表「制造费用」项金额 + BB.4.X.A折旧费用汇总表「制造费用折旧」小计）；在制品「结转」小类依据当月完工生产成本（BB.2.1产量×BAA.2单位标准成本）对在制品金额作转出，其转出数同时带出产成品大类的转入数，体现"在制品转产成品"这一存货形态转换（在制品出库、产成品增加，14xx存货总额不变）。产成品大类的转出数=对应月度对外销售成本（原硬件出货/软件出货两条已合并为产成品一行，法人=签约主体），来自 BB.1.2 存量订单收入与成本表"产品销售成本同步结转"（monthlyCost），即产成品出库随销售成本结转发生，不在本表单独手工填报；出库部分驱动 6401.1 主营业务成本（硬件直接材料），间接法现金流量表补充资料引用"存货的减少（减：增加）"。一般物料大类的转出数=非生产类物料消耗领用金额，取自 BAP.2 物料消耗需求汇总表_常规（领料用途≠生产类），体现部门领用消耗出库，不在本表单独手工填报。法人级口径：本表为法人级单表（维度=法人公司×存货类别，一表到底、52 列，平表无分组行/无合计行；原分法人 Tab 已取消）；各品类的转入/转出逐来源按法人取数、不乘比例（采购入库=BB.3.3.C 各法人到货额、完工入库=BB.2.1 法人产量×BAA.2 标准成本、在制品料工费分别取 BAP.2（法人+部门）/BB.5.1（法人）/BB.5.2+BB.4.X.A（法人）、其他出入库调整（盘盈/盘亏/报废、跨期补记等）在本表「转入数」/「转出数」列直接手工录入），BAA.10 仅作无来源品类兜底且本年度不启用。硬约束：在制品→产成品必须在同一法人公司内部结转（法人甲的在制品只能转为法人甲的产成品，14xx 存货总额不变）；跨法人代工/调拨属内部交易，走 BJ.C 关联交易与内部抵销，不在本表内直接结转。产成品转出=BB.1.2 财务视角对外销售成本，法人归属=销售订单签约主体所在法人公司。各法人同品类同月加总=集团口径（不设自动合计行），期末存货按法人列示、各法人加总与集团 BO.BS 存货列报保持 100% 勾稽。口径补充：在制品「费」腿的制造费用来源＝BB.5.2经营费用转换结果表「制造费用」项＋BB.4.X.A折旧费用汇总表「制造费用折旧」小计，两处不得重叠取数（制造费用性质的折旧只进「费」腿，不得再在利润表直接取数）；完工交库按BAA.2单位标准成本（含制费段）转出，实际归集（含实际折旧）与标准制造费用的差额留在在制品/产成品余额，属预算近似口径。
