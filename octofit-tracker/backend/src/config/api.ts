export const port = 8000;
export const frontendPort = 5173;

const codespaceName = process.env.CODESPACE_NAME;
const domain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev';

export const baseUrl = codespaceName
  ? `https://${codespaceName}-${port}.${domain}`
  : `http://localhost:${port}`;

export const frontendUrl = codespaceName
  ? `https://${codespaceName}-${frontendPort}.${domain}`
  : `http://localhost:${frontendPort}`;
