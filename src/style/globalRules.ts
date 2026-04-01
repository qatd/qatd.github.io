import { createGlobalStyle } from "styled-components"

export const styleVariables = {
    color1: '#484848',
    color2: '#f1f1f1',
    color3_dark: '#f1f1f110',
    color3_light: '#48484810'
}

export const GlobalStyle = createGlobalStyle`
    /* ─── CSS variables ─── */
    :root {
        --color1: #484848;
        --color2: #f1f1f1;
        --color3: #f1f1f110;

        --border1: .02rem solid var(--color2);
        --border2: .05rem solid var(--color2);
        --border3: .08rem solid var(--color2);
        --border4: .1rem solid var(--color3);
        --border5: .2rem solid var(--color1);
        --border6: solid .15rem var(--color3);
        --borderShadow1: 0rem .02rem 0rem 0rem var(--color2);
        --borderShadow2: 0rem .05rem 0rem 0rem var(--color2);
        --borderShadow3: 0rem .08rem 0rem 0rem var(--color2);
        --borderShadow4: 0rem 0rem 0rem .1rem var(--color3);
        --borderShadow5: 0rem 0rem 0rem .1rem var(--color3);

        transition: .15s ease-in-out 0s;
    }

    @media (prefers-color-scheme: light) {
        :root {
            --color1: #f1f1f1;
            --color2: #484848;
            --color3: #48484810;
        }
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color1: #2d2d2d;
            --color2: #f1f1f1;
            --color3: #f1f1f110;
        }
    }

    /* ─── Global element styles ─── */
    body {
        font-family: "Poppins", sans-serif, Arial, Helvetica, sans-serif;
        margin: 0;
        background: var(--color1);
        font-size: 1rem;
        color: var(--color2);
        font-weight: 300;

        & #root {
            display: flex;
            flex-direction: column;
        }
    }

    a {
        text-decoration: none;
        color: var(--color2);
    }

    img {
        max-width: 20rem;
    }

    ul {
        list-style-type: circle;
        line-height: 1.8rem;
    }

    p {
        margin: 0;
    }

    h1 { font-size: 3rem; margin: 0; }
    h2 { font-size: 2rem; margin: 0; }
    h3 { font-size: 1.5rem; margin: 0; }
    h4 { font-size: 1.2rem; margin: 0; }

    iframe {
        border-radius: .7rem;
    }

    button {
        appearance: none;
        border: none;
        background: none;
        padding: 0;
        margin: 0;
    }

    /* ─── Utility classes ─── */
    .divider {
        border-bottom: var(--border1);
    }

    .divider2 {
        border-bottom: var(--border4);
        width: 70%;
        border-radius: 3rem;
        align-self: center;
        transition: .1s ease-in-out 0s;
    }

    .divider3 {
        border-bottom: var(--border5);
        width: 70%;
        border-radius: 3rem;
        align-self: center;
        transition: .1s ease-in-out 0s;
    }

    .sectionBorder {
        border-top: var(--border3);
    }

    /* ─── Media queries ─── */
    @media (prefers-color-scheme: dark) {
        .buttonWithIcon > img { filter: invert(1); }
    }

    @media (max-width: 700px) {
        h2 { font-size: 1.7rem; }
    }
`
