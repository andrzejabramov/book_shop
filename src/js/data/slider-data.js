export const sliderData = [
  {
    id: 0,
    img: "/img/people.png",
    scale: 1,
    background: "#FFE0E2", // 👈 Сюда вставишь точный HEX из DevTools-пипетки
    blocks: [
      {
        text: "Black friday sale",
        style: "strict",
        pos: { margin: "59px 427px auto 427px", width: "hug" },
        // 👆 shadow нет → текст останется плоским
      },
      {
        text: "up to",
        style: "art",
        variant: "headline",
        transform: "lowercase",
        shadow: { x: 5, y: 5, color: "#534FD2" }, // 👈 Сдвиг и цвет
        pos: { margin: "104px 642px auto 308px", width: "hug" },
      },
      {
        text: "60",
        style: "art",
        variant: "display",
        shadow: { x: 13, y: 13, color: "#534FD2" },
        pos: { margin: "79px 541px auto 476px", width: "hug" },
      },
      {
        text: "%",
        style: "art",
        variant: "headline",
        transform: "uppercase",
        shadow: { x: 5, y: 5, color: "#534FD2" },
        pos: { margin: "197px 325px auto 737px", width: "hug" },
      },
    ],
  },
  {
    id: 1,
    img: "/img/top.png",
    scale: 1,
    posY: "15%",
    background: "transparent",
    blocks: [
      {
        text: "for entrepreneurs",
        style: "strict",
        transform: "uppercase",
        pos: { margin: "243px auto auto 767px", width: "hug" },
      },
      {
        text: "top",
        style: "art",
        variant: "headline",
        transform: "lowercase",
        shadow: { x: 5, y: 5, color: "#534FD2" },
        pos: { margin: "73px auto auto 83px", width: "hug" },
      },
      {
        text: "10",
        style: "art",
        variant: "display",
        transform: "uppercase",
        shadow: { x: 13, y: 13, color: "#534FD2" },
        pos: { margin: "112px auto auto 83px", width: "hug" },
      },
      {
        text: "books",
        style: "art",
        variant: "top-sub",
        transform: "lowercase",
        shadow: { x: 5, y: 5, color: "#534FD2" },
        pos: { margin: "214px auto auto 307px", width: "hug" },
      },
    ],
  },
  {
    id: 2,
    img: "/img/leaves_trees.png",
    scale: 1,
    background: "transparent",
    blocks: [],
  },
];
