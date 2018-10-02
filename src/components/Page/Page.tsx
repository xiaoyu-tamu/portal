import { AppBar, LinearProgress, Toolbar, Typography, Grid } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { PureComponent, ReactNode } from 'react';
import { connect, RootState } from '~/redux';
import { BaseProps } from '~/utilities/types';
import { Actions } from '../Actions';
import { Notifications } from '../Notifications';
import { Search } from '../Search';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { GridSize, GridSpacing } from '@material-ui/core/Grid';

export interface PageProps extends BaseProps {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  grid?: Partial<Record<Breakpoint, boolean | GridSize>>;
  spacing?: GridSpacing;
}

interface StateProps {
  loading: boolean;
}
interface DispatchProps {}

type Props = PageProps & StateProps & DispatchProps & WithStyles<typeof styles>;

type State = {};

class Page extends PureComponent<Props, State> {
  readonly initialState: State = {};

  state = this.initialState;

  static defaultProps = {
    spacing: 16 as GridSpacing
  };

  render() {
    const { classes, className, children, left, right, loading, grid, spacing } = this.props;

    const cls = classNames(classes.root, className);
    return (
      <div className={cls}>
        {loading && <LinearProgress className={classes.loader} />}
        {this.renderHeader()}
        <Toolbar>
          {left}
          {right}
        </Toolbar>
        <div className={classes.content}>
          <main className={classes.main}>
            {grid ? (
              <Grid container spacing={spacing}>
                {React.Children.map(
                  children,
                  (child) =>
                    React.isValidElement(child) && (
                      <Grid item {...grid}>
                        {child}
                      </Grid>
                    )
                )}
              </Grid>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    );
  }
  private renderHeader() {
    const { title, classes } = this.props;
    return (
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" color="inherit">
            {title || 'Console'}
          </Typography>
          <Search width={500} />
          <Actions>
            <Notifications />
          </Actions>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      paddingTop: theme.mixins.toolbar.minHeight
    },
    content: {
      height: '100%',
      overflow: 'auto'
    },
    toolbar: {
      justifyContent: 'space-between'
    },

    main: {
      height: '100%',
      maxWidth: 960 - 32,
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 16,
        marginRight: 16
      }
    },

    loader: {
      zIndex: theme.zIndex.appBar + 1,
      top: 0,
      left: 'auto',
      right: 0,
      width: '100%',
      position: 'fixed'
    },
    '@global': {
      body: {
        height: '100%',
        overflow: 'hidden'
      },
      '#__next': {
        height: '100%'
      },
      html: {
        height: '100%'
      }
    }
  });

const withRedux = connect<StateProps, DispatchProps, PageProps, RootState>(
  (state) => ({ loading: false }),
  (dispatch) => ({})
);

export default withRedux(withStyles(styles)(Page));
