import { Card as MuiCard, CardHeader, Popover } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames';
import React, { MouseEvent, PureComponent, ReactNode } from 'react';
import { BaseProps } from '~/utilities/types';
import { Action, Actions } from '../Actions';

export interface CardProps extends BaseProps {
  variant?: Variant;
  menu?: ReactNode;
  action?: React.ReactNode;
  avatar?: React.ReactNode;
  subheader?: React.ReactNode;
  title: React.ReactNode;
  children: ReactNode;
}

type Variant = 'horizontal' | 'verical';

type Props = CardProps & WithStyles<typeof styles>;

type State = {
  anchorEl: any;
};

class Card extends PureComponent<Props, State> {
  readonly initialState: State = { anchorEl: null };
  state = this.initialState;

  render() {
    const {
      variant = 'verical',
      classes,
      className,
      children,
      menu,
      action,
      avatar,
      subheader,
      title,
      ...rest
    } = this.props;
    const { anchorEl } = this.state;
    const cls = classNames(classes.root, className, {
      [classes[variant]]: true
    });

    const actions = menu ? (
      <Actions>
        {action}
        <Action size="medium" onClick={this.handlePopoverOpen}>
          <MoreVertIcon />
        </Action>
      </Actions>
    ) : (
      <Actions>{action}</Actions>
    );

    return (
      <MuiCard {...rest} className={cls}>
        <CardHeader
          title={title}
          subheader={subheader}
          avatar={avatar}
          action={actions}
          classes={{
            content: classes.headerContent,
            title: classes.headerTitle,
            avatar: classes.avatar,
            subheader: classes.headerSubheader,
            action: classes.headerAction
          }}
        />
        {menu && (
          <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            PaperProps={{ square: true }}
            onClose={this.handlePopoverClose}
          >
            {menu}
          </Popover>
        )}
        <div className={classes.content}>{children}</div>
      </MuiCard>
    );
  }
  private handlePopoverOpen = (event: MouseEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    horizontal: {
      color: theme.palette.text.secondary,

      '& $headerTitle': {
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightRegular
      },
      '& $headerContent': {
        display: 'flex',
        '&:hover': {
          '& $headerTitle': {
            color: theme.palette.secondary.main
          }
        }
      },
      '& $headerSubheader': {
        color: theme.palette.text.primary,
        '&:before': {
          content: '"|"',
          color: theme.palette.text.secondary,
          margin: '0 4px'
        }
      }
    },
    avatar: {
      display: 'flex',
      marginRight: 8
    },
    content: theme.mixins.gutters({
      '&:last-child': {
        paddingBottom: 16
      }
    }),
    verical: {},
    headerTitle: {},
    headerContent: {},
    headerSubheader: {},
    headerAction: {
      marginTop: 0
    }
  });

export default withStyles(styles)(Card);
