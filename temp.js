const path = require('path');
const fs = require('fs');
const axios = require('axios');

// 入門式 2018
const years = [2019, 2018, 2017]
const title = '入門式'
const dirname = 'competitions'
const event = `${dirname}/`

const obj = {
  2019: [
    "「京都府大会」団演の一コマです。2019年度初めての大会でした。この大会では大学生のコートは武階でわかれておらず、色々な演武が間近で見られて刺激的でした！",
    "「関西学生大会」運用法団体戦では2位の快挙でした。演武でも入賞者が出ました。各々の課題を持ち帰り、意気を新たにしました。前期の折り返しの時期です。",
    "「七大学総合体育大会」今年の七帝戦は九州大学で開催されました。演武では多くのペアが本戦に出場、運用法の部では京都大学が一位でした。運用法の部は今回を含めて三連覇です！",
    "「山城ブロック交流大会」今期初の大会であり、1回生にはデビュー戦となりました。成果と課題を次に活かせるよう頑張っていきたいと思います。",
    "「全日本学生大会」11/4に千葉県にて全日本学生大会が行われました。運用法で入賞者がでたものの、組演武では全ペア予選を通過できず悔しい思いをしました。ここで得られた刺激を次に活かしたいと思います。",
    "「京都学生大会」同志社大学にて京都学生大会が行われました。次の関西学生新人大会に向けて、引き続き練習を頑張っていきたいと思います。",
  ],
  2018: [
    "「京都府大会」集合写真です。今年は全ての組演武が同じ組でおこなわれたため大混戦でしたが、見事入賞者も出ました！",
    "「関西学生大会」演武の１コマ",
    "団演も出場しました(大阪大学さんとは同点でした。七帝戦は勝つぞ！)",
    "今年は運用法が特に好調で団体３位でした！演武も多数が本戦出場できました。",
    "今年は全国大会と日付がかぶってしまい二回生一組と一回生のみの出場となり、残念ながら入賞者は出ませんでした。写真はあと1点で入賞だった宮本川畑ペア。",
    "「2018年少林寺拳法全国大会in群馬」今年は団体演武の部で参加となりました。結果こそ予選落ちではありましたが得られたものはあったはずです。",
    "「全日本学生大会」日本武道館にて、全日本学生大会です。毎年のテーマは雲外蒼天、雲は苦労や乗り越えるべきものの暗示ですが…く拳士を雲に見立てられそうな光景です。乗り越えるべきものとしてあながち間違ってもいない気もします。",
    "立合評価法では男子中量級の部で小畑さんが2位、女子軽量級の部でらなさんが6位に入賞されました。",
    "演武では入賞することはできませんでしたが、これを糧として頑張っていきたいです。",
    "「関西学生新人大会」演武では本選に多くが出場し、前田さん佑妃さんペアが入賞しました。",
    "立合評価法でもベスト１６入りが多く、岩崎さんが重量級で3位に入賞しました。",
    ],
  2017:  [
    "「山城ブロック交流大会」今年はいつもの龍谷、京女だけでなく、立命や京産も出場していて規模が大きくなりましたね。初出場の寺島吉田が堂々の２位でした！",
    "「京都学生大会」京都学生大会です。ここから大会ラッシュなのでどんどん経験を積んで成長していきましょう！",
    "集合写真です。",
    "「全日本学生大会」日本武道館にて、全日本学生大会です。毎年これだけの人数の拳士が集うのはすごいですね。",
    "部旗です。",
    "演武では入賞することはできませんでしたが、これを糧として頑張っていきたいです。",
    "「関西新人大会」関西新人大会です。"
  ],
}

const bigObj = {
  2019: "「関西学生新人大会」この大会をもって後期すべての大会が終了いたしました。ご指導くださった皆様、並びに応援してくださった全ての方々に感謝申し上げます。",
  2018: "「京都学生大会」2018年最後の大会です。１回生も含め多くが入賞し京都大学として３位に入賞し本年の締めとして十分な結果を残しました。",
  2017: "集合写真です。演武、運用法ともに多数が予選を通過し、入賞者も出ました！",
}

// 画像
const urlObj = {
  // 7
  2019: ["http://kyotoushorinji.sakura.ne.jp/pict/19kyototaikai1.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/19kansaisinnjinn1.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/19sititei.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/19uji.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/19zenniti.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/19kyoutogakusei.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/19kansaigakuseisinjin.jpg"],
  // 12
  2018: ["http://kyotoushorinji.sakura.ne.jp/pict/18kyototaikai.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/18kansaisinnjinn1.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/18kansaisinnjinn2.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/18kansaisinnjinn3.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/18uji1.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18zennkoku1.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18zenniti1.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18zenniti2.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18zenniti3.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18kansaigakuseisinjin1.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18kansaigakuseisinjin2.png", "http://kyotoushorinji.sakura.ne.jp/pict/18kyoutogakusei.png"],
  // 8
  2017: ["http://kyotoushorinji.sakura.ne.jp/pict/17uji1.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/17kyotogakusei1.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/17kyotogakusei4.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/17zenniti1.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/17zenniti2.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/17zenniti3.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/17kansaisinnjinn1.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/17kansaisinnjinn2.JPG"],
}

