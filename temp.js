const path = require('path');
const fs = require('fs');
const axios = require('axios');

// 入門式 2018
const years = [
  // 2019,
  2018,
  2017
]
const title = '合同練習'
const dirname = 'spring-gasshuku'
const event = `${dirname}/`

const obj = {
  // 2019: [
  // ],
  2018: ["休憩中の一コマ。思い思いに鋭気を養っていますね。", "今年も春合宿に行ってきました！本部でいただいたお昼ご飯です！毎日おいしかったです。感謝ーー！", "ホテル出発前の二回生三人。", "練習終わり！三回生は最後の春合宿です。", "講話を拝聴しています。少林寺拳法は心も鍛える武道です。"],
  2017: ["今年はいつもより１日少なかったり、強風で午前練のない日があったりと珍しい年でした。", "休憩時間中の１コマ", "２回生もこれで全員黒帯になりました。允可状をもって記念撮影です。", "集合写真です。"],
}

const bigObj = {
  // 2019: ,
  2018: '少林寺拳法発祥の地である香川県の本部道場にて、全国の大学と交流しつつ多くを学び取りました。この合宿で三回生はついに初段に昇格し、黒帯になりました。外で撮った集合写真。これで年度内の行事は最後です。',
  2017: '外で撮った集合写真。これで年度内の行事は最後です。',
}
const isBig = true

// 画像
const urlObj = {
  // 2019: ,
  2018:  ["http://kyotoushorinji.sakura.ne.jp/pict/18harugassyuku1.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18harugassyuku2.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18harugassyuku3.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18harugassyuku4.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18harugassyuku6.jpg", "http://kyotoushorinji.sakura.ne.jp/pict/18harugassyuku5.jpg"],
  // 9
  2017: ["http://kyotoushorinji.sakura.ne.jp/pict/17harugassyuku1.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/17harugassyuku2.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/17harugassyuku3.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/17harugassyuku4.JPG", "http://kyotoushorinji.sakura.ne.jp/pict/17harugassyuku5.JPG"],
}

const dir = `${dirname}`
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
    <div class="picture__content${isBig ? '--big' : ''}">
        <img class="picture__content--image" src="/assets/images/pictures/${dir}/${year}/${i + 2}${imageExt}" alt="練習風景">
        <p class="picture__content--description${isBig ? '--big' : ''}">
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
  const target = 'public/assets/images/pictures/' + dir
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

// // ブラウザ
// // // 文字
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
// // //
// // // 画像パス
// let arr = []
// $('#main').childNodes.forEach(el => {
//   if (el.tagName !== 'P') return
//   const chd = el.firstElementChild
//   if (!chd) return
//   const path = chd.src
//   arr.push(path)
// })
// console.log(arr.filter(a => typeof a === 'string'))
