import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const [osat, setOsat] = useState({ loppu: "", verkko: "vlan" })
  const [ip, setIp] = useState("")

  useEffect(() => {
    console.log("doip")
    // console.log({ osat })
    setIp("")
    if (osat.loppu === "" || osat.loppu.length !== 4) return

    let ekanumero = ""
    let loppu = osat.loppu
    let verkko = osat.verkko

    if (verkko === "vlan") {
      const lopuneka = loppu.slice(0, 1)
      ekanumero = lopuneka
    } else if (verkko === "vlan2") {
      const lopuneka = loppu.slice(0, 1)
      ekanumero = lopuneka === "2" ? "6" : "7"
    }

    let loppuosa = ""
    for (let i of loppu.slice(1)) {
      if (i !== "0") {
        loppuosa += i
      }
    }

    setIp(`10.22${ekanumero}.${loppuosa}.x`)
  }, [osat.verkko, osat.loppu])

  return (
    <Layout>
      <SEO title="Home" />

      <span>
        <b>Verkko</b>
      </span>
      <br />
      <label>
        <input
          type="radio"
          value="vlan"
          name="verkko-radio"
          checked={osat.verkko === "vlan"}
          onChange={e => {
            // setVerkko(e.target.value)
            setOsat({ loppu: osat.loppu, verkko: "vlan" })
          }}
        />
        VI vlan
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="vlan2"
          name="verkko-radio"
          checked={osat.verkko === "vlan2"}
          onChange={e => {
            // setVerkko(e.target.value)
            setOsat({ loppu: osat.loppu, verkko: "vlan2" })
          }}
        />
        VI vlan L2
      </label>

      <br />

      <span>
        <b>Tunnuksen/verkon loppuosa</b> (neljä viimeistä merkkiä)
      </span>
      <br />
      <input
        type="text"
        value={osat.loppu}
        onChange={ev => {
          setOsat({ loppu: ev.target.value, verkko: osat.verkko })
        }}
      />

      <div>
        <span>
          <b>IP</b>
        </span>
        <br />
        {ip !== "" ? `${ip} (valitse x väliltä 2-254)` : "10.22x.xxx.xxx"}
        <br />

        <span>
          <b>Default gateway</b>
        </span>
        <br />
        {ip !== "" ? `${ip} (x on 1)` : "10.22x.xxx.1"}
      </div>
    </Layout>
  )
}

export default IndexPage
