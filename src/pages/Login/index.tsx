import { Button, Flex, Heading, VStack, Wrap } from "@chakra-ui/react";
import Card from "@components/Card";
import { Link } from "react-router-dom";

type LoginProps = unknown;

const Login: React.FC<LoginProps> = () => {
    return (
        <Flex direction="column" w={"100%"} h="100vh" alignItems={"center"} bgSize="cover" pt="50px">
            <Card>
                <VStack>
                    <Heading color={"brand.gray.500"} size="xl">
                        Ogno Dashboard
                    </Heading>
                    <Heading color={"brand.gray.500"} size="lg">
                        Join now!
                    </Heading>
                    <VStack mb={10} mt={10}>
                        <Button
                            w={"85%"}
                            mb={2}
                            variant="solid"
                            bg={"brand.gray.50"}
                            color={"brand.gray.400"}
                            borderRadius={"9999px"}
                            borderColor="brand.gray.900"
                            borderWidth="2px"
                            size="lg"
                            as={Link}
                            reloadDocument={true}
                        >
                            Connect with Google
                        </Button>
                        <Button
                            w={"85%"}
                            mb={2}
                            variant="solid"
                            bg={"brand.gray.50"}
                            color={"brand.gray.400"}
                            borderRadius={"9999px"}
                            borderColor="brand.gray.900"
                            borderWidth="2px"
                            size="lg"
                            as={Link}
                            reloadDocument={true}
                        >
                            Connect with Facebook
                        </Button>
                        {import.meta.env.DEV && (
                            <Button
                                w={"85%"}
                                mb={2}
                                variant="solid"
                                bg={"brand.gray.50"}
                                color={"brand.gray.400"}
                                borderRadius={"9999px"}
                                borderColor="brand.gray.900"
                                borderWidth="2px"
                                size="lg"
                                as={Link}
                                reloadDocument={true}
                            >
                                Fake Login
                            </Button>
                        )}
                        <Wrap
                            fontSize={"xs"}
                            color={"brand.gray.500"}
                            justify={"center"}
                            spacing={0}
                            lineHeight={"125%"}
                            m={2}
                        >
                            By signing up, you agree to the Terms of Service and Privacy Policy, including cookie use.
                        </Wrap>
                    </VStack>
                </VStack>
            </Card>
        </Flex>
    );
};
export default Login;
