module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "airbnb",
        "plugin:prettier/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        quotes: ['warn', 'single'],
        // rule for identation
        indent: ['warn', 4],
        // rule for unused variables
        'no-unused-vars': 'warn',
        // console
        'no-console': 'warn',
        // space between after , 
        'comma-spacing': 'warn',
        
    }
}
