import { createGlobalStyle } from 'styled-components'
import { MainContent } from './components/MainContent/MainContent'

function App() {
  return (
    <>
      <GlobalStyle />
      <MainContent />
    </>
  )
}

export default App

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    > a {
      text-decoration: none;
      color: #000
    }

    > button {
      border: none;
      background: transparent;
    }
  }

  #root {
    max-width: 1280px;
    margin: 0 auto;

    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
  }
`