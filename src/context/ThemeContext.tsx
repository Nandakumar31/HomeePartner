
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

export const ThemeProvider = ({ children }: any) => {
    const theme = {
        color: '#03894E',
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
