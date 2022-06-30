import Tracks from "./tracks/Tracks";
import Albums from "./albums/Albums";
import Artists from "./artists/Artists";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, display: 'flex', height: 900 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 2, borderColor: 'divider' }}
                color="white"
            >
                <Tab label="Albums" />
                <Tab label="Tracks" />
                <Tab label="Artists" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Albums />
            </TabPanel>
            <TabPanel value={value} index={1} >
                <Tracks />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Artists />
            </TabPanel>
        </Box>
    );
}