<template>
  <div class="client">
    <wt-viewer
      :state.sync="state"
      :torrent.sync="torrent"
    >
    </wt-viewer>
    <wt-metadata
      :torrent="torrent"
      :state="state"
      :metadata.sync="metadata"
    >
    </wt-metadata>
    <wt-files
      :torrent="torrent"
    >
    </wt-files>
  </div>
</template>

<script>
  // components
  import Viewer from './Viewer.vue'
  import Metadata from './Metadata.vue'
  import Files from './Files.vue'

  export default {
    data() {
      return {
        state: 'wait',
        torrent: null,
        metadata: null
      }
    },
    components: {
      'wt-viewer': Viewer,
      'wt-metadata': Metadata,
      'wt-files': Files
    }
  }
</script>

<style scoped>
  .client {
    position: relative;
    width: 100%;
    max-width: 1088px;
    margin: 0 auto;
    padding: 48px 24px 40px;    
  }
  @media (max-width: 1088px) {
    .client {
      padding: 0
    }
  }
</style>