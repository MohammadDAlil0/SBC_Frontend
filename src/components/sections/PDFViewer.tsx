// src/components/CustomPDFViewer.tsx
'use client'

import { FC } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import type {
  ToolbarSlot,
  TransformToolbarSlot,
} from '@react-pdf-viewer/toolbar'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

interface CustomPDFViewerProps {
  fileUrl: string
}

const CustomPDFViewer: FC<CustomPDFViewerProps> = ({ fileUrl }) => {
  // 1. Create a transform function that blanks out the slots you don't want
  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    // Hide the top-level icons
    Open: () => <></>,
    Download: () => <></>,
    Print: () => <></>,

    // hide their counterparts in the "More actions" ⋯ menu
    OpenMenuItem: () => <></>,
    DownloadMenuItem: () => <></>,
    PrintMenuItem: () => <></>,

    // if you want to remove the "⋯" menu button entirely, uncomment:
    MoreActionsPopoverButton: () => <></>,
  })

  // 2. Grab renderDefaultToolbar and Toolbar from the plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {defaultLayoutPluginInstance.toolbarPluginInstance.renderDefaultToolbar(
          transform
        )}
      </Toolbar>
    ),
  })

  console.log(fileUrl)

  return (
    <div className="border" style={{ height: 'calc(100vh - 100px)' }}>
      {fileUrl ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      ) : null}
    </div>
  )
}

export default CustomPDFViewer
