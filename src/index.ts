import execa from 'execa'

export default function (api) {
  api.addRequirement('Vue CLI', async () => {
    const { failed } = await execa('vue', [
      '--version'
    ], {
      cwd: api.options.baseFolder,
      shell: true,
    })
    return failed
  }, async () => {
    await execa('npm', [
      'i',
      '-g',
      '@vue/cli'
    ])
  })

  api.onGenerate(async () => {
    await execa('vue', [
      'create',
      api.options.projectName,
      '-d',
    ], {
      cwd: api.options.baseFolder,
      shell: true,
      stdio: ['inherit', 'inherit', 'inherit']
    })
  })
}
