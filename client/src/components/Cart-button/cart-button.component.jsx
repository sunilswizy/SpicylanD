import React from "react";

import PropTypes from "prop-types";
import ButtonUnstyled, {
	buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";

const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
	const { children, cart, ...other } = props;

	const width = cart ? 250 : 150;

	return (
		<svg width={width} height='50' {...other} ref={ref}>
			<polygon points={`0,50 0,0 ${width},0 ${width},50`} className='bg' />
			<polygon
				points={`0,50 0,0 ${width},0 ${width},50`}
				className='borderEffect'
			/>
			<foreignObject x='0' y='0' width={width} height='50'>
				<div className='content'>{children}</div>
			</foreignObject>
		</svg>
	);
});

ButtonRoot.propTypes = {
	children: PropTypes.node,
};

const blue = {
	50: "#ffffff",
	100: "#d6eece",
	200: "#abdd9d",
	400: "#48b83b",
	500: "#48b83b",
	600: "#119811",
	800: "#047a04",
	900: "#006b00",
};

const CustomButtonRoot = styled(ButtonRoot)(
	({ theme, dialog, reserved }) => `
    overflow: visible;
    cursor: pointer;
    --main-color: ${reserved ? "red" : blue[600]} ;
    --hover-color: ${theme.palette.mode === "light" ? blue[50] : blue[900]};
    --active-color: ${theme.palette.mode === "light" ? blue[100] : blue[800]};
  
    & polygon {
      fill: transparent;
      transition: all 800ms ease;
      pointer-events: none;
    }
    
    & .bg {
      stroke: var(--main-color);
      stroke-width: 1;
      filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
      fill: ${reserved ? "red" : dialog ? "#119811" : "transparent"};
    }
  
    & .borderEffect {
      stroke:  #abdd9d;
      stroke-width: ${dialog ? 0 : 2} ;
      stroke-dasharray: ${dialog ? 0 : "150 600"};
      stroke-dashoffset: ${dialog ? 0 : 150};
      fill: transparent;
    }
  
    &:hover,
    &.${buttonUnstyledClasses.focusVisible} {
      .borderEffect {
        stroke-dashoffset: -600;
      }
  
      .bg {
        fill: ${reserved ? "red" : "#119811"};
      }
    }
  
    &:focus,
    &.${buttonUnstyledClasses.focusVisible} {
      outline: 2px solid ${
				theme.palette.mode === "dark" ? blue[400] : blue[200]
			};
      outline-offset: 2px;
    }
  
    &.${buttonUnstyledClasses.active} { 
      & .bg {
        fill: var(--active-color);
        transition: fill 300ms ease-out;
      }
    }
  
    & foreignObject {
      pointer-events: none;
  
      & .content {
        width: 100%;
        font-size:1.5rem;
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 500;
        line-height: 1.5;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(231, 231, 231);
        text-transform: uppercase;
      }
  
      & svg {
        margin: 0 5px;
      }
    }`
);

const SvgButton = React.forwardRef(function SvgButton(props, ref) {
	return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});

const CartButton = ({ children, ...others }) => {
	return <SvgButton {...others}>{children}</SvgButton>;
};

export default CartButton;
