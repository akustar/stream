import WebTorrent from 'webtorrent/webtorrent.min.js'
import prettyBytes from './pretty-bytes'

const trackers = [
  'wss://tracker.btorrent.xyz',
  'wss://tracker.openwebtorrent.com',
  'wss://tracker.fastcast.nz'
]

const rtcConfig = {
  'iceServers': [
    {
      'urls': 'stun:stun.l.google.com:19305'
    }
  ]
}

const torrentOpts = {
  announce: trackers
}

const trackerOpts = {
  announce: trackers,
  rtcConfig: rtcConfig
}

const client = new WebTorrent({
  tracker: trackerOpts
})

function startTorrent (torrentId) {
  return new Promise((resolve, reject) => {
    const torrent = client.add(torrentId, torrentOpts, resolve)
    torrent.on('error', reject)
    torrent.on('done', () => {
      // 웹 사이트 성능을 고려하여 다운로드가 완료되면
      // 새로 들어오는 피어의 연결을 중지 합니다
      torrent.pause()
    })
  })
}

function getTorrentProgress () {
  const torrent = client.torrents[0]
  if (!torrent) return null
  
  return {
    name: torrent.name,
    percent: (Math.round(torrent.progress * 100 * 100) / 100) + '%',
    downloaded: prettyBytes(torrent.downloaded),
    total: prettyBytes(torrent.length),
    downloadSpeed: prettyBytes(torrent.downloadSpeed) + '/s',
    uploadSpeed: prettyBytes(torrent.uploadSpeed) + '/s',
    numPeers: torrent.numPeers
  }
}

export default {
  startTorrent,
  getTorrentProgress
}

