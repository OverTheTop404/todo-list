import { createGlobalStyle } from 'styled-components'

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
        color: #fff;
        font-family: "Glober Bold", sans-serif;
    }
    h2,h3{
        color: #fff;
        font-family: globersemibold, sans-serif;
    }
    /* Modal.css */
    .ReactModal__Overlay {
        opacity: 0;
        transition: opacity 300ms ease-in-out;
        background-color: rgba(0, 0, 0, 0.5) !important;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ReactModal__Content:focus {
        outline: none;
        
    }
    .ReactModal__Overlay--after-open {
        opacity: 1;
    }

    .ReactModal__Overlay--before-close {
        opacity: 0;
    }

    .ReactModal__Content {
        position: relative;
        background: white;
        border-radius: 8px;
        padding: 20px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        //overflow-y: auto;
        transform: translateY(-50px);
        transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        opacity: 0;
    }

    .ReactModal__Content--after-open {
        transform: translateY(0);
        opacity: 1;
    }

    .ReactModal__Content--before-close {
        transform: translateY(-50px);
        opacity: 0;
    }
    .modal-content-inner h2{ 
        color: #000;
        margin-bottom: 10px;
    }
    /* Кастомные классы */
    .modal-content {
        background: white;
        border-radius: 12px;
        padding: 0;
        border: none;
        max-width: 600px;
        width: 90%;
    }

    .modal-overlay {
        background-color: rgba(0, 0, 0, 0.6) !important;
        z-index: 1000;
    }

    /* Дополнительные стили для содержимого */
    .modal-header {
        padding: 20px 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-body {
        padding: 20px;
    }

    .modal-footer {
        padding: 0 20px 20px;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }

    .modal-close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 5px;
        color: #666;
    }

    .modal-close-btn:hover {
        color: #000;
    }

    .modal-title {
        margin: 0;
        color: #333;
        font-size: 1.5rem;
    }
`
