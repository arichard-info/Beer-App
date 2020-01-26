import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap');
    html{
        font-size: 62.5%;
    }
    body {
        margin: 0;
        font-family: ${props => props.theme.fonts.sansSerif};
        font-size: 1.6rem;
        color: ${props => props.theme.colors.text};
        *{
            box-sizing: border-box;
        }
    }
    #root{
        height: 100vh;
    }
  
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }

    h1{
        font-size: 2.6rem;
        font-weight: 700;
        color: ${props => props.theme.colors.black};
    }

    p{
        font-size: 1.4rem;
    }

    input[type=submit], .cta {
        display: block;
        text-align: center;
        text-decoration: none;
        font-size: 1.6rem;
        padding: 1rem;
        width: 100%;
        border: none;
        border-radius: 50rem;
        color: ${props => props.theme.colors.white};
        font-weight: ${props => props.theme.fw.semibold};
        background-color: ${props => props.theme.colors.primary};
        font-family: ${props => props.theme.fonts.sansSerif};

        &.bg-white{
            border: .1rem solid ${props => props.theme.colors.black};
            color: ${props => props.theme.colors.black};
            background-color: transparent;
        }
    }
  
`;

export default GlobalStyle;
