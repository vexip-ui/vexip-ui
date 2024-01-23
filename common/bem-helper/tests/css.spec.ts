import { describe, expect, it } from 'vitest'

import { render } from '../src'

describe('css render', () => {
  it('render', () => {
    expect(
      render([
        {
          '.box': {
            width: '100px'
          },
          '.card': {
            width: '100px',
            backgroundColor: 'red'
          }
        }
      ])
    ).toEqual(`.box {
  width: 100px;
}
.card {
  width: 100px;
  background-color: red;
}`)
  })

  it('render at rule', () => {
    expect(
      render([
        {
          '@media screen': [
            {
              '.box': {
                width: '60px'
              }
            }
          ]
        },
        {
          '.box': {
            width: '100px'
          }
        }
      ])
    ).toEqual(`@media screen {
  .box {
    width: 60px;
  }
}
.box {
  width: 100px;
}`)
  })

  it('render minify', () => {
    expect(
      render(
        [
          {
            '.box': {
              width: '100px'
            },
            '.card': {
              width: '100px',
              backgroundColor: 'red'
            }
          }
        ],
        true
      )
    ).toEqual('.box{width:100px}.card{width:100px;background-color:red}')

    expect(
      render(
        [
          {
            '@media screen': [
              {
                '.box': {
                  width: '60px'
                }
              }
            ]
          },
          {
            '.box': {
              width: '100px'
            }
          }
        ],
        true
      )
    ).toEqual('@media screen{.box{width:60px}}.box{width:100px}')
  })

  it('css variables', () => {
    expect(
      render(
        [
          {
            '.box': {
              '--color': 'red',
              color: 'var(--color)'
            }
          }
        ],
        true
      )
    ).toEqual('.box{--color:red;color:var(--color)}')
  })
})
