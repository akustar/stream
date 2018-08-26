<template>
  <div class="viewer">
    <form class="form" v-if="state === 'wait'" @submit.prevent="startTorrent">
      <input type="text" v-model="torrentId" placeholder="Magnet:" autofocus>
      <button type="submit" class="icon-button"><i class="material-icons">get_app</i></button>
    </form>
    <span class="spinner" v-if="state === 'ready'"></span>
  </div>
</template>

<script>
  import stream from '../lib/stream'

  export default {
    name: 'viewer',
    props: {
      state: {
        type: String,
        default: 'wait'
      },
      torrent: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        // 08ada5a7a6183aae1e09d831df6748d566095a10
        torrentId: this.searchParams(
          'infohash'
        )
      }
    },
    mounted () {
      this.startTorrent()
    },
    methods: {
      startTorrent () {
        if (this.torrentId.trim().length <= 0) return

        this.setProps({
          state: 'ready'
        })

        stream.startTorrent(this.torrentId)
        .then(torrent => {
          this.setProps({
            torrent,
            state: 'start'
          })
          
          const file = torrent.files[0]
          file.appendTo('.viewer')
        })
        .catch(err => {
          this.setProps({
            state: 'wait'
          })
        })
      },

      searchParams (param) {
        const url = new URL(window.location.href)
        return url.searchParams.get(param) || ''
      }
    }
  }
</script>

<style>
  .viewer {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    border-radius: 5px;
    box-shadow: 0 9px 40px 0 rgba(0,0,0,.15);
    background-color: #000;
  }

  .viewer video,
  .viewer object {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .viewer img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    height: 100%;
  }

  .form {
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 44px;
    max-width: 460px;
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
    padding: 5px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, .65);
  }

  .form .icon-button {
    position: relative;
    top: 1px;
    color:rgba(255, 255, 255, .65);
  }

  .form input[type="text"] {
    font-size: 18px;
    background-color: transparent;
    margin: 0 20px 0 4px;
  }

  .form input[type="text"],
  .form input[type="text"]::-webkit-input-placeholder {
    color: rgba(255, 255, 255, .65)
  }

  .spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -14px;
    margin-left: -14px;
    display: block;
    width: 28px;
    height: 28px;
    border-top: 3px solid hsla(0,0%,100%,.25);
    border-right: 3px solid hsla(0,0%,100%,.25);
    border-bottom: 3px solid hsla(0,0%,100%,.25);
    border-left: 3px solid #fff;
    -webkit-animation: loading-spin .5s infinite linear;
    animation: loading-spin .5s infinite linear;
    border-radius: 50%;
  }
  @keyframes loading-spin {
    0%{
      transform:rotate(0deg)
    }
    to{
      transform:rotate(1turn)
    }
  }  

  @media (max-width: 1088px) {
    .viewer {
      border-radius: 0;
    }
  }
</style>