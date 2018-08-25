<template>
  <div class="metadata" v-if="torrent">
    <div>
      <h3>{{ torrent.name }}</h3>
    </div>
    <div>
      <div class="shares">
        <a href="#!" @click.prevent="sharesLink">[Share link]</a>
        <a :href="torrent.magnetURI" target="_blank">[Magnet URI]</a>
        <a :href="torrent.torrentFileBlobURL " target="_blank" :download="torrent.name + '.torrent'">[Download.torrent]</a>
      </div>
    </div>
  </div>
</template>

<script>
  import stream from '../lib/stream.js'

  export default {
    props: {
      torrent: {
        type: Object,
        default: null
      },
      metadata: {
        type: Object,
        default: null
      }
    },
    mounted () {
      setInterval(this.updateTorrentProgress, 1000)
    },
    methods: {
      updateTorrentProgress () {
        this.setProps({
          metadata: stream.getTorrentProgress()
        })
      },

      sharesLink () {
        if (navigator.share) {
          navigator.share({
            title: 'stream',
            text: this.torrent.name,
            url: 'https://dist-cwoueyvbym.now.sh/',
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error))
        }
      }
    }
  }
</script>

<style scoped>
  .metadata {
    padding: 20px 0 8px 0;
  }

  .metadata > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .metadata h3 {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 4px;
    word-break: keep-all;
  }

  .shares {
    display: flex;
    margin-bottom: 12px;
  }

  .shares > a {
    padding: 0 5px;
  }

  .shares > a:first-child {
    padding-left: 0;
  }

  .files {
    width: 100%;
  }

  .files h4 {
    font-size: 12px;
    font-weight: 400;
  }

  @media (max-width: 1088px) {
    .metadata {
      padding: 12px;
    }
  }
</style>