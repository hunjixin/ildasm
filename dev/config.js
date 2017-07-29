import {PEReader} from './PEReader.js'
import {EmitManager} from './emitManager.js'

const Config =
{
  width: 800,
  height: 600,
  title: 'ildasm',
  icon: 'images/sd.icon',
  emitManager:new EmitManager()
}

export default Config
module.exports.Config = Config
