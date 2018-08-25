import WebTorrent from 'webtorrent/webtorrent.min.js'

// From: https://github.com/webtorrent/webtorrent/blob/master/docs/get-started.md
function prettyBytes (num = 0) {
  var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (neg) num = -num
  if (num < 1) return (neg ? '-' : '') + num + ' B'
  exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
  num = Number((num / Math.pow(1000, exponent)).toFixed(2))
  unit = units[exponent]
  return (neg ? '-' : '') + num + ' ' + unit
}

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

