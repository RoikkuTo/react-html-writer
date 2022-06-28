import styled, { css, keyframes } from 'styled-components'

const shared = css`
	* {
		font-family: ${props => props.theme.fontFamily} !important;
		font-size: ${props => props.theme.fontSize} !important;
	}

	pre,
	span {
		margin: 0;
		white-space: pre-wrap;
	}
`

const blink = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`

export const TagContainer = styled.div<{ isOpen: boolean; isSelected: boolean }>`
	${shared}

	display: flex;
	flex-wrap: wrap;
	flex-direction: ${props => (props.isOpen ? 'column' : 'row')};

	${props =>
		props.isSelected &&
		css`
			background: ${props.theme.selectBackgroundColor} !important;

			* {
				color: ${props.theme.selectColor} !important;
			}
		`}

	& > div:nth-child(2) {
		${props => (props.isOpen ? `margin-left: ${props.theme.tagTabsize};` : `display: flex;`)}
	}
`

export const Hook = styled.span`
	color: ${props => props.theme.tagHookColor};
`

export const Name = styled.span`
	color: ${props => props.theme.tagNameColor};
`

export const AttrName = styled.span`
	color: ${props => props.theme.attrNameColor};
`

export const AttrSymbol = styled.span`
	color: ${props => props.theme.attrSymbolColor};
`

export const AttrQuote = styled.span`
	color: ${props => props.theme.attrQuoteColor};
`

export const AttrValue = styled.span`
	color: ${props => props.theme.attrValueColor};
`

export const TextContainer = styled.div`
	${shared}
	color: ${props => props.theme.textColor};
`

export const CursorContainer = styled.span<{ blink: boolean }>`
	border-left: solid ${props => props.theme.cursorColor};
	${props =>
		props.blink &&
		css`
			animation: ${blink} 0.5s linear infinite alternate;
		`}
`
