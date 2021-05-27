const pad = str => str.padEnd(10, ' ')
const type = (name, description) => {
  return { value: name, name: `${pad(`${name}:`)}${description}` }
}

module.exports = {
  types: [
    type('feat', '一个新的特性'),
    type('fix', '一个BUG的修复'),
    type('perf', '用于提高性能的代码修改 (性能优化)'),
    type('style', '代码样式相关的修改 (增减空格, 修改格式, 行末分号修改等)'),
    type('docs', '仅限文档相关的修改'),
    type('test', '添加或修改测试相关的代码'),
    type('refactor', '未影响实际功能和特性的代码重写 (重构)'),
    type('build', '与构建和依赖相关的开发或更改'),
    type('ci', '与持续集成和部署相关的开发或修改'),
    type('chore', '日常事务的调整或修改'),
    type('revert', '回退到某次的提交 (还原代码)'),
    type('workflow', '与工作流相关的开发或修改'),
    type('wip', '正在开发中的, 未完整的代码'),
    type('types', 'TypeScript 类型相关的修改'),
    type('release', '新版本的发布')
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
    type: '选择您要提交的更改类型:',
    scope: '选择此更改的范围 (可选的):',
    // used if allowCustomScopes is true
    customScope: '填写此更改的范围:',
    subject: '对此更改撰写一个简短的描述:\n',
    body: '提供此更改更详细的描述, 使用 "|" 来进行换行 (可选的):\n',
    breaking: '列出此更改的任意破坏性更改 (可选的):\n',
    footer: '列出此更改关闭的所有问题, 例如 "#31, #34" (可选的):\n',
    confirmCommit: '您确定要继续上面的提交吗?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'revert'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 50,
  breaklineChar: '|',
  footerPrefix: 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
