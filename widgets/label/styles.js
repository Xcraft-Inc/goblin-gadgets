import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';

function convertJustify (justify) {
  switch (justify) {
    case 'start':
    case 'left':
      return 'flex-start';
    case 'end':
    case 'right':
      return 'flex-end';
    case 'around':
      return 'space-around';
    case 'between':
      return 'space-between';
    default:
      return justify;
  }
}

/******************************************************************************/

export default function styles (theme, props) {
  let boxWidth = props.width;
  let boxHeight = props.height;
  //? let boxHeight = props.height ? props.height : theme.shapes.lineHeight;  // if Button
  let boxMinHeight = null;
  let boxFlexDirection = 'row';
  let boxFlexGrow = props.grow;
  let boxFlexShrink = null;
  let boxFlexBasis = null;
  let boxJustifyContent = convertJustify (props.justify);
  let boxAlignItems = 'center';
  let boxMarginTop = '0px';
  let boxMarginRight = '0px';
  let boxMarginBottom = '0px';
  let boxMarginLeft = '0px';
  let boxPaddingTop = '0px';
  let boxPaddingRight = '0px';
  let boxPaddingBottom = '0px';
  let boxPaddingLeft = '0px';
  let boxZIndex = props.zIndex;
  let boxOpacity = props.visibility === 'false' ? 0 : null;

  let backgroundColor = props.backgroundColor;
  let fontSize = props.fontSize ? props.fontSize : theme.shapes.labelTextSize;
  let fontWeight = null;
  let boxAlignSelf = null;
  let textTransform = props.textTransform ? props.textTransform : null;
  let glyphHeight = theme.shapes.lineHeight;
  let glyphMinWidth = theme.shapes.lineHeight;
  let glyphSize = props.glyphSize;
  let glyphTransform = null;
  let glyphMargin = null;
  let glyphColor = null;
  let textColor = null;
  let linesOverflow = null;
  let textOverflow = null;
  let textTextOverflow = null;
  let textWhiteSpace = null;
  let textWordBreak = null;
  let cursor = props.cursor;

  const m = Unit.multiply (theme.shapes.containerMargin, 0.5);

  if (!props.isDragged && props.hasHeLeft) {
    boxOpacity = 0.1;
  }

  // Initialise bottom margin according to bottom-spacing.
  if (props.bottomSpacing === 'large') {
    boxMarginBottom = m;
  }
  // Initialise right margin according to spacing.
  // Initialise right margin according to spacing.
  if (props.spacing) {
    let spacingType = {
      overlap: '-1px',
      tiny: '1px',
      compact: '5px',
      large: m,
    };
    boxMarginRight = spacingType[props.spacing];
  }
  if (props.spacing === 'compact') {
    glyphMinWidth = null;
  }

  if (props.kind === 'pane-header') {
    fontSize = theme.shapes.paneHeaderTextSize;
    fontWeight = 'bold';
    textTransform = 'uppercase';
    glyphColor = theme.palette.paneHeaderText;
    textColor = theme.palette.paneHeaderText;
  }

  if (props.kind === 'title') {
    fontSize = theme.shapes.labelTitleTextSize;
    fontWeight = 'bold';
    textTransform = 'uppercase';
  }

  if (props.kind === 'title-recurrence') {
    boxPaddingTop = '0px';
    boxPaddingRight = theme.shapes.lineSpacing;
    boxPaddingBottom = '0px';
    boxPaddingLeft = theme.shapes.lineSpacing;
  }

  if (props.kind === 'big-center') {
    fontSize = theme.shapes.labelBigTextSize;
    fontWeight = 'bold';
    textTransform = 'uppercase';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'center';
  }

  if (props.kind === 'floating-header') {
    glyphMinWidth = null;
    glyphHeight = theme.shapes.floatingHeaderGlyphHeight;
    glyphSize = theme.shapes.floatingHeaderGlyphSize;
    glyphColor = theme.palette.floatingBackground;
    textColor = theme.palette.floatingBackground;
  }

  if (props.kind === 'floating-footer') {
    glyphMinWidth = null;
    fontSize = theme.shapes.floatingFooterTextSize;
    glyphColor = theme.palette.floatingSecondary;
    textColor = theme.palette.floatingSecondary;
  }

  if (props.kind === 'info') {
    backgroundColor = theme.palette.infoBackground;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'center';
    boxPaddingTop = '0px';
    boxPaddingRight = '10px';
    boxPaddingBottom = '0px';
    boxPaddingLeft = '10px';
  }

  if (props.kind === 'footer') {
    glyphColor = theme.palette.footerText;
    textColor = theme.palette.footerText;
    boxPaddingTop = '0px';
    boxPaddingRight = '20px';
    boxPaddingBottom = '0px';
    boxPaddingLeft = '20px';
  }

  if (props.kind === 'notification') {
    boxMarginLeft = m;
    glyphColor = theme.palette.notificationMessage;
    textColor = theme.palette.notificationMessage;
  }

  if (props.kind === 'flying-balloon') {
    glyphColor = theme.palette.flyingBalloonText;
    textColor = theme.palette.flyingBalloonText;
    fontSize = theme.shapes.flyingBalloonTextSize;
  }

  if (props.kind === 'task') {
    boxPaddingTop = theme.shapes.taskLabelTopMargin;
    boxPaddingRight = '0px';
    boxPaddingBottom = theme.shapes.taskLabelBottomMargin;
    boxPaddingLeft = theme.shapes.taskTabLeftMargin;
    glyphColor = theme.palette.taskLabelText;
    textColor = theme.palette.taskLabelText;
    fontWeight = 'bold';
    fontSize = theme.shapes.taskTabTextSize;
    glyphSize = theme.shapes.taskTabGlyphSize;
  }

  if (props.kind === 'center-to-box') {
    glyphMinWidth = null;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'center';
    boxMarginTop = m;
    boxMarginRight = '0px';
    boxMarginBottom = m;
    boxMarginLeft = '0px';
  }

  if (props.kind === 'large-left') {
    const hm = Unit.multiply (m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = '0px';
    boxMarginBottom = hm;
    boxMarginLeft = m;
  }
  if (props.kind === 'large-right') {
    const hm = Unit.multiply (m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = m;
    boxMarginBottom = hm;
    boxMarginLeft = '0px';
  }
  if (props.kind === 'large-single') {
    const hm = Unit.multiply (m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = m;
    boxMarginBottom = hm;
    boxMarginLeft = m;
  }

  if (props.kind === 'ticket-warning') {
    boxMarginTop = '5px';
  }

  if (props.kind === 'one-line-height') {
    boxHeight = theme.shapes.lineHeight;
  }

  if (props.vpos === 'top') {
    boxAlignSelf = 'flex-start';
  }

  if (props.wrap === 'no') {
    linesOverflow = 'hidden';
    textOverflow = 'hidden';
    textTextOverflow = 'ellipsis';
    textWhiteSpace = 'nowrap';
    boxWidth = '0px';
    if (!boxFlexGrow) {
      boxFlexGrow = '1';
    }
  } else if (props.wrap === 'stretch') {
    linesOverflow = 'hidden';
    textOverflow = 'hidden';
    textTextOverflow = 'ellipsis';
    textWhiteSpace = 'nowrap';
  } else if (props.wrap === 'break-word') {
    textWordBreak = 'break-word';
  }

  if (props.glyphColor) {
    glyphColor = ColorHelpers.getMarkColor (theme, props.glyphColor);
  }

  if (props.textColor) {
    textColor = ColorHelpers.getMarkColor (theme, props.textColor);
  }

  if (boxFlexGrow) {
    boxFlexShrink = '1';
    boxFlexBasis = '0%';
  }

  if (props.fontWeight) {
    fontWeight = props.fontWeight;
  }

  if (!boxJustifyContent) {
    boxJustifyContent = 'flex-start';
    //? boxJustifyContent = 'center';  // if Button
  }
  if (boxJustifyContent === 'none') {
    boxJustifyContent = null;
  }

  if (textTransform === 'none') {
    textTransform = null;
  }

  const boxStyle = {
    width: boxWidth,
    minWidth: boxWidth ? boxWidth : '0px',
    height: boxHeight,
    minHeight: boxMinHeight,
    paddingTop: boxPaddingTop,
    paddingRight: boxPaddingRight,
    paddingBottom: boxPaddingBottom,
    paddingLeft: boxPaddingLeft,
    marginTop: boxMarginTop,
    marginRight: boxMarginRight,
    marginBottom: boxMarginBottom,
    marginLeft: boxMarginLeft,
    display: 'flex',
    flexDirection: boxFlexDirection,
    alignItems: boxAlignItems,
    justifyContent: boxJustifyContent,
    alignSelf: boxAlignSelf,
    flexGrow: boxFlexGrow,
    flexShrink: boxFlexShrink,
    flexBasis: boxFlexBasis,
    backgroundColor: backgroundColor,
    opacity: boxOpacity,
    zIndex: boxZIndex,
    userSelect: 'none',
    cursor: cursor,
  };

  if (glyphSize) {
    const s = Unit.parse (glyphSize);
    if (s.unit !== '%') {
      throw new Error (`GlyphSize '${glyphSize}' has an unexpected format`);
    }
    const ss = s.value / 100;
    if (!glyphTransform) {
      glyphTransform = 'scale(' + ss + ')';
    }
    if (!glyphMargin) {
      const mm = Unit.multiply (m, ss);
      glyphMargin = '0px ' + mm + ' 0px ' + mm;
    }
  }

  const glyphStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: glyphMinWidth,
    height: glyphHeight,
    padding: '0px',
    margin: glyphMargin,
    color: glyphColor,
    transform: glyphTransform,
    userSelect: 'none',
  };

  const linesStyle = {
    width: '100%',
    overflow: linesOverflow,
    userSelect: 'none',
  };

  const textStyle = {
    fontSize: Unit.multiply (fontSize, theme.typo.fontScale),
    fontWeight: fontWeight,
    fontStyle: props.fontStyle,
    color: textColor,
    textTransform: textTransform,
    overflow: textOverflow,
    textOverflow: textTextOverflow,
    whiteSpace: textWhiteSpace,
    wordWrap: 'break-word',
    wordBreak: textWordBreak,
    userSelect: 'none',
  };

  const normalFragmentStyle = {
    color: textColor,
  };

  const hilitedFragmentStyle = {
    // color: theme.palette.highlightedText,
    // backgroundColor: theme.palette.highlightedTextBackground,
    backgroundColor: theme.palette.boxActiveBackground,
    // FIXME: modify highlightedTextBackground to electrum-theme
    padding: '1px',
  };

  return {
    box: boxStyle,
    glyph: glyphStyle,
    lines: linesStyle,
    text: textStyle,
    normalFragment: normalFragmentStyle,
    hilitedFragment: hilitedFragmentStyle,
  };
}

/******************************************************************************/
