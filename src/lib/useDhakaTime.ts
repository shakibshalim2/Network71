import { useEffect, useState } from "react"

/** HH:MM in Asia/Dhaka, refreshed every 15s. */
export function useDhakaTime() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dhaka" })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])
  return time
}
