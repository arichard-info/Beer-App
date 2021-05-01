import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap');
    html{
        font-size: 62.5%;
    }
    body {
        margin: 0;
        font-family: ${(props) => props.theme.fonts.sansSerif};
        font-size: 1.6rem;
        color: ${(props) => props.theme.colors.text};
        overscroll-behavior-y: none;
        overflow-y: scroll;
        height: 100%;
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
        color: ${(props) => props.theme.colors.black};
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 900;
        color: ${(props) => props.theme.colors.black};
    }

    p{
        font-size: 1.4rem;
    }

    input[type=submit], .cta {
        cursor: pointer;
        display: block;
        text-align: center;
        text-decoration: none;
        font-size: 1.6rem;
        padding: 1rem;
        width: 100%;
        border: none;
        border-radius: 50rem;
        color: ${(props) => props.theme.colors.white};
        font-weight: ${(props) => props.theme.fw.semibold};
        background-color: ${(props) => props.theme.colors.primary};
        font-family: ${(props) => props.theme.fonts.sansSerif};
        transition: all .2s ease;

        &:hover{
            background-color: #ff9900;
        }

        &:focus{
            outline: none;
            background-color: #ff9900;
            box-shadow: 0px 0px 1px 1px rgba(255,153,0,1);
        }

        &.bg-grey {
            background-color: #e8e8e8;
            color: ${(props) => props.theme.colors.black};
            border-color: #b5b5b5;
            &:hover{
                background-color: #FFEBBC;
            }
        }

        &.bg-white{
            border: .1rem solid ${(props) => props.theme.colors.black};
            color: ${(props) => props.theme.colors.black};
            background-color: transparent;

            &:hover{
                background-color: #e8e8e8;
                border-color: #e8e8e8;
            }

            &:focus{
                background-color: #e8e8e8;
                border-color: #e8e8e8;
                box-shadow: 0px 0px 1px 1px #e8e8e8;
            }
        }

        svg {
            margin-right: 1rem;
            margin-left: 1rem;
            font-size: 1.8rem;
        }
    }

    .vh {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: .1rem;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: .1rem;
    }
  
`;

export default GlobalStyle;
