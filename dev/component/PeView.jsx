import React from 'react'
import ReactDOM from 'react-dom'
var PropTypes = require('react').PropTypes
import Tree, { TreeNode } from 'rc-tree'
import PEReader from '../PEReader.js'
import 'rc-tree/assets/index.css'

class PeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { treeData: [] }
    this.props.Config.emitManager.AddRenderListenner("readyParser", (event, path) => {
      var reader = new PEReader()
      reader.parserFile(path)
      this.setTreeData(reader)
    })

    console.log(global.emitter)
    console.log(this.props.Config.emitManager)
  }

  setTreeData(reader) {
    var treeData = []
    var increaseCengji = (a) => {
      var c = a.split('-')
      c[c.length - 1] = 1 + parseInt(c[c.length - 1])
      return c.join('-')
    }
    var getChildren = (obj, deep) => {
      var children = []
      Object.keys(obj).forEach((item, index, array) => {
        if (obj[item] instanceof Array) {
          var cobj = obj[item]
          cobj.forEach((cItem, cIndex, childAarray) => {
            deep = increaseCengji(deep)
            if (cobj[cItem] instanceof Object) {
              children.push({ name: item + "[" + cIndex + "]", key: deep, children: getChildren(cobj[cItem], deep + '-0'), isLeaf: false })
            } else {
              children.push({ name: item + "[" + cIndex + "]", key: deep, value: cobj[cItem], isLeaf: true })
            }
          })

        } else if (obj[item] instanceof Object) {
          deep = increaseCengji(deep)
          children.push({ name: item, key: deep, children: getChildren(obj[item], deep + '-0'), isLeaf: false })
        } else {
          deep = increaseCengji(deep)
          children.push({ name: item, value: obj[item], key: deep, isLeaf: true })
        }
      })
      return children
    }
    treeData[0] = {
      name: 'dosHeader', key: '0-0', children: getChildren(reader.dosHeader, '0-0-0'), isLeaf: false
    }
    treeData[1] = {
      name: 'dosStub', key: '0-1', value: reader.dosStub, isLeaf: true
    }
    treeData[2] = {
      name: 'peHeader', key: '0-2', value: reader.peHeader, children: getChildren(reader.peHeader, '0-2-0'), isLeaf: false
    }
    treeData[3] = {
      name: 'sectionHeaders', key: '0-3', children: getChildren(reader.sectionHeaders, '0-3-0'), isLeaf: false
    }

    // export
    if (reader.peHeader.optionHeader.dataDirectory.exportTable != 0) {
      treeData[4] = {
        name: 'exportTable', key: '0-5', children: getChildren(reader.exportTable, '0-5-0'), isLeaf: false
      }
    }
    // import
    if (reader.peHeader.optionHeader.dataDirectory.importTable != 0) {
      treeData[4] = {
        name: 'importTable', key: '0-6', children: getChildren(reader.importTable, '0-6-0'), isLeaf: false
      }
    }
    // resource
    if (reader.peHeader.optionHeader.dataDirectory.resourceTable != 0) {
      treeData[4] = {
        name: 'resourceTable', key: '0-7', children: getChildren(reader.resourceTable, '0-7-0'), isLeaf: false
      }
    }


    this.setState({ treeData: treeData })
  }
  onSelect(info) {
    console.log('selected', info)
  }
  render() {
    const loop = (data) => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode title={item.name} key={item.key}  value={item.value}>
            {loop(item.children)}
          </TreeNode>
        }
        return (
          <TreeNode
            title={item.name}
            key={item.key}
            value={item.value}
            isLeaf={item.isLeaf}
            disabled={item.key === '0-0-0'} />
        )
      })
    }
    const treeNodes = loop(this.state.treeData)
    return (
      <div>
        <Tree onSelect={this.onSelect} >
          {treeNodes}
        </Tree>
      </div>
    )
  }
}

export default PeView
