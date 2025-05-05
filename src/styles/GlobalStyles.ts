import { createGlobalStyle } from 'styled-components';
import { COLORS, TILE_WIDTH } from '../utils/constants';

const GlobalStyles = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* GLOBAL STYLES */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;

  --color-gray-100: ${COLORS.gray[100]};
  --color-gray-300: ${COLORS.gray[300]};
  --color-gray-400: ${COLORS.gray[400]};
  --color-gray-500: ${COLORS.gray[500]};
  --color-gray-600: ${COLORS.gray[600]};
  --color-gray-700: ${COLORS.gray[700]};
  --color-gray-800: ${COLORS.gray[800]};
  --color-primary: ${COLORS.primary};
  --color-primary-dark: ${COLORS.primaryDark};
  --color-tile-light: ${COLORS.lightTile};
  --color-tile-light-selected: ${COLORS.lightTileSelected};
  --color-tile-dark: ${COLORS.darkTile};
  --color-tile-dark-selected: ${COLORS.darkTileSelected};

  --tile-width: ${TILE_WIDTH};
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
    interpolate-size: allow-keywords;
  }
}

body {
  line-height: 1.5;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
  font-family: -apple-system, system-ui, Helvetica, Arial, sans-serif;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

p {
  text-wrap: pretty;
  hyphens: auto;
  -webkit-hyphens: auto;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

a {
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

#root,
#__next {
  isolation: isolate;
  height: 100%;
}


`;

export default GlobalStyles;
