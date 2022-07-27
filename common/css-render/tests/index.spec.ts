import { describe, it, expect } from 'vitest'
import { redner } from '../src'

describe('css render', () => {
  it('render', () => {
    expect(
      redner([
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
      redner([
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
      redner(
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
      redner(
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
})
