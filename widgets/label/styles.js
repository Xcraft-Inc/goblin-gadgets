import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  let boxWidth = props.width;
  let boxHeight = props.height;
  let textHeight = null;
  let backgroundColor = null;
  let padding = null;
  let margin = null;
  let fontSize = props.fontSize ? props.fontSize : theme.shapes.labelTextSize;
  let fontWeight = null;
  let boxJustifyContent = null;
  let boxAlignSelf = null;
  let textTransform = props.textTransform ? props.textTransform : null;
  let glyphHeight = theme.shapes.lineHeight;
  let glyphMinWidth = theme.shapes.lineHeight;
  let glyphSize = props.glyphSize;
  let glyphColor = null;
  let textColor = null;
  let linesOverflow = null;
  let textOverflow = null;
  let textTextOverflow = null;
  let textWhiteSpace = null;
  let textWordBreak = null;
  let flexGrow = props.grow;
  let flexShrink = null;
  let flexBasis = null;
  let opacity = !props.isDragged && props.hasHeLeft ? 0.1 : 1.0;
  let cursor = props.cursor;

  const m = Unit.multiply (theme.shapes.containerMargin, 0.5);

  // Initialise bottom margin according to bottom-spacing.
  let bottomMargin = '0px';
  if (props.bottomSpacing === 'large') {
    bottomMargin = m;
  }
  // Initialise right margin according to spacing.
  if (props.spacing === 'overlap') {
    margin = '0px -1px ' + bottomMargin + ' 0px';
  } else if (props.spacing === 'tiny') {
    margin = '0px 1px ' + bottomMargin + ' 0px';
  } else if (props.spacing === 'large') {
    margin = '0px ' + m + ' ' + bottomMargin + ' 0px';
  } else if (props.spacing === 'compact') {
    margin = '0px 5px ' + bottomMargin + ' 0px';
    glyphMinWidth = null;
  } else {
    margin = '0px 0px ' + bottomMargin + ' 0px';
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
    padding = '0px ' + theme.shapes.lineSpacing;
  }

  if (props.kind === 'big-center') {
    fontSize = theme.shapes.labelBigTextSize;
    fontWeight = 'bold';
    textTransform = 'uppercase';
    boxJustifyContent = 'center';
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
    boxJustifyContent = 'center';
    padding = '0 10px 0 10px';
  }

  if (props.justify === 'left') {
    boxJustifyContent = 'flex-start';
  }

  if (props.justify === 'center') {
    boxJustifyContent = 'center';
  }

  if (props.justify === 'right') {
    boxJustifyContent = 'flex-end';
  }

  if (props.kind === 'footer') {
    padding = '0 20px 0 20px';
    glyphColor = theme.palette.footerText;
    textColor = theme.palette.footerText;
  }

  if (props.kind === 'notification') {
    margin = '0px 0px 0px ' + m;
    glyphColor = theme.palette.notificationMessage;
    textColor = theme.palette.notificationMessage;
  }

  if (props.kind === 'flying-balloon') {
    glyphColor = theme.palette.flyingBalloonText;
    textColor = theme.palette.flyingBalloonText;
    fontSize = theme.shapes.flyingBalloonTextSize;
  }

  if (props.kind === 'task') {
    padding =
      theme.shapes.taskLabelTopMargin +
      ' 0px ' +
      theme.shapes.taskLabelBottomMargin +
      ' ' +
      theme.shapes.taskTabLeftMargin;

    glyphColor = theme.palette.taskLabelText;
    textColor = theme.palette.taskLabelText;
    fontWeight = 'bold';
    fontSize = theme.shapes.taskTabTextSize;
    glyphSize = theme.shapes.taskTabGlyphSize;
  }

  if (props.kind === 'center-to-box') {
    glyphMinWidth = null;
    boxJustifyContent = 'center';
    margin = m + ' 0px';
  }

  if (props.kind === 'large-left') {
    const hm = Unit.multiply (m, 0.5);
    margin = hm + ' 0px ' + hm + ' ' + m;
  }
  if (props.kind === 'large-right') {
    const hm = Unit.multiply (m, 0.5);
    margin = hm + ' ' + m + ' ' + hm + ' 0px';
  }
  if (props.kind === 'large-single') {
    const hm = Unit.multiply (m, 0.5);
    margin = hm + ' ' + m + ' ' + hm + ' ' + m;
  }

  if (props.kind === 'ticket-warning') {
    margin = '5px 0px 0px 0px';
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
    if (!flexGrow) {
      flexGrow = '1';
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

  if (flexGrow) {
    flexShrink = '0';
    flexBasis = '0%';
  }

  if (props.fontWeight) {
    fontWeight = props.fontWeight;
  }

  let glyphTransform = null;
  if (glyphSize) {
    const s = Unit.parse (glyphSize);
    if (s.unit !== '%') {
      throw new Error (`GlyphSize '${glyphSize}' has an unexpected format`);
    }
    const ss = s.value / 100;
    glyphTransform = 'scale(' + ss + ')';
  }

  const boxStyle = {
    width: boxWidth,
    minWidth: boxWidth ? boxWidth : '0px',
    height: boxHeight,
    padding: padding,
    margin: margin,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: boxJustifyContent,
    alignSelf: boxAlignSelf,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    backgroundColor: backgroundColor,
    opacity: opacity,
    zIndex: props.zIndex,
    userSelect: 'none',
    cursor: cursor,
  };

  const glyphStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: glyphMinWidth,
    height: glyphHeight,
    padding: '0px',
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
    height: textHeight,
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
