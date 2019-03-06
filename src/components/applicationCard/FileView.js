import React from "react"
import { Button } from "antd"

import { downloadFile } from "../../modules/files"

class FileView extends React.Component {
  handleDownloadFile = file => e => {
    e.preventDefault()
    downloadFile(file.id)
  }

  render() {
    const { file } = this.props

    return (
      <div>
        {file ? (
          <div
            style={{
              maxWidth: "600px",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px"
            }}
          >
            <div
              title={file.name + "." + file.fileExt}
              style={{
                lineHeight: "2.78",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
              }}
            >
              {file.name + "." + file.fileExt}
            </div>
            <Button
              onClick={this.handleDownloadFile(file)}
              style={{ padding: "0 48px" }}
              icon="download"
            />
          </div>
        ) : (
          "Файлы отсутствуют"
        )}
      </div>
    )
  }
}

export default FileView
