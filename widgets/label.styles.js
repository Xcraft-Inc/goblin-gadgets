import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const inputGrow          = props.grow;
  const inputKind          = props.kind;
  const inputJustify       = props.justify;
  const inputWidth         = props.width;
  const inputHeight        = props.height;
  const inputSpacing       = props.spacing;
  const inputWrap          = props.wrap;
  const inputVpos          = props.vpos;
  const inputGlyphColor    = props.glyphColor;
  const inputGlyphSize     = props.glyphSize;
  const inputTextColor     = props.textColor;
  const inputTextTransform = props.textTransform;
  const inputFontWeight    = props.fontWeight;
  const inputFontStyle     = props.fontStyle;
  const inputFontSize      = props.fontSize;
  const inputBottomSpacing = props.bottomSpacing;
  const inputZIndex        = props.zIndex;
  const inputIsDragged     = props.isDragged;
  const inputHasHeLeft     = props.hasHeLeft;
  const inputCursor        = props.cursor;

  let boxWidth           = inputWidth;
  let boxHeight          = inputHeight;
  let textHeight         = null;
  let backgroundColor    = null;
  let padding            = null;
  let margin             = null;
  let fontSize           = inputFontSize ? inputFontSize : theme.shapes.labelTextSize;
  let fontWeight         = null;
  let boxJustifyContent  = null;
  let boxAlignSelf       = null;
  let textTransform      = inputTextTransform ? inputTextTransform : null;
  let glyphHeight        = theme.shapes.lineHeight;
  let glyphMinWidth      = theme.shapes.lineHeight;
  let glyphSize          = inputGlyphSize;
  let glyphColor         = null;
  let textColor          = null;
  let linesOverflow      = null;
  let textOverflow       = null;
  let textTextOverflow   = null;
  let textWhiteSpace     = null;
  let textWordBreak      = null;
  let flexGrow           = inputGrow;
  let flexShrink         = null;
  let flexBasis          = null;
  let opacity            = (!inputIsDragged && inputHasHeLeft) ? 0.1 : 1.0;
  let cursor             = inputCursor;

  const m = Unit.multiply (theme.shapes.containerMargin, 0.5);

  // Initialise bottom margin according to bottom-spacing.
  let bottomMargin = '0px';
  if (inputBottomSpacing === 'large') {
    bottomMargin = m;
  }
  // Initialise right margin according to spacing.
  if (inputSpacing === 'overlap') {
    margin = '0px -1px ' + bottomMargin + ' 0px';
  } else if (inputSpacing === 'tiny') {
    margin = '0px 1px ' + bottomMargin + ' 0px';
  } else if (inputSpacing === 'large') {
    margin = '0px ' + m + ' ' + bottomMargin + ' 0px';
  } else if (inputSpacing === 'compact') {
    margin = '0px 5px ' + bottomMargin + ' 0px';
    glyphMinWidth = null;
  } else {
    margin = '0px 0px ' + bottomMargin + ' 0px';
  }

  if (inputKind === 'pane-header') {
    fontSize        = theme.shapes.paneHeaderTextSize;
    fontWeight      = 'bold';
    textTransform   = 'uppercase';
    glyphColor      = theme.palette.paneHeaderText;
    textColor       = theme.palette.paneHeaderText;
  }

  if (inputKind === 'title') {
    fontSize        = theme.shapes.labelTitleTextSize;
    fontWeight      = 'bold';
    textTransform   = 'uppercase';
  }

  if (inputKind === 'title-recurrence') {
    padding           = '0px ' + theme.shapes.lineSpacing;
  }

  if (inputKind === 'big-center') {
    fontSize          = theme.shapes.labelBigTextSize;
    fontWeight        = 'bold';
    textTransform     = 'uppercase';
    boxJustifyContent = 'center';
  }

  if (inputKind === 'floating-header') {
    glyphMinWidth = null;
    glyphHeight   = theme.shapes.floatingHeaderGlyphHeight;
    glyphSize     = theme.shapes.floatingHeaderGlyphSize;
    glyphColor    = theme.palette.floatingBackground;
    textColor     = theme.palette.floatingBackground;
  }

  if (inputKind === 'floating-footer') {
    glyphMinWidth = null;
    fontSize      = theme.shapes.floatingFooterTextSize;
    glyphColor    = theme.palette.floatingSecondary;
    textColor     = theme.palette.floatingSecondary;
  }

  if (inputKind === 'info') {
    backgroundColor   = theme.palette.infoBackground;
    boxJustifyContent = 'center';
    padding           = '0 10px 0 10px';
  }

  if (inputJustify === 'left') {
    boxJustifyContent = 'flex-start';
  }

  if (inputJustify === 'center') {
    boxJustifyContent = 'center';
  }

  if (inputJustify === 'right') {
    boxJustifyContent = 'flex-end';
  }

  if (inputKind === 'footer') {
    padding         = '0 20px 0 20px';
    glyphColor      = theme.palette.footerText;
    textColor       = theme.palette.footerText;
  }

  if (inputKind === 'notification') {
    margin          = '0px 0px 0px ' + m;
    glyphColor      = theme.palette.notificationMessage;
    textColor       = theme.palette.notificationMessage;
  }

  if (inputKind === 'flying-balloon') {
    glyphColor      = theme.palette.flyingBalloonText;
    textColor       = theme.palette.flyingBalloonText;
    fontSize        = theme.shapes.flyingBalloonTextSize;
  }

  if (inputKind === 'task') {
    padding         = theme.shapes.taskLabelTopMargin + ' 0px ' +
      theme.shapes.taskLabelBottomMargin + ' ' +
      theme.shapes.taskTabLeftMargin;

    glyphColor      = theme.palette.taskLabelText;
    textColor       = theme.palette.taskLabelText;
    fontWeight      = 'bold';
    fontSize        = theme.shapes.taskTabTextSize;
    glyphSize       = theme.shapes.taskTabGlyphSize;
  }

  if (inputKind === 'center-to-box') {
    glyphMinWidth     = null;
    boxJustifyContent = 'center';
    margin            = m + ' 0px';
  }

  if (inputKind === 'large-left') {
    const hm          = Unit.multiply (m, 0.5);
    margin            = hm + ' 0px ' + hm + ' ' + m;
  }
  if (inputKind === 'large-right') {
    const hm          = Unit.multiply (m, 0.5);
    margin            = hm + ' ' + m + ' ' + hm + ' 0px';
  }

  if (inputKind === 'ticket-warning') {
    margin = '5px 0px 0px 0px';
  }

  if (inputKind === 'one-line-height') {
    boxHeight = theme.shapes.lineHeight;
  }

  if (inputVpos === 'top') {
    boxAlignSelf = 'flex-start';
  }

  if (inputWrap === 'no') {
    linesOverflow    = 'hidden';
    textOverflow     = 'hidden';
    textTextOverflow = 'ellipsis';
    textWhiteSpace   = 'nowrap';
    boxWidth         = '0px';
    if (!flexGrow) {
      flexGrow = '1';
    }
  } else if (inputWrap === 'stretch') {
    linesOverflow    = 'hidden';
    textOverflow     = 'hidden';
    textTextOverflow = 'ellipsis';
    textWhiteSpace   = 'nowrap';
  } else if (inputWrap === 'break-word') {
    textWordBreak = 'break-word';
  }

  if (inputGlyphColor) {
    glyphColor = ColorHelpers.getMarkColor (theme, inputGlyphColor);
  }

  if (inputTextColor) {
    textColor = ColorHelpers.getMarkColor (theme, inputTextColor);
  }

  if (flexGrow) {
    flexShrink = '0';
    flexBasis  = '0%';
  }

  if (inputFontWeight) {
    fontWeight = inputFontWeight;
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
    width:           boxWidth,
    minWidth:        boxWidth ? boxWidth : '0px',
    height:          boxHeight,
    padding:         padding,
    margin:          margin,
    display:         'flex',
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  boxJustifyContent,
    alignSelf:       boxAlignSelf,
    flexGrow:        flexGrow,
    flexShrink:      flexShrink,
    flexBasis:       flexBasis,
    backgroundColor: backgroundColor,
    opacity:         opacity,
    zIndex:          inputZIndex,
    userSelect:      'none',
    cursor:          cursor,
  };

  const glyphStyle = {
    display:       'flex',
    flexDirection: 'row',
    alignItems:    'center',
    minWidth:      glyphMinWidth,
    height:        glyphHeight,
    padding:       '0px',
    color:         glyphColor,
    transform:     glyphTransform,
    userSelect:    'none',
  };

  const linesStyle = {
    width:      '100%',
    overflow:   linesOverflow,
    userSelect: 'none',
  };

  const textStyle = {
    height:        textHeight,
    fontSize:      Unit.multiply (fontSize, theme.typo.fontScale),
    fontWeight:    fontWeight,
    fontStyle:     inputFontStyle,
    color:         textColor,
    textTransform: textTransform,
    overflow:      textOverflow,
    textOverflow:  textTextOverflow,
    whiteSpace:    textWhiteSpace,
    wordWrap:      'break-word',
    wordBreak:     textWordBreak,
    userSelect:    'none',
  };

  const normalFragmentStyle = {
    color: textColor,
  };

  const hilitedFragmentStyle = {
    color:           theme.palette.highlightedText,
    backgroundColor: theme.palette.highlightedTextBackground,
    padding:         '2px',
  };

  return {
    box:             boxStyle,
    glyph:           glyphStyle,
    lines:           linesStyle,
    text:            textStyle,
    normalFragment:  normalFragmentStyle,
    hilitedFragment: hilitedFragmentStyle,
  };
}

/******************************************************************************/
