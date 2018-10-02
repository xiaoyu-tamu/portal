import CaretDownIcon from '@material-ui/icons/KeyboardArrowDown';
import classNames from 'classnames';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import React, { PureComponent, MouseEvent } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
  Input,
  Popover,
  Typography,
  Popper,
  Paper,
  Button,
  ClickAwayListener
} from '@material-ui/core';
import { BaseProps } from '~/utilities/types';
import { ThemeProvider } from 'theming';

export interface SearchProps extends BaseProps {
  width?: number;
}

type Props = SearchProps & WithStyles<typeof styles>;

type State = {
  anchorEl: any;
};

class Search extends PureComponent<Props, State> {
  private readonly initialState: State = {
    anchorEl: null
  };

  private readonly inputRef = React.createRef<HTMLInputElement>();
  static defaultProps = {
    width: 500
  };
  state = this.initialState;

  render() {
    const { classes, className, width, children } = this.props;
    const { anchorEl } = this.state;
    const cls = classNames(classes.root, className);
    return (
      <div className={cls} style={{ width }}>
        <EventListener target="window" onKeyDown={this.handleKeyDown} />
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <Input
          disableUnderline
          placeholder="Search……"
          inputRef={this.inputRef}
          classes={{ root: classes.inputRoot, input: classes.inputInput }}
        />
        <div className={classes.caret} onClick={this.handlePopoverOpen}>
          <CaretDownIcon />
        </div>
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={this.handlePopoverClose}
          PaperProps={{ square: true, style: { width } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {children}
        </Popover>
      </div>
    );
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!document || !document.activeElement) return;
    if (
      ['/', 's'].indexOf(keycode(event)) !== -1 &&
      document.activeElement.nodeName.toLowerCase() === 'body' &&
      document.activeElement !== this.inputRef.current
    ) {
      event.preventDefault();
      this.inputRef.current && this.inputRef.current.focus();
    }
  };

  private handlePopoverOpen = (event: MouseEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      fontFamily: theme.typography.fontFamily,
      position: 'relative',
      marginRight: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit,
      borderRadius: 4,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      display: 'block',
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },

    search: {
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: theme.spacing.unit * 7,
      pointerEvents: 'none'
    },
    inputRoot: {
      color: 'inherit',
      width: '100%'
    },
    inputInput: {
      borderRadius: 4,
      padding: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 7,
      paddingRight: theme.spacing.unit * 5,
      '&:hover, &:focus': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      }
    },

    caret: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
      width: theme.spacing.unit * 5
    },

    popover: {
      zIndex: theme.zIndex.appBar + 1
    }
  });

export default withStyles(styles)(Search);
