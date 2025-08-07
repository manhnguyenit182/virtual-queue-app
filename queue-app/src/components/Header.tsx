import React from 'react';
import { Heading } from '@gluestack-ui/themed';
import { COLORS } from '../constants';

function Header(): React.JSX.Element {
    return (
        <Heading
            size="2xl"
            textAlign="center"
            color="#fff"
            padding={16}
            backgroundColor={COLORS.primary}
        >
            Lấy số thứ tự
        </Heading>
    );
}

export default Header;
