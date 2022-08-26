import { execSync } from "child_process";

const gitRev = execSync("git rev-parse --short HEAD").toString().trim();
export default function useGitRev() {
  return gitRev;
}
