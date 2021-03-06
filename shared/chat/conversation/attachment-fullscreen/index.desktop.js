// @flow
import * as React from 'react'
import {Box, Icon, Text, PopupDialog, ProgressBar, ProgressIndicator} from '../../../common-adapters'
import {
  collapseStyles,
  globalColors,
  globalMargins,
  globalStyles,
  fileUIName,
  platformStyles,
} from '../../../styles'

import type {Props} from '.'

type State = {loaded: boolean}
class Fullscreen extends React.Component<Props, State> {
  state = {loaded: false}
  _setLoaded = () => this.setState({loaded: true})
  render() {
    return (
      <PopupDialog onClose={this.props.onClose} fill={true}>
        <Box style={containerStyle}>
          <Box style={headerFooterStyle}>
            <Text type="BodySemibold" style={{color: globalColors.black_75, flex: 1}}>
              {this.props.title}
            </Text>
            <Icon
              type="iconfont-ellipsis"
              style={{color: globalColors.black_40, cursor: 'pointer', marginLeft: globalMargins.tiny}}
              onClick={event => {
                const node = event.target instanceof window.HTMLElement ? event.target : null
                this.props.onShowMenu(node ? node.getBoundingClientRect() : null)
              }}
            />
          </Box>
          {this.props.path && (
            <Box
              style={collapseStyles([
                this.props.isZoomed ? styleContentsZoom : styleContentsFit,
                this.state.loaded ? null : {display: 'none'},
              ])}
              onClick={this.props.onToggleZoom}
            >
              <img
                onLoad={this._setLoaded}
                src={this.props.path}
                style={this.props.isZoomed ? styleImageZoom : styleImageFit}
              />
            </Box>
          )}
          {!this.state.loaded && <ProgressIndicator style={{margin: 'auto'}} />}
          <Box style={headerFooterStyle}>
            {!!this.props.progressLabel && (
              <Text type="BodySmall" style={{color: globalColors.black_60, marginRight: globalMargins.tiny}}>
                {this.props.progressLabel}
              </Text>
            )}
            {!!this.props.progressLabel && <ProgressBar ratio={this.props.progress} />}
            {!this.props.progressLabel &&
              this.props.onDownloadAttachment && (
                <Text type="BodySmall" style={linkStyle} onClick={this.props.onDownloadAttachment}>
                  Download
                </Text>
              )}
            {this.props.onShowInFinder && (
              <Text type="BodySmall" style={linkStyle} onClick={this.props.onShowInFinder}>
                Show in {fileUIName}
              </Text>
            )}
          </Box>
        </Box>
      </PopupDialog>
    )
  }
}

const linkStyle = platformStyles({
  isElectron: {color: globalColors.black_60, cursor: 'pointer'},
})

const containerStyle = {
  ...globalStyles.flexBoxColumn,
  height: '100%',
  width: '100%',
}

const headerFooterStyle = {
  ...globalStyles.flexBoxRow,
  alignItems: 'center',
  height: 32,
  paddingLeft: globalMargins.tiny,
  paddingRight: globalMargins.tiny,
  width: '100%',
}

const styleContentsFit = {
  ...globalStyles.flexBoxRow,
  flex: 1,
}

const styleContentsZoom = {
  display: 'block',
  flex: 1,
  overflow: 'auto',
}

const styleImageFit = {
  cursor: 'zoom-in',
  display: 'block',
  objectFit: 'scale-down',
  width: '100%',
}

const styleImageZoom = {
  cursor: 'zoom-out',
  display: 'block',
  minHeight: '100%',
  minWidth: '100%',
}

export default Fullscreen
