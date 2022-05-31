<template>
  <Row>
    <Column :span="16">
      <Scroll
        ref="scroll"
        use-y-bar
        style="padding: 15px; margin-right: 15px; box-shadow: 0 0 1px;"
        :height="400"
      >
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <h2 id="anchor-1">
          锚点 1
        </h2>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <h2 id="anchor-2">
          锚点 2
        </h2>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <h2 id="anchor-3">
          锚点 3
        </h2>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <h3 id="anchor-3-1">
          锚点 3-1
        </h3>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <h3 id="anchor-3-2">
          锚点 3-2
        </h3>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <h3 id="anchor-3-3">
          锚点 3-3
        </h3>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
      </Scroll>
    </Column>
    <Column :span="8">
      <Anchor marker>
        <AnchorLink to="#anchor-1">
          锚点 1
        </AnchorLink>
        <AnchorLink to="#anchor-2">
          锚点 2
        </AnchorLink>
        <AnchorLink to="#anchor-3">
          锚点 3
          <template #group>
            <AnchorLink to="#anchor-3-1">
              锚点 3-1
            </AnchorLink>
            <AnchorLink to="#anchor-3-2">
              锚点 3-2
            </AnchorLink>
            <AnchorLink to="#anchor-3-3">
              锚点 3-3
            </AnchorLink>
          </template>
        </AnchorLink>
      </Anchor>
    </Column>
  </Row>
</template>
