import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    a: {
      textDecoration: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  link: {
    margin: theme.spacing(1, 0.5),
  },
  modalSection: {
    marginBottom: theme.spacing(2.5),
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  highlightBox: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function Header({ isSignedIn, onSignOut }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const onClick = () => {
    if (isSignedIn && onSignOut) {
      onSignOut();
    }
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            component={RouterLink}
            to="/"
          >
            App
          </Typography>

          <div className={classes.navActions}>
            <Button
              color="default"
              variant="text"
              className={classes.link}
              onClick={handleOpenModal}
            >
              About this Demo
            </Button>
            <Button
              color="primary"
              variant="outlined"
              className={classes.link}
              component={RouterLink}
              to={isSignedIn ? '/' : '/auth/signin'}
              onClick={onClick}
            >
              {isSignedIn ? 'Logout' : 'Login'}
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Explanatory Demo Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Demo Architecture: Microfrontends & Module Federation
        </DialogTitle>
        <DialogContent dividers>
          {/* Section 1: Purpose */}
          <div className={classes.modalSection}>
            <Typography variant="subtitle1" className={classes.sectionTitle} color="primary">
              🎯 Purpose of this Demo
            </Typography>
            <Typography variant="body2" color="textSecondary">
              This project is a proof of concept demonstrating how to compose multiple independent frontend applications into a unified user experience using <strong>Webpack 5 Module Federation</strong>.
            </Typography>
            <div className={classes.highlightBox}>
              <Typography variant="body2" paragraph style={{ marginBottom: 8 }}>
                ℹ️ <strong>No external APIs / backend:</strong> This application does not make calls to external APIs or require a backend server for business logic. All routing and rendering happen purely on the client side at runtime.
              </Typography>
              <Typography variant="body2" style={{ marginBottom: 0 }}>
                🔑 <strong>Mock Authentication:</strong> The login does not validate credentials. Simply clicking <strong>&quot;Sign In&quot;</strong> or <strong>&quot;Sign Up&quot;</strong> (with any or no credentials) simulates logging in so you can test the authenticated dashboard flow.
              </Typography>
            </div>
          </div>

          <Divider className={classes.divider} />

          {/* Section 2: Mounting */}
          <div className={classes.modalSection}>
            <Typography variant="subtitle1" className={classes.sectionTitle} color="primary">
              🧩 Microfrontend Mounting (Host + Remotes)
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Each microfrontend is built in isolation and exposes a generic <code>mount()</code> function that the host container executes within its own lifecycle:
            </Typography>
            <div className={classes.chipContainer}>
              <Chip label="Container (Host - React)" color="primary" variant="outlined" />
              <Chip label="Marketing (Remote - React 17)" variant="outlined" />
              <Chip label="Auth (Remote - React 17)" variant="outlined" />
              <Chip label="Dashboard (Remote - Vue 3)" variant="outlined" />
            </div>
            <div className={classes.highlightBox} style={{ marginTop: 12 }}>
              <Typography variant="body2">
                • <strong>Multi-framework:</strong> The host shell (React) seamlessly mounts both React applications (Marketing, Auth) and Vue 3 applications (Dashboard) within the same DOM without runtime conflicts.
              </Typography>
            </div>
          </div>

          <Divider className={classes.divider} />

          {/* Section 3: Communication */}
          <div className={classes.modalSection}>
            <Typography variant="subtitle1" className={classes.sectionTitle} color="primary">
              🔄 Inter-App Communication & Synchronization
            </Typography>
            <Typography variant="body2" color="textSecondary">
              To keep applications decoupled, communication relies on clean callback-based contracts:
            </Typography>
            <div className={classes.highlightBox}>
              <Typography variant="body2" paragraph style={{ marginBottom: 8 }}>
                • <strong>Route Synchronization (<code>onNavigate</code>):</strong> The host shell and remote apps notify each other whenever routes change to keep browser URLs in sync without full page reloads.
              </Typography>
              <Typography variant="body2" paragraph style={{ marginBottom: 8 }}>
                • <strong>Authentication State (<code>onSignIn / onSignOut</code>):</strong> When you click Sign In / Sign Up, the Auth microfrontend emits an <code>onSignIn</code> event to the Container. The Container updates its global state (<code>isSignedIn = true</code>) and navigates to <code>/dashboard</code>.
              </Typography>
              <Typography variant="body2" style={{ marginBottom: 0 }}>
                • <strong>Protected Routes:</strong> The Container acts as a route guard, redirecting unauthenticated users away from <code>/dashboard</code> if <code>isSignedIn</code> is false.
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" variant="contained">
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

