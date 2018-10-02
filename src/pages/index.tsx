import { Button, LinearProgress, IconButton, Grid } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import React, { PureComponent } from 'react';
import { Card } from '~/components/Card';
import { Page } from '~/components/Page';
import FaceIcon from '@material-ui/icons/Face';
import { Actions } from '~/components/Actions';
type Props = WithStyles<typeof styles>;
class IndexPage extends PureComponent<Props> {
  initialState = {
    loading: true
  };
  state = this.initialState;

  componentDidMount() {}

  render() {
    const { loading } = this.state;
    const { classes } = this.props;
    return (
      <Page title="">
        <Grid container spacing={16}>
          <Grid item xs={4}>
            <Card
              menu={[]}
              title="djakjdslka"
              variant="horizontal"
              subheader="dajsdhasjkdhkja"
              avatar={<FaceIcon />}
            >
              {__filename}
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card
              menu={[]}
              title="djakjdslka"
              variant="horizontal"
              subheader="dajsdhasjkdhkja"
              avatar={<FaceIcon />}
            >
              adskljjasldja
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card
              menu={[]}
              title="djakjdslka"
              variant="horizontal"
              subheader="dajsdhasjkdhkja"
              avatar={<FaceIcon />}
            >
              adskljjasldja
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              title="djakjdslka"
              variant="horizontal"
              subheader="dajsdhasjkdhkja"
              avatar={<FaceIcon />}
            >
              adskljjasldja
            </Card>
          </Grid>
        </Grid>
      </Page>
    );
  }
}

const styles = ({  }: Theme) =>
  createStyles({
    loader: {}
  });

export default withStyles(styles)(IndexPage);
