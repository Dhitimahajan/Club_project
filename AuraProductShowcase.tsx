import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

/**
 * AURA ONE — Framer Code Component
 * 
 * Demonstrates:
 * 1. Component Variants (Colorways: Midnight Black, Titanium Silver, Forest Green)
 * 2. Property Controls (Framer Variables & Bindings)
 * 3. Hotspot Markers with spring physics & interactive tooltips
 * 4. Responsive Auto-layout with Stacks
 */

interface AuraShowcaseProps {
  headline: string
  subheadline: string
  price: string
  accentColor: string
  cardRadius: number
  defaultColor: "black" | "silver" | "green"
  blackImage: string
  silverImage: string
  greenImage: string
}

const colorData = {
  black: {
    name: "01 — Midnight Black",
    accent: "#B8F36B",
    glow: "rgba(184, 243, 107, 0.25)",
  },
  silver: {
    name: "02 — Titanium Silver",
    accent: "#98D9FF",
    glow: "rgba(160, 210, 255, 0.3)",
  },
  green: {
    name: "03 — Forest Green",
    accent: "#65C286",
    glow: "rgba(101, 194, 134, 0.28)",
  },
}

const hotspots = [
  {
    id: "anc",
    label: "01",
    tag: "Acoustic Shield",
    title: "Adaptive ANC",
    desc: "Dual hybrid microphones constantly sample environmental noise, canceling up to 38 dB of ambient distraction.",
    metric: "-38 dB Active Attenuation",
    top: "64%",
    left: "36%",
  },
  {
    id: "battery",
    label: "02",
    tag: "Power Management",
    title: "40-Hour Stamina",
    desc: "Up to 40 hours of listening on a single charge with ANC enabled. 10m quick-charge yields 5 hours.",
    metric: "40h Battery / 5h Boost",
    top: "76%",
    left: "52%",
  },
  {
    id: "comfort",
    label: "03",
    tag: "Ergonomic Fit",
    title: "All-Day Comfort",
    desc: "Zero-pressure memory foam headband, breathable perforated protein leather, and 248g chassis.",
    metric: "248g Featherlight Chassis",
    top: "25%",
    left: "56%",
  },
]

