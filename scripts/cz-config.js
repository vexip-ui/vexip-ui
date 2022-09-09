const pad = str => str.padEnd(10, ' ')
const type = (name, description) => {
  return { value: name, name: `${pad(`${name}:`)}${description}` }
}

module.exports = {
  types: [
    type('feat', 'A new feature | 一个新的特性'),
    type('fix', 'A bug fix | 一个BUG的修复'),
    type('perf', 'Performance optimization | 性能优化'),
    type('style', 'Code style tuning | 代码样式调优'),
    type('docs', 'Documentation related changes | 文档相关的修改'),
    type('test', 'Testing related | 测试相关'),
    type('refactor', 'Code refactoring | 代码重构'),
    type('build', 'build and dependencies | 构建和依赖相关'),
    type('ci', 'Continuous integration related | 持续集成和部署相关'),
    type('chore', 'Change for chore | 日常事务的修改'),
    type('revert', 'Rollback to a commit | 回退到某次的提交'),
    type('workflow', 'Workflow related | 工作流相关'),
    type('wip', 'Code in progress | 正在开发中的代码'),
    type('types', 'Types related 类型相关'),
    type('release', 'New version release | 新版本的发布')
  ],

  scopes: [
    { name: 'component' },
    { name: 'directive' },
    { name: 'mixin' },
    { name: 'design' },
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
    type: 'Select the type of change you want to submit:',
    scope: 'Select the scope of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Fill in the scope of this change:',
    subject: 'Write a brief description of this change:\n',
    body: 'To provide a more detailed description of this change, use \'|\' for newlines (optional):\n',
    breaking: 'List any breaking change for this change (optional):\n',
    footer: 'List all issues closed by this change, e.g. \'#31, #34\' (optional):\n',
    confirmCommit: 'Confirm to commit?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'refactor', 'revert'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 50,
  breaklineChar: '|',
  footerPrefix: 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
