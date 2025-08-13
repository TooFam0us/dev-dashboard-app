export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ['whatwg-fetch'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform:{
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};