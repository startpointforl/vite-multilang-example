import fs from "fs";

interface ManifestChunk {
  file: string;
  css?: string[];
  imports?: string[];
}

type Manifest = Record<string, ManifestChunk>;

function loadManifest(filePath: string): Manifest {
  const rawManifest = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawManifest);
}

function getImportedChunks(
  manifest: Manifest,
  entry: string,
  seen = new Set<string>()
): ManifestChunk[] {
  const result: ManifestChunk[] = [];
  const stack = [entry];

  while (stack.length > 0) {
    const current = stack.pop();
    if (current && !seen.has(current)) {
      seen.add(current);
      const chunk = manifest[current];
      if (chunk) {
        result.push(chunk);
        if (chunk.imports) {
          stack.push(...chunk.imports);
        }
      }
    }
  }

  return result;
}

export function getStaticLinks({
  manifestFilePath,
  entryPoint,
}: {
  manifestFilePath: string;
  entryPoint: string;
}): string {
  const manifest = loadManifest(manifestFilePath);
  const entryChunk = manifest[entryPoint];
  if (!entryChunk) {
    throw new Error(`Entry point "${entryPoint}" not found in the manifest.`);
  }

  let html = "";

  const importedChunks = getImportedChunks(manifest, entryPoint);
  importedChunks.forEach((chunk) => {
    if (chunk.css) {
      chunk.css.forEach((cssFile) => {
        html += `<link rel="stylesheet" href="/${cssFile}" />\n`;
      });
    }
  });

  html += `<script type="module" src="/${entryChunk.file}"></script>\n`;

  importedChunks.forEach((chunk) => {
    html += `<link rel="modulepreload" href="/${chunk.file}" />\n`;
  });

  return html;
}
