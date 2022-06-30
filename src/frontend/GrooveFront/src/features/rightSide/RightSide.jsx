import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Searchicon from '@mui/icons-material/Search';
import Libraryicon from '@mui/icons-material/LibraryAdd';
import Discovericon from '@mui/icons-material/MusicNote';
import Discover from './discover/Discover';
import Search from './search/Search';
import Library from './library/Library';
import Box from '@mui/material/Box';
import Profile from './profile/Profile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


export default function RightSide() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', p: 0 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab style={{ fontWeight: "bold", color: 'white', edge: "start" }} icon={<Searchicon />} iconPosition="start" label="SEARCH" />
                    <Tab style={{ fontWeight: "bold", color: 'white', edge: "middle" }} icon={<Discovericon />} iconPosition="start" label="Discover" />
                    <Tab style={{ fontWeight: "bold", color: 'white', edge: "end" }} icon={<Libraryicon />} iconPosition="start" label="Library" />
                    <Tab style={{ fontWeight: "bold", color: 'white', edge: "end" }} edge="end" icon={<AccountCircleIcon />} iconPosition="start" label="Profile" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Search />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Discover />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Library />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Profile />
            </TabPanel>
        </Box>
    );
}