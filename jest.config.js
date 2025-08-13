export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ['whatwg-fetch'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform:{
        '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }]
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    globals: {
        'ts-jest': {
            useESM: true,
            tsconfig: 'tsconfig.json',
        },
    },
};