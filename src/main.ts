import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { cwd } from 'process';

async function run(): Promise<void> {
  try {
    const version = core.getInput('version');

    // install OpenAPI Generator
    await exec.exec('npm install -g @openapitools/openapi-generator-cli');
    const openApiGenerator = 'openapi-generator-cli';
    await exec.exec(openApiGenerator, ['version-manager', 'set', version]);

    // required args
    const generator = core.getInput('generator') || 'go';

    const input = core.getInput('input') || './examples/petstore/petstore-expanded.yaml';
    const output = core.getInput('output') || './examples/petstore/api';

    const generateArgs = ['generate', '-g', generator, '-i', input, '-o', output];

    // optional properties
    const packageName = core.getInput('package-name');
    if (packageName) {
      generateArgs.push('--package-name', packageName)
    }
    const gitUserId = core.getInput('git-user-id');
    if (gitUserId) {
      generateArgs.push('--git-user-id', gitUserId)
    }
    const gitRepoId = core.getInput('git-repo-id');
    if (gitRepoId) {
      generateArgs.push('--git-repo-id', gitRepoId)
    }
    const ignoreFileOverride = core.getInput('--ignore-file-overrride');
    if (ignoreFileOverride) {
      generateArgs.push('--ignore-file-override', ignoreFileOverride);
    }
    const config = core.getInput('config') || './examples/petstore/config.yaml';
    if (config) {
      generateArgs.push('--config', config);
    }
    const additionalProperties = core.getInput('additional-properties');
    if (additionalProperties) {
      generateArgs.push('-p', config);
    }

    await exec.exec(openApiGenerator, generateArgs);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
