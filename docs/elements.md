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

##
