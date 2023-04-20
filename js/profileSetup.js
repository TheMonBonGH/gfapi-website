import hexToUuid from 'hex-to-uuid'
import skinRequest from '../js/skinRequest.js'

const setup = async (xboxData) => {
  const { profileUsers: [{ settings, id }] } = xboxData
  const [gamertag, icon, gamescore, accounttier] = settings.map((s) => s.value)
  const textureid = (await skinRequest.getTextureId(id)).toString() ?? 'no texture ID found.';
  
  return {
    gamertag,
    xuid: id,
    floodgateuid: createFuuid(parseInt(id, 10)),
    icon,
    gamescore,
    accounttier,
    textureid,
  }
}

const createFuuid = (xuid) => {
  const hexFUUID = `0000000000000000000${xuid.toString(16)}`
  return hexToUuid(hexFUUID)
}

const createXuid = (fuuid) => parseInt(fuuid.substring(22).replace(/-/g, ''), 16)

export default {
  setup,
  createFuuid,
  createXuid,
}