export default function AuraProductShowcase(props: AuraShowcaseProps) {
  const {
    headline = "ENGINEERED FOR IMMERSION.",
    subheadline = "Hear what you’ve been missing. Meet AURA ONE. Your world, in better sound.",
    price = "₹12,999",
    accentColor = "#B8F36B",
    cardRadius = 20,
    defaultColor = "black",
    blackImage = "assets/aura-black.jpg",
    silverImage = "assets/aura-silver.jpg",
    greenImage = "assets/aura-green.jpg",
  } = props

  const [selectedColor, setSelectedColor] = useState<"black" | "silver" | "green">(defaultColor)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  const activeImages = {
    black: blackImage,
    silver: silverImage,
    green: greenImage,
  }

  const toggleHotspot = (id: string) => {
    setActiveHotspot(prev => (prev === id ? null : id))
  }

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#F5F4F0",
      color: "#17191D",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: "40px 24px",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        maxWidth: 1200,
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
        gap: 48,
        alignItems: "center"
      }}>
        
        {/* Left Column: Product Information & Interactive Swatches */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 520 }}>
          
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(23, 25, 29, 0.05)",
            padding: "6px 14px",
            borderRadius: 999,
            width: "fit-content",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#17191D" }} />
            AURA ONE · OVER-EAR FLAGSHIP
          </div>

          <h1 style={{
            fontSize: "3.2rem",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0
          }}>
            {headline}
          </h1>

          <p style={{
            fontSize: "1.05rem",
            lineHeight: 1.6,
            color: "#747780",
            margin: 0
          }}>
            {subheadline}
          </p>

          {/* Pricing & Finish Box */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            backgroundColor: "#FFFFFF",
            borderRadius: cardRadius,
            border: "1px solid rgba(23, 25, 29, 0.08)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}>
            <div>
              <span style={{ fontSize: "0.75rem", color: "#9E9EA7", fontWeight: 600, textTransform: "uppercase" }}>Launch Price</span>
              <div style={{ fontSize: "1.75rem", fontWeight: 700 }}>{price}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.75rem", color: "#9E9EA7", fontWeight: 600, textTransform: "uppercase" }}>Selected Finish</span>
              <div style={{ fontSize: "0.95rem", fontWeight: 600 }}>{colorData[selectedColor].name}</div>
            </div>
          </div>

          {/* Color Swatch Selectors */}
          <div style={{ display: "flex", gap: 16 }}>
            {(["black", "silver", "green"] as const).map(color => {
              const isSelected = selectedColor === color
              const colorsMap = {
                black: "radial-gradient(circle at 35% 35%, #2c2d30, #111215)",
                silver: "radial-gradient(circle at 35% 35%, #FFFFFF, #B9BDC4)",
                green: "radial-gradient(circle at 35% 35%, #466751, #1e3325)",
              }
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: isSelected ? "2px solid #17191D" : "2px solid transparent",
                    background: "transparent",
                    padding: 3,
                    cursor: "pointer",
                    outline: "none",
                    transform: isSelected ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  <span style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: colorsMap[color],
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.25)"
                  }} />
                </button>
              )
            })}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#000000" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              backgroundColor: "#17191D",
              color: "#FFFFFF",
              border: "none",
              padding: "16px 36px",
              borderRadius: 100,
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              width: "fit-content",
              boxShadow: "0 4px 14px rgba(23, 25, 29, 0.2)"
            }}
          >
            Explore AURA ONE ↗
          </motion.button>

        </div>

        {/* Right Column: Interactive Product Visual & Hotspots */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          
          {/* Subtle Ambient Radial Glow */}
          <div style={{
            position: "absolute",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            background: colorData[selectedColor].glow,
            filter: "blur(50px)",
            pointerEvents: "none",
            transition: "background 0.5s ease"
          }} />

          {/* Product Image Stage */}
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: 540,
            aspectRatio: "1 / 1"
          }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedColor}
                src={activeImages[selectedColor]}
                alt={`AURA ONE in ${colorData[selectedColor].name}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  position: "absolute",
                  inset: 0,
                  userSelect: "none"
                }}
              />
            </AnimatePresence>

            {/* Hotspots */}
            {hotspots.map(spot => {
              const isActive = activeHotspot === spot.id
              return (
                <div
                  key={spot.id}
                  style={{
                    position: "absolute",
                    top: spot.top,
                    left: spot.left,
                    transform: "translate(-50%, -50%)",
                    zIndex: 20
                  }}
                >
                  <motion.button
                    onClick={() => toggleHotspot(spot.id)}
                    whileHover={{ scale: 1.15 }}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: isActive ? accentColor : "#17191D",
                      color: isActive ? "#17191D" : "#FFFFFF",
                      border: "2px solid #FFFFFF",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                      outline: "none"
                    }}
                  >
                    {spot.label}
                  </motion.button>

                  {/* Hotspot Floating Card */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 12px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 250,
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          backdropFilter: "blur(16px)",
                          padding: "16px 18px",
                          borderRadius: cardRadius,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                          border: "1px solid rgba(255,255,255,0.8)",
                          zIndex: 30
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, background: "rgba(23,25,29,0.06)", padding: "2px 6px", borderRadius: 4 }}>
                            {spot.tag}
                          </span>
                          <span onClick={() => setActiveHotspot(null)} style={{ cursor: "pointer", fontSize: "1.1rem", color: "#9E9EA7" }}>
                            &times;
                          </span>
                        </div>
                        <h4 style={{ margin: "4px 0", fontSize: "0.98rem", fontWeight: 700 }}>{spot.title}</h4>
                        <p style={{ margin: "4px 0 10px", fontSize: "0.8rem", color: "#747780", lineHeight: 1.45 }}>{spot.desc}</p>
                        <div style={{ borderTop: "1px solid rgba(23,25,29,0.08)", paddingTop: 6, fontSize: "0.72rem", fontWeight: 600 }}>
                          {spot.metric}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

          </div>

        </div>

      </div>
    </div>
  )
}

// Framer Property Controls (Exposing Variables & Interactive Props)
addPropertyControls(AuraProductShowcase, {
  headline: {
    type: ControlType.String,
    title: "Headline",
    defaultValue: "ENGINEERED FOR IMMERSION.",
  },
  subheadline: {
    type: ControlType.String,
    title: "Subheadline",
    defaultValue: "Hear what you’ve been missing. Meet AURA ONE. Your world, in better sound.",
  },
  price: {
    type: ControlType.String,
    title: "Price",
    defaultValue: "₹12,999",
  },
  accentColor: {
    type: ControlType.Color,
    title: "Accent Color",
    defaultValue: "#B8F36B",
  },
  cardRadius: {
    type: ControlType.Number,
    title: "Card Radius",
    defaultValue: 20,
    min: 8,
    max: 36,
  },
  defaultColor: {
    type: ControlType.Enum,
    title: "Default Finish",
    options: ["black", "silver", "green"],
    optionTitles: ["Midnight Black", "Titanium Silver", "Forest Green"],
    defaultValue: "black",
  },
  blackImage: {
    type: ControlType.File,
    title: "Black Render",
    allowedFileTypes: ["jpg", "png", "webp"],
  },
  silverImage: {
    type: ControlType.File,
    title: "Silver Render",
    allowedFileTypes: ["jpg", "png", "webp"],
  },
  greenImage: {
    type: ControlType.File,
    title: "Green Render",
    allowedFileTypes: ["jpg", "png", "webp"],
  },
})
