import React, {useState, useRef, useEffect} from "react"
import {ipcRenderer} from "electron"
import Video from 'react-video-renderer'

import Image2 from "../../assets/images/background/image2.jpg"
import Image4 from "../../assets/images/background/image4.jpg"
import Image5 from "../../assets/images/background/image5.jpg"

import Video1 from "../../assets/videos/background/video4.webm"
import Video2 from "../../assets/videos/background/video5.webm"
import Video3 from "../../assets/videos/background/video6.webm"

import style from "./Background.module.scss"

const Background = () => {
  const listRef = useRef()
  const [animationActive, setAnimationActive] = useState(true)

  ipcRenderer.on('status', (event, data) => {
    if (data.status === "window_focus") {
      setAnimationActive(true)
    }
    if (data.status === "window_blur") {
      setAnimationActive(false)
    }
  })

  const TYPE_IMAGE = "image"
  const TYPE_VIDEO = "video"

  const backgroundsList = [
    {
      file: Video1,
      type: TYPE_VIDEO,
      filterClassName: style.filter_video1
    },
    {
      file: Image5,
      type: TYPE_IMAGE,
      filterClassName: style.filter_image5
    },
    {
      file: Video2,
      type: TYPE_VIDEO,
      filterClassName: style.filter_video2
    },
    {
      file: Image2,
      type: TYPE_IMAGE,
    },
    {
      file: Video3,
      type: TYPE_VIDEO,
      filterClassName: style.filter_video3
    },
    {
      file: Image4,
      type: TYPE_IMAGE,
      filterClassName: style.filter_image4
    },
  ]

  const imageAnimation = "imageAnimation"
  const imageAnimatonKeyframes = `
    @keyframes ${imageAnimation} {
      0% {
        opacity: 0;
        transform: translateX(-5%);
      }
      ${5 * 4 / backgroundsList.length}% {
        opacity: 0.25;
      }
      ${25 * 4 / backgroundsList.length}% {
        opacity: 0.25;
      }
      ${30 * 4 / backgroundsList.length}% {
        opacity: 0;
        transform: translateX(5%);
      }
    }
  `
  const videoAnimation = "videoAnimation"
  const videoAnimatonKeyframes = `
    @keyframes ${videoAnimation} {
      0% {
        opacity: 0;
        transform: translateX(-5%);
      }
      ${5 * 4 / backgroundsList.length}% {
        opacity: 0.35;
      }
      ${25 * 4 / backgroundsList.length}% {
        opacity: 0.35;
      }
      ${30 * 4 / backgroundsList.length}% {
        opacity: 0;
        transform: translateX(5%);
      }
    }
  `

  return (
    <ul className={`${style.background} ${!animationActive && style.paused }`}>
      <style>{imageAnimatonKeyframes}</style>
      <style>{videoAnimatonKeyframes}</style>
      {backgroundsList && backgroundsList.length && backgroundsList.map((item, i) => (
        <li
          key={`${item.file}-${i}`}
          className={`${item.type === TYPE_IMAGE ? style.image : ""} ${item.type === TYPE_VIDEO ? style.video : ""} ${item.filterClassName || ""}`}
          style={{
            animationName: item.type === TYPE_IMAGE && imageAnimation || item.type === TYPE_VIDEO && videoAnimation,
            animationDuration: `${backgroundsList.length * 10}s`,
            animationDelay: `${i * 10}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite"
          }}
        >
          {item.type === TYPE_IMAGE && (
            <img src={item.file} />
          )}
          {item.type === TYPE_VIDEO && (
            <Video src={item.file}>
              {(video, state, actions) => {
                animationActive ? actions.play() : actions.pause()
                return (video)
              }}
            </Video>
          )}
        </li>
      ))}
    </ul>
  )
}

export default Background
