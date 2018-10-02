import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { cloneChildrenWithClassName } from '@material-ui/core/utils/reactHelpers';
import classNames from 'classnames';

export interface ActionsProps {}

type Props = ActionsProps & WithStyles<typeof styles>;

const Actions: React.SFC<Props> = ({ classes, children, ...rest }) => {
  const cls = classNames(classes.root);
  return (
    <div className={cls} {...rest}>
      {}
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

export default withStyles(styles)(Actions);
