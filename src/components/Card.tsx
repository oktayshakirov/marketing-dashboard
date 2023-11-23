import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";

// Define interfaces for props
interface CardProps extends BoxProps {
    variant?: string;
}

interface CardBodyProps extends BoxProps {
    variant?: string;
}

interface CardHeaderProps extends BoxProps {
    variant?: string;
}

// Card Component
function Card({ variant, children, ...rest }: CardProps) {
    const styles = useStyleConfig("Card", { variant });
    return (
        <Box __css={styles} {...rest}>
            {children}
        </Box>
    );
}

// CardBody Component
function CardBody({ variant, children, ...rest }: CardBodyProps) {
    const styles = useStyleConfig("CardBody", { variant });
    return (
        <Box __css={styles} {...rest}>
            {children}
        </Box>
    );
}

// CardHeader Component
function CardHeader({ variant, children, ...rest }: CardHeaderProps) {
    const styles = useStyleConfig("CardHeader", { variant });
    return (
        <Box __css={styles} {...rest}>
            {children}
        </Box>
    );
}

export { Card, CardBody, CardHeader };
