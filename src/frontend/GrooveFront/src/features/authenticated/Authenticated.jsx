import Player from '../player/Player';
import RightSide from '../rightSide/RightSide';
import { Drawer, Box } from '@mui/material';
import { keyframes } from '@mui/styled-engine';

const undulate = keyframes`
0% {
    background-position: 0% 50%;
}
50% {
    background-position: 100% 50%;
}
100% {
    background-position: 0% 50%;
}
`

const drawerWidth = 300;

function AuthenticatedApp() {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
                backgroundSize: '400% 400%',
                // animation: `${undulate} 30s ease infinite`,
                overflowY: 'hidden'
            }}
        >
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                <Player />
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 1,
                    overflowY: 'hidden',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
            >
                <RightSide />
            </Box>
        </Box>
    )
}

export default AuthenticatedApp