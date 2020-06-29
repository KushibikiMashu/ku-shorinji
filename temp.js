const fs = require('fs');

const years = [ 2018, 2017]

const path = 'public/schedules/summer-gasshuku/'
const ext = '.html'

// 夏合宿 2018
const title = '夏合宿'

const obj = {
  2018: [
    '時間をふんだんに使った基本で、基礎から力をつけていきます。',
    '朝ジョグの時間です。心地よい潮風を受けながら早朝の宮津を駆け抜けます。',
    '術科の時間。八木監督より技術指導を賜ります。',
    '今年もこの部の創設者の一人、後神先輩のご講話を全員で聞きました。',
    '乱捕練習、お互い相手を倒さんと全力で頑張ります。',
    '天橋立を見ながらの１５kmマラソン、最後は天橋立を端から端まで走ります。一回生が根性を見せました。',
    'マラソン終わりの一時の休息。',
  ],
  2017:  [
    "夏合宿の基本です。普段の練習を超える練習量でうまくなっていきましょう。",
    "朝ジョグの時間です",
    "筋トレもたっぷりあります。写真は体幹の時間。",
    "今年もこの部の初代である後神先輩のご講話を全員で聞きました。",
    "乱捕練習、どちらも倒されないように本気で頑張ります。",
    "天橋立を見ながらの１５kmマラソン、最後は天橋立を端から端まで走ります。全員無事走り終えることができました！",
  ],
}

const bigObj = {
  2018: '１週間の夏合宿を終えた後の集合写真、全員お疲れ様でした。この夏合宿の経験を糧にこれからますます頑張っていきましょう。',
  2017: "１週間の夏合宿を終えた後の集合写真、いい顔してます。今年も記憶に残る合宿でした。",
}

function tmpl(year,  heading, body) {
  return  `<!doctype html>
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
    <link rel='stylesheet' href='/assets/css/schedules/main.css'>

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
        <img class="picture__content--image" src="/assets/images/schedules/summer-gasshuku/${year}/${i+1}.jpeg" alt="練習風景">
        <p class="picture__content--description">
            ${text}
        </p>
    </div>
</div>
`
    if (i === obj[year].length - 1) {
      phs += `<div class="picture">
    <div class="picture__content--big">
        <img class="picture__content--image" src="/assets/images/schedules/summer-gasshuku/${year}/${i+2}.jpeg" alt="練習風景">
        <p class="picture__content--description--big">
            ${bigObj[year]}
        </p>
    </div>
</div>
`
    }
  })

  const heading = `<h1 class="heading">${title}（${year}年度）</h1>`

  const filename= path + year + ext
  const html = tmpl(year, heading, phs)
  fs.writeFileSync(filename, html)
})

