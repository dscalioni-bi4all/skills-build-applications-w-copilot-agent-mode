export const port = 8000;

const codespaceName = process.env.CODESPACE_NAME;

export const baseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;
