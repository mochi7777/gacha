// ① ガチャの景品アイテムデータ
// name: アイテム名
// rarity: レアリティ
// weight: 排出率の「重み」。大きいほど出やすい。
const items = [
    { name: '伝説の剣', rarity: 'SSR', weight: 5 },   // 5%
    { name: '英雄の盾',   rarity: 'SR',  weight: 15 },  // 15%
    { name: '魔法の薬',   rarity: 'R',   weight: 30 },  // 30%
    { name: 'ただの石',   rarity: 'N',   weight: 50 }   // 50%
];

// ② HTMLの要素を取得
const drawButton = document.getElementById('draw-button');
const resultDisplay = document.getElementById('result-display');

// ③ ボタンがクリックされたらガチャを引く
drawButton.addEventListener('click', () => {
    // ガチャの抽選処理を実行
    const selectedItem = drawGacha();
    
    // 結果を表示
    displayResult(selectedItem);
});

// ④ ガチャの抽選を行う関数
function drawGacha() {
    // 全ての重みの合計を計算 (5 + 15 + 30 + 50 = 100)
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    
    // 0から合計値までのランダムな数値を生成
    let randomValue = Math.random() * totalWeight;
    
    // ランダムな数値がどのアイテムに該当するかを調べる
    for (const item of items) {
        // ランダムな値からアイテムの重みを引いていく
        randomValue -= item.weight;
        
        // 0未満になったら、そのアイテムが「当たり」
        if (randomValue < 0) {
            return item; // 当たったアイテムを返す
        }
    }
}

// ⑤ 結果を画面に表示する関数
function displayResult(item) {
    resultDisplay.innerHTML = `
        <span class="rarity-${item.rarity.toLowerCase()}">
            [${item.rarity}] ${item.name}
        </span>
        <br>をゲット！
    `;
}
