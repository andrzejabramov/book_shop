# Дизайн Figma

[шаблон](https://www.figma.com/design/8XxPADjILtnlah4yWI0CLb/bookshop?node-id=0-1&p=f&t=83Cf2tpmTxS51En0-0)

# Элементы разметки страницы

## element: header (parent: body)

| param        | value     |
| ------------ | --------- |
| width        | 1440px    |
| height       | 116px     |
| angle        | 0 deg     |
| opacity      | 1         |
| top          | -3px      |
| left         | -3px      |
| border       | 1px solid |
| border-color | #1C2A39   |

## element: main-grid (parent: body)

| param         | value                 |
| ------------- | --------------------- |
| width         | 1120px                |
| column        | 1fr                   |
| row-height    | 702px 180px 96px 45px |
| margin-bottom | 74px                  |

## element: banner (parent: main-grid row-1)

| param   | value  |
| ------- | ------ |
| width   | 1120px |
| height  | 702px  |
| angle   | 0 deg  |
| opacity | 1      |
| top     | 116px  |
| left    | 160px  |

## element: card-grid (parent: main-grid row-2)

| param        | value             | gap  | padding-left |
| ------------ | ----------------- | ---- | ------------ |
| width        | 1120px            |      |              |
| row-height   | 300px 300px 300px | 96px |              |
| column-width | 424px 424px       | 76px | 196px        |

## element: card (parent: card-grid)

| param        | value     | describe |
| ------------ | --------- | -------- |
| width        | 424px     |          |
| height       | 300px     |          |
| angle        | 0 deg     |          |
| opacity      | 1         |          |
| border-width | 1px       |          |
| border       | 1px solid |          |
| color-border | #4C3DB2   |          |
| top          | 998px     | optional |
| left         | 356px     | optional |

# Элементы разметки шапки

## header-elements (parent header)

| param  | value         | describe |
| ------ | ------------- | -------- |
| width  | 1120px        |          |
| height | 29px          |          |
| margin | 47px 0 40px 0 |          |
| gap    | 40px          |          |

## logo (parent header-elements)

### layout

| param       | value | describe |
| ----------- | ----- | -------- |
| width       | 128px |          |
| height      | 29px  |          |
| margin-left | 0     |          |

### content

| param   | value    | describe |
| ------- | -------- | -------- |
| content | Bookshop |          |

### Typography

| param          | value      | describe |
| -------------- | ---------- | -------- |
| font-family    | Montserrat |          |
| font-weight    | 700        |          |
| font-size      | 24px       |          |
| leading-trim   | NONE       |          |
| line-height    | 100%       |          |
| leading-trim   | NONE       |          |
| letter-spacing | 0%         |          |
| color          | #1C2A39    |          |

## menu (parent header-elements)

### lauout

| param    | value  | describe |
| -------- | ------ | -------- |
| width    | 372px  |          |
| height   | 12px   |          |
| angle    | 0 deg  |          |
| opacity  | 1      |          |
| vertical | medium |          |

### Typography

| param          | value      | describe   |
| -------------- | ---------- | ---------- |
| font-family    | Montserrat |            |
| font-weight    | 700        | not active |
| font-weight    | 900        | active     |
| font-size      | 10px       |            |
| leading-trim   | NONE       |            |
| line-height    | 100%       |            |
| letter-spacing | 0%         |            |
| text-transform | uppercase  |            |
| color          | #1C2A39    |            |

### contents

| param          | value              | describe |
| -------------- | ------------------ | -------- |
| content1       | books              |          |
| content2       | audiobooks         |          |
| content3       | Stationery & gifts |          |
| content4       | blog               |          |
| width-content1 | 39px               |          |
| width-content2 | 74px               |          |
| width-content3 | 109px              |          |
| width-content4 | 30px               |          |

## icons (parent header-elements)

### layout

| param        | value  | describe |
| ------------ | ------ | -------- |
| width        | 121px  |          |
| height       | 17px   |          |
| angle        | 0 deg  |          |
| opacity      | 1      |          |
| vertical     | medium |          |
| margin-right | 0      |          |

### contents

| param          | value            | describe |
| -------------- | ---------------- | -------- |
| icon-account   | img/user.svg     |          |
| icon-find      | img/search.svg   |          |
| icom-cart      | img/shop_bag.svg |          |
| width-account  | 12px             |          |
| width-find     | 15px             |          |
| width-cart     | 14px             |          |
| height-account | 15px             |          |
| height-find    | 15px             |          |
| height-cart    | 17px             |          |

# button (parent grid-row4)

### layout

| param        | value   | describe |
| ------------ | ------- | -------- |
| width        | 176px   |          |
| height       | 45px    |          |
| margin-left  | 581px   |          |
| angle        | o deg   |          |
| opacity      | 1       |          |
| border-width | 1px     |          |
| border-color | #4C3DB2 |          |

### title

| param        | value   | describe |
| ------------ | ------- | -------- |
| width        | 53px    |          |
| height       | 10px    |          |
| text-alighn  | centre  |          |
| angle        | o deg   |          |
| opacity      | 1       |          |
| vertical     | middle  |          |
| border-color | #4C3DB2 |          |

# slider.json

```json
const sliders = [
  {
    id: 0,
    img: "/img/people.png",
    scale: 1,
    background: 0,
    title: ["up to", "60", "%"],
  },
  {
    id: 1,
    img: "/img/top.png",
    scale: 1,
    background: none,
    title: ["top", "10", "books", "for entrepreneurs"],
  },
  {
    id: 2,
    img: "leaves_trees.png",
    scale: 1,
    background: none,
    title: ["OUR cozy books Selection"],
  },
]
```

# Кнопки/точки переключенния слайдов

## Сепаратор (parent grid-separator)

### layout

| param      | value  | describe |
| ---------- | ------ | -------- |
| width      | 56px   |          |
| height     | 12px   |          |
| horizontal | centre |          |
| vertical   | middle |          |
| gap        | 10px   |          |

### ellipce

| param      | value    | describe   |
| ---------- | -------- | ---------- |
| width      | 12px     |            |
| height     | 12px     |            |
| background | #9E98DC  | active     |
| background | #EFEEF6; | not active |

# Слайды

## People

### Typography common

| param          | value     | describe |
| -------------- | --------- | -------- |
| font           | monserrat |          |
| opacity        | 1         |          |
| angle          | 0 deg     |          |
| leading-trim   | NONE      |          |
| line-height    | 100%      |          |
| letter-spacing | 0%        |          |
| text-align     | center    |          |

## image position

### slider-people

| param       | value           | describe |
| ----------- | --------------- | -------- |
| width       | 1120px          |          |
| height      | 702px           |          |
| background  | #FFE0E2         |          |
| box-shadow  | 0px 6px 59p 0px |          |
| transparent | #35315414       |          |

### people.png

| param      | value                  | describe |
| ---------- | ---------------------- | -------- |
| width      | 1016px                 |          |
| height     | 452px                  |          |
| margin     | 228px 52px 21.5px 52px | srart    |
| background | #FFE0E2                |          |

### content-1 (parent typography-common)

| param          | value                 | describe |
| -------------- | --------------------- | -------- |
| width          | 266px                 |          |
| height         | 30px                  |          |
| margin         | 69px 427px auto 427px |          |
| content        | Black friday sale     |          |
| weight         | 600                   |          |
| size           | 25px                  |          |
| text-transform | uppercase             |          |
| color          | #1C2A39               |          |

### content-2

| param               | value                  | describe |
| ------------------- | ---------------------- | -------- |
| width               | 170px                  |          |
| height              | 78px                   |          |
| margin              | 104px 642px auto 308px |          |
| content             | up to                  |          |
| weight              | 700                    |          |
| size                | 60px                   |          |
| text-transform      | lowercase              |          |
| color-main          | #FFFFFF                |          |
| color-shadow        | #534FD2                |          |
| shift-shadow-right  | 6px                    |          |
| shift-shadow-bottom | 6px                    |          |

### content-3

| param               | value                 | describe |
| ------------------- | --------------------- | -------- |
| width               | 247px                 |          |
| height              | 222px                 |          |
| margin              | 79px 541px auto 476px |          |
| content             | 60                    |          |
| weight              | 900                   |          |
| size                | 182px                 |          |
| text-transform      | uppercase             |          |
| color-main          | #FFFFFF               |          |
| color-shadow        | #534FD2               |          |
| shift-shadow-right  | 13px                  |          |
| shift-shadow-bottom | 13px                  |          |

## content-4

| param               | value                  | describe |
| ------------------- | ---------------------- | -------- |
| width               | 58px                   |          |
| height              | 78px                   |          |
| margin              | 197px 325px auto 737px |          |
| content             | %                      |          |
| weight              | 700                    |          |
| size                | 60px                   |          |
| text-transform      | uppercase              |          |
| color-main          | #FFFFFF                |          |
| color-shadow        | #534FD2                |          |
| shift-shadow-right  | 6px                    |          |
| shift-shadow-bottom | 6px                    |          |

## top

### Typography common

| param          | value     | describe |
| -------------- | --------- | -------- |
| font           | monserrat |          |
| opacity        | 1         |          |
| angle          | 0 deg     |          |
| leading-trim   | NONE      |          |
| line-height    | 100%      |          |
| letter-spacing | 0%        |          |
| text-align     | center    |          |

## image position

### slider-top

| param  | value  | describe |
| ------ | ------ | -------- |
| width  | 1120px |          |
| height | 702px  |          |

### top.png

| param  | value  | describe |
| ------ | ------ | -------- |
| width  | 1120px |          |
| height | 702px  |          |
| margin | 0      |          |

### content-1 (parent typography-common) - как и для первого слайда - strict

| param          | value                 | describe |
| -------------- | --------------------- | -------- |
| width          | 293px hug             |          |
| height         | 30px                  |          |
| margin         | 243px auto auto 767px |          |
| content        | for entrepreneurs     |          |
| weight         | 600                   |          |
| size           | 25px                  |          |
| text-transform | uppercase             |          |
| color          | #1C2A39               |          |

### content-2

| param               | value                | describe |
| ------------------- | -------------------- | -------- |
| width               | 111px hug            |          |
| height              | 78px                 |          |
| margin              | 73px auto auto 103px |          |
| content             | top                  |          |
| weight              | 900                  |          |
| size                | 160px                |          |
| text-transform      | uppercase            |          |
| color-main          | #FFFFFF              |          |
| color-shadow        | #534FD2              |          |
| shift-shadow-right  | 13px                 |          |
| shift-shadow-bottom | 13px                 |          |

### content-3

| param               | value                 | describe |
| ------------------- | --------------------- | -------- |
| width               | 189px hug             |          |
| height              | 208px                 |          |
| margin              | 112px auto auto 103px |          |
| content             | 10                    |          |
| weight              | 900                   |          |
| size                | 182px                 |          |
| text-transform      | uppercase             |          |
| color-main          | #FFFFFF               |          |
| color-shadow        | #534FD2               |          |
| shift-shadow-right  | 13px                  |          |
| shift-shadow-bottom | 13px                  |          |

## content-4

| param               | value                 | describe |
| ------------------- | --------------------- | -------- |
| width               | 164px hug             |          |
| height              | 66px                  |          |
| margin              | 214px auto auto 307px |          |
| content             | books                 |          |
| weight              | 700                   |          |
| size                | 50px                  |          |
| text-transform      | lowercase             |          |
| color-main          | #FFFFFF               |          |
| color-shadow        | #534FD2               |          |
| shift-shadow-right  | 5px                   |          |
| shift-shadow-bottom | 5px                   |          |

## leaves-trees

### Typography common (то же, что и для роедыдущих слайдов)

| param          | value     | describe |
| -------------- | --------- | -------- |
| font           | monserrat |          |
| opacity        | 1         |          |
| angle          | 0 deg     |          |
| leading-trim   | NONE      |          |
| line-height    | 100%      |          |
| letter-spacing | 0%        |          |
| text-align     | center    |          |

## image position

### slider-leaves_trees

| param  | value  | describe |
| ------ | ------ | -------- |
| width  | 1120px |          |
| height | 702px  |          |

### leaves|\_trees.png

| param  | value  | describe |
| ------ | ------ | -------- |
| width  | 1120px |          |
| height | 702px  |          |
| margin | 0      |          |

### content-1 (parent typography-common) - как и для первого слайда - strict

| param          | value                 | describe |
| -------------- | --------------------- | -------- |
| width          | 278px hug             |          |
| height         | 55px                  |          |
| margin         | 148px auto auto 425px |          |
| content        | Check out             |          |
| weight         | 600                   |          |
| size           | 45px                  |          |
| text-transform | uppercase             |          |
| color          | #1C2A39               |          |

### content-2

| param               | value                    | describe |
| ------------------- | ------------------------ | -------- |
| width               | 653px strict!!!          |          |
| height              | 342px                    |          |
| margin              | 212px auto auto 233px    |          |
| content             | OUR cozy books Selection |          |
| weight              | 900                      |          |
| size                | 90px                     |          |
| text-transform      | uppercase                |          |
| color-main          | #FFFFFF                  |          |
| color-shadow        | #7B1010                  |          |
| shift-shadow-right  | 10px                     |          |
| shift-shadow-bottom | 10px                     |          |

## count-cart

### block-ellipse привязка parent header

| param   | value                | describe    |
| ------- | -------------------- | ----------- |
| width   | 13px                 |             |
| height  | 13px                 |             |
| margin  | 61px 155px auto auto |             |
| z-index | 1                    | поверх cart |

### ellipce (parent block-ellipce)

| param       | value   | describe    |
| ----------- | ------- | ----------- |
| width       | 13px    |             |
| height      | 13px    |             |
| margin      | 0       |             |
| z-index     | 1       | поверх cart |
| breakground | #FF353A |             |

### digite (parent block-ellipce)

| param          | value      | describe       |
| -------------- | ---------- | -------------- |
| width          | 6px        |                |
| height         | 12px       |                |
| horizontal     | center     |                |
| z-index        | 1          | поверх ellipce |
| content        | 1          |                |
| breakground    | #FFFFFF    |                |
| font-family    | Montserrat |                |
| font-weight    | 500        |                |
| font-style     | Medium     |                |
| font-size      | 10px       | поверх ellipce |
| leading-trim   | NONE       |                |
| line-height    | 100%       |                |
| letter-spacing | 0%         |                |
| text-transform | capitalize |                |

# actors

## Content

### Typography common

| param          | value     | describe |
| -------------- | --------- | -------- |
| font           | monserrat |          |
| opacity        | 1         |          |
| angle          | 0 deg     |          |
| leading-trim   | NONE      |          |
| line-height    | 100%      |          |
| letter-spacing | 0%        |          |
| text-align     | left      |          |

### стрелка-указатель общие параметры

| param  | value | describe |
| ------ | ----- | -------- |
| width  | 55px  |          |
| height | 12px  |          |

## elm-1 (parent main-grid)

| param       | value                | describe      |
| ----------- | -------------------- | ------------- |
| width       | 149px                |               |
| height      | 204px                |               |
| margin      | 79px auto auto -63px |               |
| z-index     | 1                    | поверх slider |
| breakground | #9E98DC              |               |

### content-elm-1 (parent elm-1)

| param  | value                | describe |
| ------ | -------------------- | -------- |
| width  | 109px                |          |
| height | 66px                 |          |
| margin | 102px 20px auto 20px |          |

### typography-elm-1 (type: strict)

| param      | value                  | describe |
| ---------- | ---------------------- | -------- |
| weight     | 700                    |          |
| size       | 18px                   |          |
| case       | uppercase              |          |
| content    | Change old book on new |          |
| text-align | left                   |          |

### стрелка-указатель (см общие параметры parent elm-1)

| param  | value              | describe |
| ------ | ------------------ | -------- |
| margin | 4px 20px auto 20px |          |
| path   | /img/direct.svg    |          |

## elm-2 (parent main-grid)

| param       | value                 | describe |
| ----------- | --------------------- | -------- |
| width       | 158px                 |          |
| height      | 273px                 |          |
| margin      | 475px -21px auto 23px |          |
| breakground | #FF8FE6               |          |

### content-elm-2 (parent elm-2)

| param  | value                | describe |
| ------ | -------------------- | -------- |
| width  | 69px                 |          |
| height | 88px                 |          |
| margin | 102px 20px auto 20px |          |

### typography-elm-2 (type: strict) - точно так же как в elm-1

| param   | value              | describe |
| ------- | ------------------ | -------- |
| content | top 100 books 2022 |          |

### стрелка-указатель (см общие параметры parent elm-1)

| param  | value              | describe |
| ------ | ------------------ | -------- |
| margin | 4px 20px auto 20px |          |
| path   | /img/direct.svg    |          |

# category

## container category (parent main-grig row-3)

| param            | value      | describe     |
| ---------------- | ---------- | ------------ |
| width            | 416px      |              |
| height           | 710px      |              |
| z-index          | 1          | под карточки |
| content          | 1          |              |
| breakground      | #EFEEF6    |              |
| font-family      | Montserrat |              |
| font-weight      | 700        | active       |
| font-size        | 16px       | active       |
| font-color       | #1C2A39    | active       |
| text-width       | hug        |              |
| text-height      | 40px       | active       |
| font-weight      | 500        | not active   |
| font-size        | 12px       | not active   |
| font-color       | #5C6A79    | not active   |
| text-height      | 15px       | not active   |
| leading-trim     | NONE       |              |
| line-height      | 100%       |              |
| letter-spacing   | 0%         |              |
| text-transform   | capitalize |              |
| font-style       | Medium     |              |
| padding-left     | 160px      |              |
| margin-top       | 47px       |              |
| gap list         | 23px       |
| count categories | 16         |              |
| top              | -46px      |              |
| left             | -160px     |              |

# cards

## card (parent grid) - уже создан, есть

grid-column 1fr 1fr

### book-cover (parent grid-column--1)

| param   | value | describe |
| ------- | ----- | -------- |
| width   | 100%  |          |
| height  | 100%  |          |
| opacity | 1     |          |
| angle   | 0 deg |          |
| scale   | 1     |          |

### book-info (parent grid-column--2)

| param      | value  | describe |
| ---------- | ------ | -------- |
| width      | 176px  |          |
| height     | 203px  |          |
| vertical   | medium |          |
| horizontal | right  |          |

### book-author (parent book-info) class: book-info

| param          | value         | describe  |
| -------------- | ------------- | --------- |
| width          | 100%          |           |
| height         | 14px          |           |
| top            | 0px           |           |
| margin-bottom  | 4px           |           |
| taxt-align     | left          |           |
| font-family    | Open Sans     | book-info |
| font-weight    | 400           |           |
| font-size      | 10px          |           |
| leading-trim   | NONE          |           |
| line-height    | 100%          |           |
| letter-spacing | 0%            |           |
| text-transform | capitalize    |           |
| content        | Aldous Huxley |           |
| color          | #5C6A79       |           |

### book-name (parent book-info)

| param          | value           | describe  |
| -------------- | --------------- | --------- |
| width          | 100%            |           |
| height         | 20px            |           |
| margin-bottom  | 4px             |           |
| taxt-align     | left            |           |
| font-family    | Montserrat      | book-name |
| font-weight    | 700             |           |
| font-size      | 16px            |           |
| leading-trim   | NONE            |           |
| line-height    | 100%            |           |
| letter-spacing | 0%              |           |
| text-transform | capitalize      |           |
| content        | Brave new world |           |
| color          | #1C2A39         |           |

### book-rating (parent book-info)

| param         | value | describe |
| ------------- | ----- | -------- |
| width         | 100%  |          |
| height        | 14px  |          |
| margin-bottom | 16px  |          |
| taxt-align    | left  |          |

### book-count-stars (parent book-rating)

| param       | value | describe |
| ----------- | ----- | -------- |
| width       | 64px  |          |
| gap         | 1     |          |
| margin-left | 0     |          |

### star (parent book-count-stars)

| param    | value   | describe                |
| -------- | ------- | ----------------------- |
| width    | 12px    |                         |
| height   | 12px    |                         |
| vernical | medium  |                         |
| color    | #F2C94C | active                  |
| color    | #EEEDF5 | not active              |
| count    | 5       | 4 active + 1 not acnive |

### count-review (parent book-count-stars)

| param      | value       | describe       |
| ---------- | ----------- | -------------- |
| width      | hug         |                |
| height     | 12px        |                |
| vernical   | medium      |                |
| content    | 1,3M review |                |
| typography | book-info   | см book-author |

### book-describe (parent book-info)

| param         | value                                                                                                     | describe       |
| ------------- | --------------------------------------------------------------------------------------------------------- | -------------- |
| width         | hug                                                                                                       |                |
| height        | 39px                                                                                                      |                |
| margin-bottom | 16px                                                                                                      |                |
| text-align    | left                                                                                                      |                |
| content       | dystopian novel written in 1931 by English author Aldous Huxley, and published in 1932. Largely set in... |                |
| typography    | book-info                                                                                                 | см book-author |

### book-price (parent book-info)

| param          | value     | describe     |
| -------------- | --------- | ------------ |
| width          | hug       |              |
| height         | 16px      |              |
| margin-bottom  | 16px      |              |
| text-align     | left      |              |
| content        | $12.43    |              |
| typography     | book-mame | см book-name |
| font-size      | 13px      | modify       |
| text-transform | uppercase | modify       |

### book-button (parent book-info) class load-more-btn
