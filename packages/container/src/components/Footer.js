import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 3),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'left',
    },
  },
  projectInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  },
  githubButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 8,
    padding: theme.spacing(0.75, 2),
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));

export default function Footer() {
  const classes = useStyles();
  const githubUrl = 'https://github.com/barriedirk/proof-of-concept-ecommerce-dotnet-8-angular-stripe';

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.projectInfo}>
          <Typography variant="subtitle2" color="textPrimary" style={{ fontWeight: 600 }}>
            Microfrontend Architecture Demo
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Built with Webpack 5 Module Federation, React & Vue 3
          </Typography>
          <Typography variant="caption" color="textSecondary">
            © {new Date().getFullYear()} Barrie Freyre. Open Source Proof of Concept.
          </Typography>
        </div>

        <Box>
          <Button
            variant="outlined"
            color="primary"
            className={classes.githubButton}
            component={Link}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
          >
            View on GitHub
          </Button>
        </Box>
      </Container>
    </footer>
  );
}
