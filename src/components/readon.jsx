import React from 'react'
import Immutable from 'immutable'
import fs from 'fs'
import path from 'path'

export default class Readon extends React.Component {
  constructor() {
    super()
    var list = Immutable.List()
    this.state = {
      files: list,
      currentPage: 1,
      lastPage: list.size
    }
  }

  _fileDroped(e) {
    e.preventDefault()
    var dir = e.dataTransfer.files[0]

    fs.readdir(dir.path, (err, files) => {
      if (err) throw err
      var fileList = []
      files.filter((file) => {
        return fs.statSync(dir.path + "/" + file).isFile() && /.*\.jpg$/.test(file)
      }).forEach((file) => {
        fileList.push(dir.path + "/" + file)
      })

      var list = Immutable.List(fileList)
      this.setState({
        files: list,
        currentPage: 1,
        lastPage: list.size
      })
    })
  }

  _keyInputed(e) {
    console.log(e.key)
    if (e.key == "ArrowRight" && this.state.currentPage > 1) {
      var current = this.state.currentPage == 2 ? 1 : this.state.currentPage - 2
      console.log(current)
      this.setState({
        currentPage: current
      })
    } else if (e.key == "ArrowLeft" && this.state.lastPage > this.state.currentPage) {
      var current = this.state.currentPage == this.state.lastPage - 1 ? this.state.currentPage + 1 : this.state.currentPage + 2
      console.log(current)
      this.setState({
        currentPage: current
      })
    }
  }

  _thumbClicked(i) {
    this.setState({
      currentPage: i + 1
    })
  }

  _showImages() {
    var isOdd = (this.state.currentPage == this.state.lastPage)

    return (
      <div className="images">
        <div className="left">
          <img src={isOdd ? "" : this.state.files.get(this.state.currentPage)} />
        </div>
        <div className="right">
          <img src={this.state.files.get(this.state.currentPage - 1)} />
        </div>
      </div>
     )
  }

  _showThumbs() {
    const list = this.state.files.map((f, i) => {
      return <li key={i} className="thumb-item" onClick={(e) => this._thumbClicked(i)}><img src={f}/></li>
    })
    return <div className="thumbs"><ul>{list}</ul></div>
  }

  render() {
    return (
      <div tabIndex="0" id="container" onDragOver={(e) => e.preventDefault()} onDrop={(e) => this._fileDroped(e)} onKeyDown={(e) => this._keyInputed(e)}>
        { this.state.lastPage > 0 ? this._showThumbs() : "" }
        { this.state.lastPage > 0 ? this._showImages() : "" }
      </div>
    )
  }
}
