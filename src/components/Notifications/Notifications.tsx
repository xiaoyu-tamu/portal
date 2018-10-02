import React, { PureComponent } from 'react';
import { IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { BaseProps } from '~/utilities/types';

export interface NotificationsProps extends BaseProps {}

type Props = NotificationsProps & WithStyles<typeof styles>;

type State = {};

class Notifications extends PureComponent<Props, State> {
  readonly initialState: State = {};
  state = this.initialState;

  render() {
    const { classes, className } = this.props;
    const cls = classNames(classes.root, className);
    return (
      <IconButton className={cls} color="inherit">
        <NotificationsIcon />
      </IconButton>
    );
  }
}

const styles = ({  }: Theme) =>
  createStyles({
    root: {}
  });

export default withStyles(styles)(Notifications);
