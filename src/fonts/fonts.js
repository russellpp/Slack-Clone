import { createGlobalStyle } from "styled-components";
import HellixBoldWoff from "./Hellix-Bold.woff";
import HellixBoldWoff2 from "./Hellix-Bold.woff2";

export default createGlobalStyle`
    @font-face {
        font-family: 'HellixBold';
        src: local('HellixBold'), local('HellixBold'), url(${HellixBoldWoff}), url(${HellixBoldWoff2})
    }

`;
