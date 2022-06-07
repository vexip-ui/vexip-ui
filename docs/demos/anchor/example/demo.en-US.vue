<template>
  <Row>
    <Column :span="16">
      <Scroll
        ref="scroll"
        use-y-bar
        :delta-y="50"
        style="padding: 15px; margin-right: 15px; box-shadow: 0 0 1px;"
        :height="400"
      >
        <p v-for="n in 5" :key="n" style="height: 50px;">
          Some content to fill
        </p>
        <h2 id="anchor-1">
          Anchor 1
        </h2>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          Some content to fill
        </p>
        <h2 id="anchor-2">
          Anchor 2
        </h2>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          Some content to fill
        </p>
        <h2 id="anchor-3">
          Anchor 3
        </h2>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          Some content to fill
        </p>
        <h3 id="anchor-3-1">
          Anchor 3-1
        </h3>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          Some content to fill
        </p>
        <h3 id="anchor-3-2">
          Anchor 3-2
        </h3>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          Some content to fill
        </p>
        <h3 id="anchor-3-3">
          Anchor 3-3
        </h3>
        <p v-for="n in 5" :key="n" style="height: 50px;">
          Some content to fill
        </p>
      </Scroll>
    </Column>
    <Column :span="8">
      <Anchor marker>
        <AnchorLink to="#anchor-1">
          Anchor 1
        </AnchorLink>
        <AnchorLink to="#anchor-2">
          Anchor 2
        </AnchorLink>
        <AnchorLink to="#anchor-3">
          Anchor 3
          <template #group>
            <AnchorLink to="#anchor-3-1">
              Anchor 3-1
            </AnchorLink>
            <AnchorLink to="#anchor-3-2">
              Anchor 3-2
            </AnchorLink>
            <AnchorLink to="#anchor-3-3">
              Anchor 3-3
            </AnchorLink>
          </template>
        </AnchorLink>
      </Anchor>
    </Column>
  </Row>
</template>
