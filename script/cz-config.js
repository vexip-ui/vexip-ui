module.exports = {
  types: [
    { value: 'feat', name: 'feat:     一个新的特性' },
    { value: 'fix', name: 'fix:      一个BUG的修复' },
    { value: 'docs', name: 'docs:     仅限文档相关的修改' },
    {
      value: 'style',
      name: 'style:    不影响代码运行逻辑的修改 (代码样式)\n            (增减空格, 修改格式, 行末分号修改等)'
    },
    {
      value: 'refactor',
      name: 'refactor: 未影响实际功能和特性的代码重写 (重构)'
    },
    {
      value: 'perf',
      name: 'perf:     用于提高性能的代码修改 (性能优化)'
    },
    { value: 'test', name: 'test:     添加测试相关的代码' },
    {
      value: 'chore',
      name: 'chore:    更改构建过程或辅助工具\n            和诸如文档生成之类的库'
    },
    { value: 'dev', name: 'dev:      正在开发中的, 未完整的代码' },
    { value: 'build', name: 'build:    新版本的构建, 发布等 (新版本号)' },
    { value: 'revert', name: 'revert:   回退到某次的提交 (还原代码)' }
  ],

  scopes: [
    { name: 'component' },
    { name: 'directives' },
    { name: 'mixins' },
    { name: 'style' },
    { name: 'util' }
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择您要提交的更改类型:',
    scope: '\n选择此更改的范围 (可选的):',
    // used if allowCustomScopes is true
    customScope: '填写此更改的范围:',
    subject: '对此更改撰写一个简短的描述:\n',
    body: '提供此更改更详细的描述, 使用 "|" 来进行换行 (可选的):\n',
    breaking: '列出此更改的任意破坏性更改 (可选的):\n',
    footer: '列出此更改关闭的所有问题, 例如 "#31, #34" (可选的):\n',
    confirmCommit: '您确定要继续上面的提交吗?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body', 'footer'],

  // limit subject length
  subjectLimit: 50,
  breaklineChar: '|',
  footerPrefix: 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
