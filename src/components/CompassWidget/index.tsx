import React, { useState, useEffect, FC } from "react"
import Button from "../Button"
import api from "../../api"



export const CompassWidget: FC<{ language: "de" | "en" }> = ({ language }) => {
  const [widgetIsActive, setWidgetIsActive] = useState(false)
  const [widget, setWidget] = useState({
    title: undefined,
    backgroundImage: undefined,
    buttonLink: undefined,
    buttonText: undefined
  })

  useEffect(() => {
    const fetchWidgetData = async () => {
      try {
        const widget = await api.getCompassWidget(language)
        setWidget({
          title: widget.title,
          backgroundImage: widget.background_image,
          buttonLink: widget.button_link,
          buttonText: widget.button_text,
        })
      } catch (e) {
        return undefined
      }
    }
    fetchWidgetData()
  }, [language])

  if (!widget.buttonLink) {
    return null
  }

  return (
    <div className="widget-container">
      <button onClick={() => setWidgetIsActive(cur => !cur)} className={`widget ${widgetIsActive ? "widget-active" : ""}`}>
        <img
          className=""
          src={`/assets/compass_small.png`}
          alt=""
        />
      </button>
      {widgetIsActive && <div className="widget-wrapper">
        <div style={{ backgroundImage: `url(${widget.backgroundImage})` }} className="widget-popup clipped">
          <div>
            <p className="widget-text">{widget.title}</p>
            <div className="widget-popup-button-container">
              <Button variant={"transparent-blue-alt2"} label={widget.buttonText} link={widget.buttonLink} />
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}