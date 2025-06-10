function calculateCd(code) {
      if (code.length !== 8) {
        throw new Error("Error : 不適切な形式（E01）");
      }
      if (code[0].toLowerCase() !== 'b') {
        throw new Error("Error : 不適切な形式（E02）");
      }
      if (!(/^\d{3}$/.test(code.slice(1, 4)) && /^\d{3}$/.test(code.slice(5, 8)))) {
        throw new Error("Error : 不適切な形式（E03）");
      }
      if (!/[a-zA-Z]/.test(code[4])) {
        throw new Error("Error : 不適切な形式（E04）");
      }

      const table1 = { 's': 0, 't': 4, 'a': 4, 'n': 6, 'g': 6, 'r': 7, 'u': 8, 'b': 8, 'p': 10 };
      const table2 = {
        1: 'H', 2: 'T', 3: 'S', 4: 'N', 5: 'P', 6: 'R',
        7: 'X', 8: 'Y', 9: 'U', 10: 'M', 11: 'K'
      };

      const N6 = parseInt(code[1], 10);
      const N5 = parseInt(code[2], 10);
      const N4 = parseInt(code[3], 10);
      const X = code[4].toLowerCase();
      const N3 = parseInt(code[5], 10);
      const N2 = parseInt(code[6], 10);
      const N1 = parseInt(code[7], 10);

      if (!(X in table1)) {
        throw new Error(`Error : 不適切な英字: ${X}（E05）`);
      }

      const xnum = table1[X];
      const total = (N1 * 1 + N2 * 2 + N3 * 3 + xnum * 1 + N4 * 6 + N5 * 7 + N6 * 8);
      const ref_val = Math.abs((total % 11) - 11);
      const cd = table2[ref_val];

      return cd;
    }

    function getDepartment(n4, x) {
      const key = `${n4}${x}`;
      const departmentMap = {
        '1g': '人文社会学部人文社会学科',
        '2g': '教育学部学校教育教員養成課程',
        '3p': '理工学部数学物理学科',
        '3r': '理工学部情報科学科',
        '3s': '理工学部生物化学科',
        '3t': '理工学部化学生命理工学科',
        '3u': '理工学部地球環境防災学科',
        '4n': '農林海洋科学部農林資源環境科学科',
        '4p': '農林海洋科学部農芸化学科',
        '4r': '農林海洋科学部海洋資源科学科',
        '4s': '農林海洋科学部農林資源科学科',
        '4t': '農林海洋科学部海洋資源科学科',
        '5a': '医学部医学科',
        '5b': '医学部看護学科',
        '6a': '地域協働学部地域協働学科'
      };
      return departmentMap[key.toLowerCase()] || '（不明な学科）';
    }

    function runCalculation() {
      const input = document.getElementById('codeInput').value.trim();
      const resultCd = document.getElementById('resultCd');
      const resultMessage = document.getElementById('resultMessage');

      resultCd.innerHTML = '';
      resultMessage.textContent = '';
      resultMessage.className = '';

      try {
        const cd = calculateCd(input);
        const fullCode = input.toUpperCase() + cd;
        const N6 = input[1];
    const N5 = input[2];
    const N4 = input[3];
    const X = input[4];
    const N3 = input[5];
    const N2 = input[6];
    const N1 = input[7];

        const department = getDepartment(N4, X);

        const course = (N4 === '1') ? (
  ['0', '1'].includes(N3) ? '人文科学コース' :
  ['2', '3'].includes(N3) ? '国際社会コース' :
  ['4', '5'].includes(N3) ? '社会科学コース' : '-'
) : '-';

const campus = (N4 === '5') ? '岡豊・病院' :
               (N4 === '4') ? '物部' : '朝倉';

const year = `20${N6}${N5}年度`;

const attendanceNo = `${N3}${N2}${N1}`;

resultCd.innerHTML = `
  <div class="result-block fade-in">
    <div style="text-align:left; font-size:17px; margin-bottom:10px;"><span class="material-icons-outlined" style="font-size:27px ;position: relative; top: 6px">
auto_awesome
</span> 解析結果</div>
    <div class="result-code">${fullCode}</div>
<span style="font-size: 15px;">学籍番号から得られる学籍情報</span>
    <table class="result-table">
      <tr>
        <th>学部学科</th>
        <td>${department}</td>
      </tr>
      <tr>
        <th>コース</th>
        <td>${course}</td>
      </tr>
      <tr>
        <th>校地</th>
        <td>${campus}</td>
      </tr>
      <tr>
        <th>入学年</th>
        <td>${year}</td>
      </tr>
      <tr>
        <th>出席番号</th>
        <td>${attendanceNo}</td>
      </tr>
    </table>
  </div>
<p style="line-height:150%; font-size: 14px; color: #aaa; ">※ この結果は本講座のアルゴリズムにより演算されたものであり、特定の個人情報やデータベースを元に算出されたものではありません。</p>
`;
        resultMessage.textContent = "";
        resultMessage.classList.add("success");
      } catch (e) {
  resultCd.innerHTML = `
     <div class="result-block fade-in">
    <div style="text-align:left; font-size:17px; margin-bottom:10px; "><span class="material-icons-outlined" style="color: #AB2A6F; font-size:27px ;position: relative; top: 6px">
error_outline
</span> <span style="color:#AB2A6F">解析できませんでした</span></div>  <span style="font-size:17px; color:#AB2A6F">${e.message}</span><br>
    <table class="result-table2">
      <tr>
        <th>E01</th>
        <td>学籍番号は8桁で入力する必要があります。</td>
      </tr>
      <tr>
        <th>E02</th>
        <td>UniversalFormula はBから始まる学籍番号のみ解析できます。</td>
      </tr>
      <tr>
        <th>E03</th>
        <td>2,3,4,6,7,8桁目は数字である必要があります。</td>
      </tr>
      <tr>
        <th>E04</th>
        <td>5桁目は英字である必要があります。</td>
      </tr>
      <tr>
        <th>E05</th>
        <td>不適切な英字が入力されました。</td>
      </tr>
    </table>
  </div>
`;
  resultMessage.textContent = "";
  resultMessage.className = "";
}
    }
