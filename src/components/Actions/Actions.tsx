import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { cloneChildrenWithClassName } from '@material-ui/core/utils/reactHelpers';
import classNames from 'classnames';
import { BaseProps } from '~/utilities/types';

type Position = 'left' | 'right' | 'default';

export interface ActionsProps extends BaseProps {
  position?: Position;
}

type Props = ActionsProps & WithStyles<typeof styles>;

const Actions: React.SFC<Props> = ({
  position = 'default',
  className,
  classes,
  children,
  ...rest
}) => {
  const cls = classNames(classes.root, className, {
    [classes[position!]]: position !== 'default'
  });
  return (
    <div className={cls} {...rest}>
      {cloneChildrenWithClassName(children, classes.child)}
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    default: {},
    right: { marginLeft: 'auto' },
    left: { marginRight: 'auto' },
    child: {
      '&:not(:first-child)': { marginLeft: -4 },
      '&:not(:last-child)': { marginRight: -4 }
    }
  });

export default withStyles(styles)(Actions);