const dir = `/${dirname}`
const htmlPath = 'public/pictures/' + event
const extHtml = '.html'

function tmpl(year, heading, body) {
  return `<!doctype html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${year}年度 ${title} - 京都大学体育会 少林寺拳法部</title>

    <!--  共通CSS  -->
    <link rel='stylesheet' href='/assets/css/common/normalize.css'>
    <link rel='stylesheet' href='/assets/css/common/base.css'>
    <link rel='stylesheet' href='/assets/css/common/layout.css'>

    <!-- このページのCSS -->
    <link rel='stylesheet' href='/assets/css/pictures/main.css'>

</head>
<body>

<!-- header -->
<header>
    <nav class="navbar">
        <div class="navbar__left">
            <a href="/">
                <p class="navbar__left--group">京都大学体育会</p>
                <p class="navbar__left--sitename">少林寺拳法部</p>
            </a>
        </div>
        <div class="navbar__right">
            <a href="https://www.eikenkai.com/">
                <p>叡拳会HP</p>
            </a>
        </div>
    </nav>
</header>

<div class="container">
    <div class="main">

    ${heading}

    ${body}
    <div class="return-top-wrapper button-space">
        <a class="return-top-wrapper__button" href="/pictures.html">一つ前に戻る</a>
    </div>

    <div class="return-top-wrapper button-space">
        <a class="return-top-wrapper__button" href="/">TOPに戻る</a>
    </div>

    </div>
</div>

<!-- footer -->
<footer class="footer">
    <div class="footer__left">
        <a href="/">
            <p class="footer__left--group">京都大学体育会</p>
            <p class="footer__left--sitename">少林寺拳法部</p>
        </a>
    </div>
    <div class="footer__right">
        <a href="http://www.kusu.kyoto-u.ac.jp/">
            <img src="/assets/images/index/KUSU-logo.gif" alt="京都大学体育会のロゴ"/>
        </a>
    </div>
</footer>

</body>
</html>
`
}

years.forEach(year => {
  if (obj[year].length !== urlObj[year].length -1) {
    console.log(year, 'おかしいよ。数が合わない', obj[year].length, urlObj[year].length-1)
  }

  let phs = ''
  obj[year].forEach((text, i) => {
    const imageExt = path.extname(urlObj[year][i])

      phs += `<div class="picture">
    <div class="picture__content">
        <img class="picture__content--image" src="/assets/images/pictures/${dir}/${year}/${i + 1}${imageExt}" alt="練習風景">
        <p class="picture__content--description">
            ${text}
        </p>
    </div>
</div>
`
    if (i === obj[year].length - 1) {
      phs += `<div class="picture">
    <div class="picture__content--big">
        <img class="picture__content--image" src="/assets/images/pictures/${dir}/${year}/${i + 2}${imageExt}" alt="練習風景">
        <p class="picture__content--description--big">
            ${bigObj[year]}
        </p>
    </div>
</div>
`
    }
  })

  const heading = `<h1 class="heading">${title}（${year}年度）</h1>`

  const filename = htmlPath + year + extHtml
  console.log(filename);
  const html = tmpl(year, heading, phs)
  fs.writeFileSync(filename, html)

  // 画像
  const target = 'public/assets/images/pictures' + dir
  urlObj[year].forEach((url, i) => {
    (async () => {
      // const res = await axios(url, {responseType: 'arraybuffer'})
      // const ext = path.extname(url)
      // const filename = `${target}/${year}/${(i + 1).toString()}${ext}`
      // fs.writeFileSync(filename, new Buffer.from(res.data), 'binary')
      // console.log(filename)
    })()
  })
})

// ブラウザ
// // 文字
// let arr = []
// $('#main').childNodes.forEach(el => {
//   const txt = el.textContent.trim()
//   if (txt === '') return
//   if (["京都大学体育会少林寺拳法部", "写真", "ひとつ前に戻る", "TOPに戻る"].includes(txt)) return
//   arr.push(txt)
// });
// const b = arr.pop()
// arr.shift()
// arr.shift()
// console.log(arr)
// console.log(b)
//
// // 画像パス
// let arr = []
// $('#main').childNodes.forEach(el => {
//   if (el.tagName !== 'P') return
//   const chd = el.firstElementChild
//   if (!chd) return
//   const path = chd.src
//   arr.push(path)
// })
// console.log(arr.filter(a => typeof a === 'string'))
