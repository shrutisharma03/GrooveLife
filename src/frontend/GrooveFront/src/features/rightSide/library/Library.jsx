import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import History from './history/History'
import LikedSongs from './likedSongs/LikedSongs'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }} >
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

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: '#12012', display: 'flex', height: 900 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 2, borderColor: 'divider' }}
                textColor="white"
            >
                <Tab label="Liked Songs" {...a11yProps(0)} />
                <Tab label="Recents" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0} >
                <LikedSongs />
            </TabPanel>
            <TabPanel value={value} index={1} >
                <History />
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
      <Playlists/>
      </TabPanel> */}
        </Box>
    );
}