import React, { useState, useRef, useCallback, useEffect } from "react";
import styled, { css, keyframes, ThemeProvider } from "styled-components";
const rand = (start, end) => Math.round(Math.random() * (end - start) + start);
function usePencil(content, e) {
  const [pencil, setPencil] = useState(Object.fromEntries(Object.keys(content).map((key) => [key, ""])));
  const [{ isRunning, isPaused }, setState] = useState({
    isRunning: false,
    isPaused: false
  });
  const mem = useRef(content);
  const timeout = useRef();
  const cursorMem = useRef(0);
  const pencilTarget = useRef({
    idx: 0,
    keys: Object.keys(pencil),
    get key() {
      return this.keys[this.idx];
    }
  });
  const end = useCallback(() => {
    var _a;
    setState((prev) => ({ ...prev, isRunning: false }));
    (_a = e == null ? void 0 : e.onEnd) == null ? void 0 : _a.call(e, pencilTarget.current);
    return;
  }, (e == null ? void 0 : e.deps) || []);
  const write = useCallback((cursor) => {
    var _a, _b, _c;
    if (cursor === ((_a = mem.current[pencilTarget.current.key]) == null ? void 0 : _a.length)) {
      pencilTarget.current.idx++;
      cursor = 0;
      cursorMem.current = 0;
      if (((_b = mem.current[pencilTarget.current.key]) == null ? void 0 : _b.length) === 0) {
        setState((prev) => ({ ...prev, isRunning: false, isPaused: true }));
        (_c = e == null ? void 0 : e.onPause) == null ? void 0 : _c.call(e, pencilTarget.current);
        cursorMem.current = cursor;
        clearTimeout(timeout.current);
        return;
      }
    }
    if (pencilTarget.current.key) {
      setPencil((prev) => ({
        ...prev,
        [pencilTarget.current.key]: prev[pencilTarget.current.key] + mem.current[pencilTarget.current.key][cursor]
      }));
      timeout.current = setTimeout(write, rand(50, 270), cursor + 1);
    } else
      end();
  }, (e == null ? void 0 : e.deps) || []);
  const play = useCallback((delay) => {
    var _a;
    if (pencilTarget.current.key) {
      if (typeof delay === "boolean" && delay)
        timeout.current = setTimeout(write, rand(150, 230), cursorMem.current);
      else if (typeof delay === "number" && delay > -1)
        timeout.current = setTimeout(write, delay, cursorMem.current);
      else
        write(cursorMem.current);
      setState({ isRunning: true, isPaused: false });
      (_a = e == null ? void 0 : e.onStart) == null ? void 0 : _a.call(e, pencilTarget.current);
    } else
      end();
  }, (e == null ? void 0 : e.deps) || []);
  const pause = useCallback(() => {
    var _a;
    setState((prev) => ({ ...prev, isRunning: false }));
    clearTimeout(timeout.current);
    (_a = e == null ? void 0 : e.onPause) == null ? void 0 : _a.call(e, pencilTarget.current);
  }, (e == null ? void 0 : e.deps) || []);
  const clean = useCallback(() => {
    clearTimeout(timeout.current);
    const nextPencil = Object.fromEntries(Object.keys(mem.current).map((key) => [key, ""]));
    cursorMem.current = 0;
    pencilTarget.current.idx = 0;
    pencilTarget.current.keys = Object.keys(nextPencil);
    setState({ isRunning: false, isPaused: false });
    setPencil(nextPencil);
  }, (e == null ? void 0 : e.deps) || []);
  useEffect(() => () => {
    clearTimeout(timeout.current);
  }, []);
  return {
    pencil,
    play,
    pause,
    clean,
    pencilTarget: pencilTarget.current,
    isRunning,
    isPaused
  };
}
const shared = css`
	* {
		font-family: ${(props) => props.theme.fontFamily} !important;
		font-size: ${(props) => props.theme.fontSize} !important;
	}

	pre,
	span {
		margin: 0;
		white-space: pre-wrap;
	}
`;
const blink = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;
const TagContainer = styled.div`
	${shared}

	display: flex;
	flex-wrap: wrap;
	flex-direction: ${(props) => props.isOpen ? "column" : "row"};

	${(props) => props.isSelected && css`
			background: ${props.theme.selectBackgroundColor} !important;

			* {
				color: ${props.theme.selectColor} !important;
			}
		`}

	& > div:nth-child(2) {
		${(props) => props.isOpen ? `margin-left: ${props.theme.tagTabsize};` : `display: flex;`}
	}
`;
const Hook = styled.span`
	color: ${(props) => props.theme.tagHookColor};
`;
const Name = styled.span`
	color: ${(props) => props.theme.tagNameColor};
`;
const AttrName = styled.span`
	color: ${(props) => props.theme.attrNameColor};
`;
const AttrSymbol = styled.span`
	color: ${(props) => props.theme.attrSymbolColor};
`;
const AttrQuote = styled.span`
	color: ${(props) => props.theme.attrQuoteColor};
`;
const AttrValue = styled.span`
	color: ${(props) => props.theme.attrValueColor};
`;
const TextContainer = styled.div`
	${shared}
	color: ${(props) => props.theme.textColor};
`;
const CursorContainer = styled.span`
	border-left: solid ${(props) => props.theme.cursorColor};
	${(props) => props.blink && css`
			animation: ${blink} 0.5s linear infinite alternate;
		`}
`;
function Cursor({ blinkDeps, display }) {
  const [bool, setBool] = useState(false);
  useEffect(() => {
    const blink2 = setTimeout(() => setBool(true), 350);
    return () => {
      clearTimeout(blink2);
      setBool(false);
    };
  }, [...blinkDeps || []]);
  return /* @__PURE__ */ React.createElement(CursorContainer, {
    hidden: !display,
    blink: bool
  }, "\u200D");
}
function Opening$1({ name, shouldWrite, shouldClean, shouldDisplayCursor, onEnd }) {
  const { pencil, play, clean, isRunning, isPaused } = usePencil({
    oHook: "</",
    name,
    cHook: ">"
  }, {
    onEnd
  });
  useEffect(() => {
    if (shouldClean)
      clean();
  }, [shouldClean]);
  useEffect(() => {
    if (shouldWrite && !isRunning && !isPaused)
      play();
  }, [shouldWrite, isRunning, isPaused]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Hook, null, pencil.oHook), /* @__PURE__ */ React.createElement(Name, null, pencil.name), /* @__PURE__ */ React.createElement(Hook, null, pencil.cHook), /* @__PURE__ */ React.createElement(Cursor, {
    display: shouldWrite || shouldDisplayCursor,
    blinkDeps: [pencil]
  }));
}
function Attr({ content, shouldWrite, shouldClean, onStart, onEnd }) {
  const { pencil, play, clean } = usePencil(content, { onStart, onEnd });
  useEffect(() => {
    if (shouldClean)
      clean();
  }, [shouldClean]);
  useEffect(() => {
    if (shouldWrite)
      play();
  }, [shouldWrite]);
  return /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(AttrName, null, pencil.key), /* @__PURE__ */ React.createElement(AttrSymbol, null, pencil.symbol), /* @__PURE__ */ React.createElement(AttrQuote, null, pencil.quote1), /* @__PURE__ */ React.createElement(AttrValue, null, pencil.value), /* @__PURE__ */ React.createElement(AttrQuote, null, pencil.quote2), /* @__PURE__ */ React.createElement(Cursor, {
    display: shouldWrite,
    blinkDeps: [pencil]
  }));
}
function useHand(init, max, e) {
  const initRef = useRef(init);
  const [hand, setHand] = useState(initRef.current);
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    var _a, _b;
    (_a = e == null ? void 0 : e.onChange) == null ? void 0 : _a.call(e, hand);
    if (!isFinished && hand >= max) {
      setIsFinished(true);
      (_b = e == null ? void 0 : e.onEnd) == null ? void 0 : _b.call(e);
    }
  }, [hand, isFinished, ...(e == null ? void 0 : e.deps) || []]);
  return {
    hand,
    init: initRef.current,
    max,
    setHand,
    isFinished,
    incrementHand: (condition = true) => setHand((prev) => typeof condition === "function" && condition(prev, initRef.current) || typeof condition !== "function" && condition ? prev + 1 : prev),
    derementHand: (condition) => setHand((prev) => typeof condition === "function" && condition(prev, initRef.current) || typeof condition !== "function" && condition ? prev - 1 : prev),
    reset: () => {
      setHand(initRef.current);
      setIsFinished(false);
    }
  };
}
function AttrList({ attr, shouldWrite, shouldClean, onEnd }) {
  const list = useRef(Object.entries(attr));
  const { hand, setHand, incrementHand, reset } = useHand(-1, list.current.length, { onEnd });
  useEffect(() => {
    if (shouldClean)
      reset();
  }, [shouldClean]);
  useEffect(() => {
    if (shouldWrite)
      setHand((prev) => prev === -1 ? prev + 1 : prev);
  }, [shouldWrite]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, list.current.map(([key, value], i) => /* @__PURE__ */ React.createElement(Attr, {
    key: i,
    content: { key: " " + key, symbol: "=", quote1: '"', value, quote2: '"' },
    shouldWrite: i === hand,
    shouldClean,
    onEnd: incrementHand
  })));
}
function Opening({ name, attr, shouldWrite, shouldClean, shouldDisplayCursor, isIndented, onEnd }) {
  const [shouldWriteAttr, setShouldWriteAttr] = useState(false);
  const { pencil, play, clean, isRunning, isPaused } = usePencil({
    oHook: "<",
    name,
    attr: "",
    cHook: ">"
  }, {
    onPause(pencilTarget) {
      if (pencilTarget.key === "attr")
        setShouldWriteAttr(true);
    },
    onEnd() {
      onEnd == null ? void 0 : onEnd();
      setShouldWriteAttr(false);
    }
  });
  useEffect(() => {
    if (shouldClean)
      clean();
  }, [shouldClean]);
  useEffect(() => {
    if (shouldWrite && !isRunning && !isPaused)
      play(!isIndented || rand(500, 600));
  }, [shouldWrite, isRunning, isPaused]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Hook, null, pencil.oHook), /* @__PURE__ */ React.createElement(Name, null, pencil.name), /* @__PURE__ */ React.createElement(AttrList, {
    attr,
    shouldWrite: shouldWriteAttr,
    shouldClean,
    onEnd: play
  }), /* @__PURE__ */ React.createElement(Hook, null, pencil.cHook), /* @__PURE__ */ React.createElement(Cursor, {
    display: (shouldWrite || shouldDisplayCursor) && !shouldWriteAttr,
    blinkDeps: [pencil]
  }));
}
const defaultTheme = {
  cursorColor: "white",
  textColor: "white",
  tagHookColor: "rgb(200, 200, 200)",
  tagNameColor: "#d34949",
  attrNameColor: "#8cd673",
  attrSymbolColor: "rgb(200, 200, 200)",
  attrQuoteColor: "#f9c962",
  attrValueColor: "#f9c962",
  selectColor: "white",
  selectBackgroundColor: "rgb(84, 95, 255)",
  fontSize: "20px",
  tagTabsize: "30px",
  fontFamily: "monospace"
};
function Parent({ isChild, theme, children }) {
  return !isChild ? /* @__PURE__ */ React.createElement(ThemeProvider, {
    theme: { ...defaultTheme, ...theme }
  }, children) : /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
const Container = ({ isOpen, isSelected, children }) => {
  return /* @__PURE__ */ React.createElement(TagContainer, {
    isOpen,
    isSelected
  }, children);
};
function Tag({ name, open, attr = {}, loop, theme, shouldWrite, shouldClean, isChild, isIndented, children, onEnd }) {
  const [state, setState] = useState({
    isOpen: false,
    isSelected: false,
    loopCount: 0
  });
  const { hand, init, isFinished, incrementHand, reset } = useHand(-1, React.Children.count(children) + 2, {
    onChange(i) {
      if (i === 2)
        open && setTimeout(() => setState((prev) => ({ ...prev, isOpen: true })), rand(230, 330));
    },
    onEnd() {
      onEnd == null ? void 0 : onEnd();
      if (!isChild && (loop || typeof loop === "number" && state.loopCount < loop)) {
        setTimeout(() => {
          setState((prev) => ({ ...prev, isSelected: true }));
          setTimeout(() => {
            setState((prev) => ({ isOpen: false, isSelected: false, loopCount: prev.loopCount + 1 }));
            reset();
            setTimeout(incrementHand, 500);
          }, 1e3);
        }, 2e3);
      }
    },
    deps: [state.loopCount]
  });
  useEffect(() => {
    if (shouldClean) {
      setState((prev) => ({ ...prev, isOpen: false, isSelected: false }));
      reset();
    }
  }, [shouldClean]);
  useEffect(() => {
    if (!isChild || shouldWrite)
      incrementHand((prev, init2) => prev === init2);
  }, [shouldWrite]);
  return /* @__PURE__ */ React.createElement(Parent, {
    theme,
    isChild
  }, /* @__PURE__ */ React.createElement(Container, {
    ...state
  }, /* @__PURE__ */ React.createElement(Opening, {
    name,
    attr,
    shouldWrite: hand === 0,
    onEnd: incrementHand,
    shouldClean: shouldClean || state.loopCount,
    shouldDisplayCursor: !isFinished && shouldWrite === void 0 && hand === init,
    isIndented
  }), /* @__PURE__ */ React.createElement("div", null, React.Children.map(children, (elm, i) => React.cloneElement(elm, {
    shouldWrite: hand === i + 2,
    shouldClean: shouldClean || state.loopCount,
    onEnd: incrementHand,
    isChild: true,
    isIndented: open && i === 0
  }))), /* @__PURE__ */ React.createElement(Opening$1, {
    name,
    shouldWrite: hand === 1,
    shouldClean: shouldClean || state.loopCount,
    shouldDisplayCursor: isFinished && shouldWrite === void 0,
    onEnd: incrementHand
  })));
}
function Text({ text, style, shouldWrite, shouldClean, isChild, isIndented, loop, onEnd }) {
  const [state, setState] = useState({
    isOpen: false,
    isSelected: false,
    loopCount: 0
  });
  const { pencil, play, clean } = usePencil({ text }, {
    onEnd() {
      onEnd == null ? void 0 : onEnd();
      if (!isChild && (loop || typeof loop === "number" && state.loopCount < loop)) {
        setTimeout(() => {
          setState((prev) => ({ ...prev, isSelected: true }));
          setTimeout(() => setState((prev) => ({ ...prev, isSelected: false, loopCount: prev.loopCount + 1 })), 1e3);
        }, 2e3);
      }
    },
    deps: [state.loopCount]
  });
  useEffect(() => {
    if (shouldClean)
      clean();
  }, [shouldClean]);
  useEffect(() => {
    if (!isChild || shouldWrite)
      play(!isIndented || rand(500, 600));
  }, [shouldWrite]);
  return /* @__PURE__ */ React.createElement(TextContainer, {
    style
  }, /* @__PURE__ */ React.createElement("span", null, pencil.text), /* @__PURE__ */ React.createElement(Cursor, {
    display: !!shouldWrite || !isChild,
    blinkDeps: [pencil]
  }));
}
export { Tag, Text };
