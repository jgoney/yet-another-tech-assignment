import type { CSSProp } from "styled-components";

type Name = "h1" | "h2" | "h3" | "th";

// `h1` [Fjalla One 700](https://fonts.google.com/?query=Fjalla+One) `48px / 1.3`
const h1: CSSProp = `
    font-family: "Fjalla One", sans-serif;
    font-size: 48px;
    font-weight: 700;
    font-style: normal;
    line-height: 1.3;
`;

// `h2` [Libre Franklin 700](https://fonts.google.com/?query=Libre+Franklin) `64px`
const h2: CSSProp = `
    font-family: 'Libre Franklin Variable', sans-serif;
    font-size: 64px;
    font-weight: 700;
    font-optical-sizing: auto;
    font-style: normal;
`;

// `h3` [Libre Franklin 400](https://fonts.google.com/?query=Libre+Franklin) `10px / 1.2`
const h3: CSSProp = `
    font-family: 'Libre Franklin Variable', sans-serif;
    font-size: 10px;
    font-weight: 400;
    font-optical-sizing: autobun run ;
    font-style: normal;
    line-height: 1.2;
`;

// `th` [Work Sans 700](https://fonts.google.com/?query=Work+Sans) `16px`
const th: CSSProp = `
    font-family: 'Work Sans Variable', sans-serif;
    font-size: 16px;
    font-weight: 700;
    font-optical-sizing: auto;
    font-style: normal;
`;

const FontDefs: Record<Name, CSSProp> = {
  h1,
  h2,
  h3,
  th,
};

export { FontDefs };
