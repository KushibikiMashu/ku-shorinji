const path = require('path');
const fs = require('fs');
const axios = require('axios');

// 入門式 2018
const years = [2018, 2017]
const title = '入門式'
const event = 'nyumon-ceremonies/'

const obj = {
  2018: ["入門式がはじまります。一回生ははじめての道訓に戸惑っているようですね", "鈴木・北原、全一ペアによる奉納演武です。", "監督にご講話いただきました。"],
  2017: ["監督によるご講話です。部活は大変なときもあるけれど、そんなときこそあきらめなければ得るものがある、という内容でした。継続は力なり、ですね！", "鈴木・北原、全一ペアによる奉納演武です。この演武を目標として成長していきましょう！", "京大少林寺拳法部の入門証書を授けます。"],
}

const bigObj = {
  2018: "今年の一回生はとにかく人数が多くて才気あふれていますね！同期とともにこれから頑張っていきましょう！",
  2017: "集合写真です！入門おめでとう！同期とともにこれから頑張っていきましょう！",
}

// 画像
const dir = '/nyumon-ceremonies'
const urlObj = {
  2018: [],
  2017: [],
}


const path = 'public/pictures/' + event
const ext = '.html'

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
  let phs = ''
  obj[year].forEach((text, i) => {
    phs += `<div class="picture">
    <div class="picture__content">
        <img class="picture__content--image" src="/assets/images/pictures/${dir}/${year}/${i + 1}.jpeg" alt="練習風景">
        <p class="picture__content--description">
            ${text}
        </p>
    </div>
</div>
`
    if (i === obj[year].length - 1) {
      phs += `<div class="picture">
    <div class="picture__content--big">
        <img class="picture__content--image" src="/assets/images/pictures/${dir}/${year}/${i + 2}.jpeg" alt="練習風景">
        <p class="picture__content--description--big">
            ${bigObj[year]}
        </p>
    </div>
</div>
`
    }
  })

  const heading = `<h1 class="heading">${title}（${year}年度）</h1>`

  const filename = path + year + ext
  const html = tmpl(year, heading, phs)
  fs.writeFileSync(filename, html)

  // 画像
  const target = 'public/assets/images/pictures' + dir
  urlObj[year].forEach((url, i) => {
    (async () => {
      const res = await axios(url, {responseType: 'arraybuffer'})
      const ext = path.extname(url)
      const filename = `${target}/${year}/${(i + 1).toString()}${ext}`
      fs.writeFileSync(filename, new Buffer.from(res.data), 'binary')
      console.log(filename)
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
