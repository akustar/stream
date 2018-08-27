<template>
  <div class="metadata" v-if="torrent">
    <div>
      <h3>{{ torrent.name }}</h3>
    </div>
    <div>
      <div class="shares">
        <a @click.prevent="shareLink">[Share link]</a>
        <a :href="torrent.magnetURI" target="_blank">[Magnet URI]</a>
        <a :href="torrent.torrentFileBlobURL" target="_blank" :download="torrent.name + '.torrent'">[Download.torrent]</a>
      </div>
    </div>
    <div>
      <span>{{ metadata.percent }}</span>
      <span>{{ metadata.downloaded }}</span>
      <span>{{ metadata.total }}</span>
      <span>{{ metadata.downloadSpeed }}</span>
      <span>{{ metadata.uploadSpeed }}</span>
      <span>{{ metadata.numPeers }}</span>
    </div>
    <input type="text" class="sr-only" readonly ref="clipboard">
  </div>
</template>

<script>
  import stream from '../lib/stream.js'

  export default {
    props: {
      state: {
        type: String,
        default: 'wait'
      },
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
      shareLink () {
        //  Chrome 61 API
        if (navigator.share) {
          navigator.share({
            title: 'stream',
            text: this.torrent.name
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error))
        }
        else {
          this.copyLinkToClipboard()
        }
      },

      updateTorrentProgress () {
        const metadata = stream.getTorrentProgress()
        if (metadata) {
          this.setProps({
            metadata
          })
        }
      },

      copyLinkToClipboard () {
        this.$refs.clipboard.value = `${location.href}?infohash=${this.torrent.infoHash}`
        this.$refs.clipboard.select()
        document.execCommand('copy')

        this.$toasted.show('클립보드에 복사되었습니다', {
          action: {
            text: '확인',
            onClick: (event, toastObject) => toastObject.goAway(0)
          }
        })        
      }
    }
  }
</script>

<style>
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

  @media (max-width: 1088px) {
    .metadata {
      padding: 12px;
    }
  }
</style>