import { Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../../../app/auth_api/authSlice';
import { Button } from '@mui/material';

function Profile() {
    const dispatch = useDispatch()
    function clickHandler() {
        dispatch(logout())
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Button onClick={clickHandler} color="error" variant="contained" endIcon={<LogoutIcon />}>
                Logout
            </Button>
        </Box>
    )
}

export default Profile