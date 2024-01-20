import Card from "@/components/Card";
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Select, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Settings: React.FC = () => {
    const handleSaveSettings = () => {
        // Implement logic to save settings
    };

    return (
        <Card>
            <Box p={5}>
                <Text fontSize="2xl" mb={4}>
                    Dashboard Settings
                </Text>

                <VStack spacing={8} align="start">
                    <FormControl>
                        <FormLabel htmlFor="theme">Theme</FormLabel>
                        <Select id="theme" placeholder="Select Theme">
                            <option value="utc">Light</option>
                            <option value="est">Dark</option>
                            <option value="pst">Green</option>
                            <option value="pst">Blue</option>
                            <option value="pst">Red</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="timezone">Timezone</FormLabel>
                        <Select id="timezone" placeholder="Select timezone">
                            <option value="utc">UTC</option>
                            <option value="est">EST</option>
                            <option value="pst">PST</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="notificationFrequency">Notification Frequency</FormLabel>
                        <Select id="notificationFrequency" placeholder="Select frequency">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="language">Language</FormLabel>
                        <Select id="language" placeholder="Select language">
                            <option value="en">English</option>
                            <option value="de">German</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="bg">Bulgarian</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="currency">Currency</FormLabel>
                        <Select id="currency" placeholder="Select currency">
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                            <option value="gbp">GBP</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="changePassword">Change Password</FormLabel>
                        <Input type="password" id="changePassword" placeholder="Enter new password" />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="emailNotifications">Email Notifications</FormLabel>
                        <Stack spacing={2} pl={6}>
                            <Checkbox id="receiveEmailNotifications">Receive email notifications</Checkbox>
                            <Checkbox id="dontReceiveEmailNotifications">Don't receive email notifications</Checkbox>
                        </Stack>
                    </FormControl>

                    <Button colorScheme="teal" onClick={handleSaveSettings}>
                        Save Settings
                    </Button>
                </VStack>
            </Box>
        </Card>
    );
};

export default Settings;
