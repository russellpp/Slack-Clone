import { createGlobalStyle } from "styled-components";
import HellixBoldWoff from "./Hellix-Bold.woff";
import HellixBoldWoff2 from "./Hellix-Bold.woff2";
import ProximaNova from "./ProximaNova-Light.woff2"
import ProximaNovaReg from "./ProximaNova-Regular.woff2"
import ProximaNovaBold from "./ProximaNova-Bold.woff2"

export default createGlobalStyle`
    @font-face {
        font-family: 'HellixBold';
        src: local('HellixBold'), local('HellixBold'), url(${HellixBoldWoff}), url(${HellixBoldWoff2})
    }
    @font-face {
        font-family: 'ProximaNova';
        src: local('ProximaNova'), url(${ProximaNova}) 
    }
    @font-face {
        font-family: 'ProximaNovaReg';
        src: local('ProximaNovaReg'), url(${ProximaNovaReg}) 
    }
    @font-face {
        font-family: 'ProximaNovaBold';
        src: local('ProximaNovaBold'), url(${ProximaNovaBold}) 
    }

`;
