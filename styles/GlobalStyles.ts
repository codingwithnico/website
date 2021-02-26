import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

:root {
  --primaryColor: #8352FD;
  --primaryColorDark: #4823c9;
  --primaryColorLight: #b981ff;

  --secondaryColor: #f020d8;

  --tertiaryColor: #00e5ff;

  --textColor: #E3E8FF;

  --successColor: #69f0ae;

  --systemFont: "Inter", sans-serif;
}

@media (min-width: 500px) {
  :root {
    --mobileWidth: 500px;
  }
}


*, *:before, *:after {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
  height: 100%;
  min-height: 100%;

  @media (max-width: 1500px) {
    font-size: 56.25%;
  }

  @media (max-width: 1024px) {
    font-size: 52.5%;
  }
}

#__next {
  height: 100%;
  min-height: 100%;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  min-height: 100%;
  font-family: var(--systemFont);
  color: #f4f4f4;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  background: #001;
}


h1, h2, h3, h4, h5 {
  margin-top: 0;
  color: #333;
  font-family: 'Space Grotesk', sans-serif;
}


input {
  font-family: inherit;
}

p {
  font-size: 1.8rem;
}

a {
  text-decoration: none;
}

.language-jsx {
  background-color: #112!important;
  display: block;
  margin: 2rem 0;
  margin-right: -1em;
  margin-left: -1em;
  padding: 1.5em 0;
  padding-right: 1em;
  padding-left: 2em;
  border-left: 0.25em solid #f99;
  font-size: 1.8rem !important;

  @media (max-width: 500px) {
    max-width: 100%;
    margin: 0;
    overflow: auto;
    padding-top: 6rem;
  }
}
`

export default GlobalStyles
