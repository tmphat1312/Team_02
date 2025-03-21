/**
 * Adapted from https://github.com/prettymuchbryce/http-status-codes/blob/c840bc674ab043551b87194d1ebb5415f222abbe/scripts/update-codes.ts
 * Generates legacy format only.
 */

import consola = require("consola");
import { execSync } from "node:child_process";
import { Project, VariableDeclarationKind } from "ts-morph";

interface JSONCodeComment {
  doc: string;
  description: string;
}

interface JSONCode {
  code: number;
  phrase: string;
  constant: string;
  comment: JSONCodeComment;
  isDeprecated?: boolean;
}

const run = async () => {
  consola.start(
    "Updating src/constants/http-status-codes.ts and src/constants/http-status-phrases.ts"
  );

  const project = new Project({
    tsConfigFilePath: "tsconfig.json",
  });
  const response = await fetch(
    "https://raw.githubusercontent.com/prettymuchbryce/http-status-codes/refs/heads/master/codes.json"
  );

  if (!response.ok) {
    throw new Error(`Error retrieving codes: ${response.statusText}`);
  }

  const Codes = (await response.json()) as JSONCode[];

  const statusCodeFile = project.createSourceFile(
    "src/constants/http-status-codes.ts",
    {},
    {
      overwrite: true,
    }
  );

  statusCodeFile.insertStatements(0, "// Generated file. Do not edit\n");
  statusCodeFile.insertStatements(
    1,
    `// Codes retrieved on ${new Date().toUTCString()} from https://raw.githubusercontent.com/prettymuchbryce/http-status-codes/refs/heads/master/codes.json`
  );

  Codes.forEach(({ code, constant, comment, isDeprecated }) => {
    statusCodeFile
      .addVariableStatement({
        isExported: true,
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            name: constant,
            initializer: code.toString(),
          },
        ],
      })
      .addJsDoc({
        description: `${isDeprecated ? "@deprecated\n" : ""}${comment.doc}\n\n${
          comment.description
        }`,
      });
  });

  const phrasesFile = project.createSourceFile(
    "src/constants/http-status-phrases.ts",
    {},
    {
      overwrite: true,
    }
  );

  phrasesFile.insertStatements(0, "// Generated file. Do not edit\n");
  phrasesFile.insertStatements(
    1,
    `// Phrases retrieved on ${new Date().toUTCString()} from https://raw.githubusercontent.com/prettymuchbryce/http-status-codes/refs/heads/master/codes.json`
  );

  Codes.forEach(({ constant, phrase, comment, isDeprecated }) => {
    phrasesFile
      .addVariableStatement({
        isExported: true,
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            name: constant,
            initializer: `"${phrase}"`,
          },
        ],
      })
      .addJsDoc({
        description: `${isDeprecated ? "@deprecated\n" : ""}${comment.doc}\n\n${
          comment.description
        }`,
      });
  });

  await project.save();
  // execSync(
  //   "npx eslint --fix ./src/constants/http-status-codes.ts ./src/constants/http-status-phrases.ts"
  // );
  consola.success(
    "Successfully generated src/constants/http-status-codes.ts and src/constants/http-status-phrases.ts"
  );
};

run();
