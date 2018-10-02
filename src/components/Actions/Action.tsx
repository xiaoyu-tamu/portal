import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';

type Size = 'small' | 'medium';

export interface ActionProps extends IconButtonProps {
  size?: Size;
}

type Props = ActionProps & WithStyles<typeof styles>;

const Action: React.SFC<Props> = ({ size, className, classes, ...rest }) => {
  return size ? (
    <IconButton classes={{ root: classes[size] }} {...rest} />
  ) : (
    <IconButton {...rest} />
  );
};

const styles = (theme: Theme) =>
  createStyles({
    small: {
      padding: 4
    },
    medium: {
      padding: 8
    }
  });

export default withStyles(styles)(Action);
