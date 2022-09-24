package.json

{
    "package_version": 2,
    "version": "1.0.1",
    "name": "responsive2d",
    "description": "i18n:responsive2d.description",
    "main": "./dist/main.js",
    "devDependencies": {
        "@types/node": "^16.0.1",
        "typescript": "^4.3.4"
    },
    "author": "agonima",
    "editor": ">=3.6.0",
    "scripts": {
        "build": "tsc -b",
        "watch": "tsc -w"
    },
    "contributions": {
        "inspector": {
            "section": {
                "node": {
                    "Responsive2D": "./dist/contributions/inspector/responsive2d.js"
                }
            }
        },
      //  "asset-db": {
      //    "mount": {
      //        "path": "./assets",
      //        "readonly": true
      //   }
      //  }
    }
}


tsconfig.json
{
    "compilerOptions": {
        "target": "ES2017",
        "module": "CommonJS",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "moduleResolution": "node",
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "experimentalDecorators": true
    },
    //"exclude": ["./assets"]
}