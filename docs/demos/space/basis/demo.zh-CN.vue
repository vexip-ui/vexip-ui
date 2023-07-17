<!-- <template>
  <Space>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
  </Space>
</template> -->

<script lang="jsx">
import { Space } from 'vexip-ui'

export default {
  setup() {
    return () => (
      <Space>
        <>
          {'666'}
          <span>{'123'}</span>
          {'23333\r'}
        </>
      </Space>
    )
  }
}
</script>
