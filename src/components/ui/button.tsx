'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <StyledWrapper>
      <button className={`btn-31${className ? ` ${className}` : ''}`} {...props}>
        <span className="text-container">
          <span className="text">{children}</span>
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn-31,
  .btn-31 *,
  .btn-31 :after,
  .btn-31 :before,
  .btn-31:after,
  .btn-31:before {
    border: 0 solid;
    box-sizing: border-box;
  }

  .btn-31 {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: #000;
    background-image: none;
    color: #fff;
    cursor: pointer;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
      Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 100%;
    font-weight: 900;
    line-height: 1.5;
    margin: 0;
    -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
    padding: 0;
  }

  .btn-31:disabled {
    cursor: default;
  }

  .btn-31:-moz-focusring {
    outline: auto;
  }

  .btn-31 svg {
    display: block;
    vertical-align: middle;
  }

  .btn-31 [hidden] {
    display: none;
  }

  .btn-31 {
    border-width: 1px;
    padding: 1rem 2rem;
    position: relative;
    text-transform: uppercase;
    border-radius: 90px;
  }

  .btn-31:before {
    --progress: 100%;
    background: #fff;
    -webkit-clip-path: polygon(
      100% 0,
      var(--progress) var(--progress),
      0 100%,
      100% 100%
    );
    clip-path: polygon(
      100% 0,
      var(--progress) var(--progress),
      0 100%,
      100% 100%
    );
    content: "";
    inset: 0;
    position: absolute;
    transition: -webkit-clip-path 0.2s ease;
    transition: clip-path 0.2s ease;
    transition: clip-path 0.2s ease, -webkit-clip-path 0.2s ease;
  }

  .btn-31:hover:before {
    --progress: 0%;
  }

  .btn-31 .text-container {
    display: block;
    overflow: hidden;
    position: relative;
  }

  .btn-31 .text {
    display: block;
    font-weight: 900;
    mix-blend-mode: difference;
    position: relative;
  }

  .btn-31:hover .text {
    -webkit-animation: move-up-alternate 0.3s ease forwards;
    animation: move-up-alternate 0.3s ease forwards;
  }

  @-webkit-keyframes move-up-alternate {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(80%);
    }

    51% {
      transform: translateY(-80%);
    }

    to {
      transform: translateY(0);
    }
  }

  @keyframes move-up-alternate {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(80%);
    }

    51% {
      transform: translateY(-80%);
    }

    to {
      transform: translateY(0);
    }
  }
`;

export default Button;
