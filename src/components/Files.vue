<template>
  <div class="files" v-if="torrent">
    <div class="table">
      <table>
        <colgroup>
          <col style="width: 32px;">
          <col style="width: 70%;">
          <col style="">
        </colgroup>
        <tbody>
          <tr v-for="file in torrent.files" :key="file.name">
            <td>
              <button class="icon-bitton"
                @click="appendViewerFile(file)"><i class="material-icons">{{ getMaterialIcon(file) }}</i></button>
            </td>
            <td class="text-left" @click="offlineSaveFile(file)">{{ file.name }}</td>
            <td class="text-right">{{ prettyBytes(file.length) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import prettyBytes from '../lib/pretty-bytes'
  import fileExtension from '../lib/file-extension'
  
  console.log(1)

  export default {
    name: 'files',
    props: {
      torrent: {
        type: Object,
        default: null
      }
    },
    methods: {
      appendViewerFile (file) {
        const viewer = document.querySelector('.viewer')
        viewer.innerHTML = ''
        file.appendTo(viewer)
      },

      offlineSaveFile (file) {
        console.log(file.downloaded, file.length)
        file.getBlobURL((err, url) => {
          if (err) return console.err(err)
          console.log(url)
        })
      },

      getMaterialIcon (file) {
        if (fileExtension.isPlayable(file)) {
          return 'slideshow'
        }
        else {
          return 'description'
        }
      },

      prettyBytes
    }
  }
</script>

<style>
  .files {
    padding: 12px;
  }

  .table {
    overflow: hidden;
  }

  .table table {
    table-layout: fixed;
    width: 100%;
    max-width: 100%;
    border-spacing: 0;
    border-collapse: collapse;    
  }

  .table table td {
    padding: 4px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: top;
    line-height: 24px;
  }
</style>