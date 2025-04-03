import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
    *,
    *::before,
    *::after{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        position: relative;
        margin: 0;
        font-family:
                -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
                Helvetica, "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji",
                "Segoe UI Symbol", "Segoe UI", "Twemoji Mozilla", "EmojiOne Color",
                "Android Emoji", sans-serif;
        
    }
    input, textarea, button {
        outline: none !important;
        box-shadow: none;
        font-family:
                -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
                Helvetica, "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji",
                "Segoe UI Symbol", "Segoe UI", "Twemoji Mozilla", "EmojiOne Color",
                "Android Emoji", sans-serif;
    }
    ul{
        list-style: none;
    }
    h1{
        //font-family: "Glober Bold", sans-serif;
    }
    h2,h3{
        //font-family: globersemibold, sans-serif;
    }
`;
