import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
  
  .Dashboard {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #about-title {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #NewsSection {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #news-card {
    background-color: ${({ theme }) => theme.navBar};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #menu-label {
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #card-title {
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #navigation-bar {
    background-color: ${({ theme }) => theme.navBar};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #navbar-item:hover {
    background-color: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #navbar-item {
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #home-footer {
    background-color: ${({ theme }) => theme.navBar};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #StockChart {
    background-color: ${({ theme }) => theme.stockBody};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #stock-modal-section {
    background-color: ${({ theme }) => theme.navBar};
    transition: all 0.25s linear;
  }

  #hero-color {
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
  
  #StockInput {
    background-color: ${({ theme }) => theme.stockBody};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #FilterInput {
    background-color: ${({ theme }) => theme.stockBody};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #FilterInput::placeholder {
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #StockInput::placeholder {
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #menu-input {
    background-color: ${({ theme }) => theme.stockBody};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #menu-input::placeholder {
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #form-button {
    background-color: ${({ theme }) => theme.stockBody};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
  
  #burger {
    background-color: ${({ theme }) => theme.navBar};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }`;
