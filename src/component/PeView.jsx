import React from 'react'
import ReactDOM from 'react-dom'
var PropTypes = require('react').PropTypes
import Tree, { TreeNode } from 'rc-tree'
import {PEReader} from '../struct/PEReader.js'
import 'rc-tree/assets/index.css'
import SplitPane from '@kadira/react-split-pane'
import ReactDataGrid from 'react-data-grid'
import FreeScrollBar from 'react-free-scrollbar';

class PeView extends React.Component {
  constructor(props) {
    super(props)
    this.props.Config.emitManager.AddRenderListenner("readyParser", (event, path) => {
      var reader = new PEReader()
      reader.parserFile(path)
      this.setTreeData(reader)
    })

    this.state = this.initialState();
  }

  loop(data) {
    return data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.name} isLeaf={item.isLeaf} key={item.key} value={item}>
          {this.loop(item.children)}
        </TreeNode>
      }
      return (
        <TreeNode
          title={item.name}
          key={item.key}
          value={item}
          isLeaf={item.isLeaf}
          disabled={item.key === '0-0-0'} />
      )
    })
  }

  initialState() {
    return { treeNodes: [], isDataChange: false, rows: [{ name: 1, title: 'Title 1' }] }
  }
  setTreeData(reader) {
    var treeData = []
    var increaseCengji = (a) => {
      var c = a.split('-')
      c[c.length - 1] = 1 + parseInt(c[c.length - 1])
      return c.join('-')
    }
    var getChildren = (obj, deep, name) => {
      if (obj instanceof Array) {
        return { name: name, key: deep, value: obj, isLeaf: false, children: getArrayChildren(obj, deep + "-0", name) }
      } else if (obj instanceof Object) {
        return { name: name, key: deep, value: obj, isLeaf: false, children: getObjectChildren(obj, deep + "-0") }
      } else {
        return { name: name, key: deep, value: obj, isLeaf: true }
      }
    }
    var getObjectChildren = (obj, deep) => {
      var children = []
      Object.keys(obj).forEach((item, index, array) => {
        deep = increaseCengji(deep)
        children.push(getChildren(obj[item], deep, item))
      })
      return children
    }
    var getArrayChildren = (obj, deep, name) => {
      var children = []
      obj.forEach((cItem, cIndex, childAarray) => {
        deep = increaseCengji(deep)
        children.push(getChildren(cItem, deep, name + '[' + cIndex + ']'))
      })
      return children
    }
    treeData[0] = getChildren(reader.dosHeader, '0-0', 'dosHeader')
    treeData[1] = { name: 'dosStub', key: '0-1', value: reader.dosStub, isLeaf: true }
    treeData[2] = getChildren(reader.peHeader, '0-2', 'peHeader')
    treeData[3] = getChildren(reader.sectionHeaders, '0-3', 'sectionHeaders');
    // export
    if (reader.peHeader.optionHeader.dataDirectory.exportTable != 0) {
      treeData[4] = getChildren(reader.exportTable, '0-5', 'exportTable')
    }
    // import
    if (reader.peHeader.optionHeader.dataDirectory.importTable != 0) {
      treeData[4] = getChildren(reader.importTable, '0-6', 'importTable')
    }
    // resource
    // if (reader.peHeader.optionHeader.dataDirectory.resourceTable != 0) {
    //   treeData[4] =getChildren(reader.resourceTable,'0-7','resourceTable')
    //  }

    let nodes = this.loop(treeData)
    this.setState({ treeNodes: nodes, isDataChange: true, rows: [{ name: 1, title: 'Title 1' }] })
  }

  onSelect(info, event) {
    console.log('selected', info)
    let node = event.node.props.value
    if (node.children) {
      this.setState({ rows: node.children, isDataChange: false })
    } else {
      this.setState({ rows: [node], isDataChange: false, })
    }
  }
  render() {

    const hideScroll = {
      track: {
        horizontalCustomize: {
          height: '0px',
          backgroundColor: '#FAFAFA',
          borderTop: '1px solid #E8E8E8',
          transition: 'opacity 0.3s'
        }
      }
    }

    const columns = [{ key: 'name', name: 'Name' }, { key: 'value', name: 'Value' }, { key: 'comment', name: 'Comment' }]
    const rowGetter = rowNumber => this.state.rows[rowNumber];
    return (
      <div>
        <SplitPane split="vertical" minSize={150} defaultSize={200}>
          <div style={{ height: "100%" }}>
            <FreeScrollBar autohide={true} className={hideScroll}>
              <Tree onSelect={this.onSelect.bind(this)}>
                {this.state.treeNodes}
              </Tree>
            </FreeScrollBar>
          </div>
          <div style={{ height: "100%",overflow:"none" }}>
            <ReactDataGrid
              columns={columns}
              rowGetter={rowGetter}
              rowsCount={this.state.rows.length}
              minHeight={this.props.Config.height} />
          </div>
        </SplitPane>

      </div>
    )
  }
}

export default PeView
