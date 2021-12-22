import React, { useEffect, useState } from 'react'
import '../index.css'
import { GridLoader } from 'react-spinners';
import { dbDatabase } from '../firebaseConfig';
import { Edit, FormatColorFill, Menu, Opacity, ScatterPlot, WbShade } from '@mui/icons-material';
import profile from "../images/profile.png"
import { ref, onValue, update} from "firebase/database";
import { IconButton } from '@mui/material';

export default function Dashboard() {
    const [action, setAction] = useState("")
    const [target, setTarget] = useState("")
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false)
    const [firstname, setFirstName] = useState("");
    const [secondname, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [projectID, setProjectID] = useState("");
    const [humidity, setHumidity] = useState("");
    const [humidityLowest, setHumidityLowest] = useState("");
    const [humidityHighest, setHumidityHighest] = useState("");
    const [temperature, setTemperature] = useState("");
    const [temperatureLowest, setTemperatureLowest] = useState("");
    const [temperatureHighest, setTemperatureHighest] = useState("");
    const [soilMoisture, setSoilMoisture] = useState("");
    const [soilMoistureLowest, setSoilMoistureLowest] = useState("");
    const [soilMoistureHighest, setSoilMoistureHighest] = useState("");
    const [intensity, setIntensity] = useState("")
    const [intensityLowest, setIntensityLowest] = useState("")
    const [intensityHighest, setIntensityHighest] = useState("")
    const [waterLevel, setWaterLevel] = useState("");
    const [waterLevelLowest, setWaterLevelLowest] = useState("");
    const [waterLevelHighest, setWaterLevelHighest] = useState("");
    const color = "#1ee449";
    const userInfoRef = ref(dbDatabase, `Users/${10001}`);

    function changeData() {
        update(ref(dbDatabase, `Users/${10001}/${target}`), {
          on: action
        });
      }

    try {
        onValue(userInfoRef, async (snapshot) => {
            const data = await snapshot.val();
            setFirstName(data.firstname)
            setSecondName(data.lastname)
            setEmail(data.email)
            setProjectID(data.projectID)
            setHumidity(data.humidity.current)
            setHumidityLowest(data.humidity.lowest)
            setHumidityHighest(data.humidity.highest)
            setTemperature(data.temperature.current)
            setTemperatureLowest(data.temperature.lowest)
            setTemperatureHighest(data.temperature.highest)
            setSoilMoisture(data.moisture.current)
            setSoilMoistureLowest(data.moisture.lowest)
            setSoilMoistureHighest(data.moisture.highest)
            setWaterLevel(data.waterlevel.current)
            setWaterLevelLowest(data.waterlevel.lowest)
            setWaterLevelHighest(data.waterlevel.highest)
            setIntensity(data.intensity.current)
            setIntensityLowest(data.intensity.lowest)
            setIntensityHighest(data.intensity.highest)
            setLoading(false)
        });
    } catch (error) {
        console.log(error)
    }

    const showMenu = () => {
        if(menu === false) {
            setMenu(true)
        } else {
            setMenu(false)
        }
    }
    const hideMenu = () => {
        if(menu === true) {
            setMenu(false)
        }
    }
    document.addEventListener('keydown', function(event) {
        if(event.key.match("m"))(
            showMenu()
        )
    });

    useEffect(() => {
    }, [])

    return (
        <div onClick={hideMenu}>
        <div className="dashboardDiv">
            {loading &&
            <>
                <div className="loading">
                    <GridLoader color={color} loading={loading} size={15} margin={2} />
                </div>
            </>}
            { !loading &&
            <>
            <nav className="nav">
                <div className="logoSection">
                    <ScatterPlot className="logoIcon"/>
                    <span className="logoText">Smart Farming</span>
                </div>
                <h3 className="title">DIGITALIZING</h3>
                <div/>
                <div className="iconBtn">
                    <Menu title="Menu" className="menuBtn" onClick={showMenu}/>  
                </div>
            </nav>
            <div className="measuredCards">
                <div className="cardTemp">
                    <span className="spanTitle">Temperature</span>
                    <span className={parseInt(temperatureLowest) < parseInt(temperature) < parseInt(temperatureHighest) ? `amountGreen spanAmountTemp` : `amountRed spanAmountTemp`}>{temperature || `0`}</span>
                    <span className="spanActions">
                        <span onClick={() => {
                            setTarget("fan")
                            setAction("True")
                            changeData()
                        }} className="irrigateStart">start</span>
                        <Opacity className="irrigateIcon"/>
                        <span onClick={() => {
                            setTarget("fan")
                            setAction("False")
                            changeData()
                        }} className="irrigateStop">stop</span>
                    </span>
                </div>
                <div className="cardSoilMoisture">
                    <span className="spanTitle">Soil Moisture</span>
                    <span className={parseInt(soilMoistureLowest) < parseInt(soilMoisture) < parseInt(soilMoistureHighest) ? `amountGreen spanAmount` : `amountRed spanAmount`}>{soilMoisture || `0`}%</span>
                    <span className="spanActions">
                        <span onClick={() => {
                            setTarget("irrigatePump")
                            setAction("True")
                            changeData()
                        }} className="irrigateStart">start</span>
                        <FormatColorFill className="irrigateIcon"/>
                        <span onClick={() => {
                            setTarget("irrigatePump")
                            setAction("False")
                            changeData()
                        }} className="irrigateStop">stop</span>
                    </span>
                </div>
                <div className="cardHumidity">
                    <span className="spanTitle">Humidity</span>
                    <span className={parseInt(humidityLowest) < parseInt(humidity) < parseInt(humidityHighest) ? `amountGreen spanAmount` : `amountRed spanAmount`}>{humidity || `0`}%</span>
                    <span className="spanActions">
                        <span onClick={() => {
                            setTarget("irrigatePump")
                            setAction("True")
                            changeData()
                        }} className="irrigateStart">start</span>
                        <Opacity className="irrigateIcon"/>
                        <span onClick={() => {
                            setTarget("irrigatePump")
                            setAction("False")
                            changeData()
                        }} className="irrigateStop">stop</span>
                    </span>
                </div>
                <div className="cardWaterLevel">
                    <span className="spanTitle">Water Level</span>
                    <span className={parseInt(waterLevelLowest) < parseInt(waterLevel) < parseInt(waterLevelHighest) ? `amountGreen spanAmount` : `amountRed spanAmount`}>{waterLevel || `0`}l</span>
                    <span className="spanActions">
                        <span onClick={() => {
                            setTarget("waterpump")
                            setAction("True")
                            changeData()
                        }} className="irrigateStart">start</span>
                        <Opacity className="irrigateIcon"/>
                        <span onClick={() => {
                            setTarget("waterpump")
                            setAction("False")
                            changeData()
                        }} className="irrigateStop">stop</span>
                    </span>
                </div>
                <div className="cardLight">
                    <span className="spanTitle">Light Intensity</span>
                    <span className={parseInt(intensityLowest) < parseInt(intensity) < parseInt(intensityHighest) ? `amountRed spanAmount` : `amountRed spanAmount`}>{intensity || `0`}%</span>
                    <span className="spanActions">
                        <span onClick={() => {
                            setTarget("shade")
                            setAction("True")
                            changeData()
                        }} className="irrigateStart">open</span>
                        <WbShade className="irrigateIcon"/>
                        <span onClick={() => {
                            setTarget("shade")
                            setAction("False")
                            changeData()
                        }} className="irrigateStop">close</span>
                    </span>
                </div>
            </div>
            <div className="measuredTable">
                <table className="table">
                    <span className="tableTitle">
                        Current Values
                    </span>
                    <IconButton onClick={() => setModal(true)} className="iconBttn">
                        <Edit className="editBtn"/>
                    </IconButton>
                    <tr>
                        <th>Measuring</th>
                        <th>Lowest</th>
                        <th>Highest</th>
                        <th>Current</th>
                    </tr>
                    <tr>
                        <td>Temperature</td>
                        <td>{temperatureLowest || `0`}</td>
                        <td>{temperatureHighest || `0`}</td>
                        <td>{temperature || `0`}</td>
                    </tr>
                    <tr>
                        <td>Soil Moisture</td>
                        <td>{soilMoistureLowest || `0`}%</td>
                        <td>{soilMoistureHighest || `0`}%</td>
                        <td>{soilMoisture || `0`}%</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>{humidityLowest || `0`}%</td>
                        <td>{humidityHighest || `0`}%</td>
                        <td>{humidity || `0`}%</td>
                    </tr>
                    <tr>
                        <td>Water Level</td>
                        <td>{waterLevelLowest || `0`}l</td>
                        <td>{waterLevelHighest || `0`}l</td>
                        <td>{waterLevel || `0`}l</td>
                    </tr>
                    <tr>
                        <td>Light Intensity</td>
                        <td>{intensityLowest || `0`}%</td>
                        <td>{intensityHighest || `0`}%</td>
                        <td>{intensity || `0`}%</td>
                    </tr>
                </table>
            </div>
            {menu && 
            <div className="menu">
                    <img src={profile} alt="profile" className="profileIcon"/>
                    <div className="infoOnly">
                        <span className="info">
                            {firstname + " " + secondname || "Name Surname"}
                        </span>
                        <span className="info">
                            {email || "email@example.com"}
                        </span>
                        <span className="info">
                            Project ID: {projectID || "00000"}
                        </span>
                    </div>
                    <span className="infoLinks">
                        Manage account
                    </span>
                    <span className="infoLinks">
                        Logout
                    </span>
            </div>
            }
            </>}
            {modal &&
                <div className="modal">
                    <div className="editDiv">
                        <span className="modalTitle">Edit ranges</span>
                        <span className="modalTemperature">
                            <span className="label">Temperature</span>
                            <div className="inputs">
                                <span className="labels">
                                    <span className="low">lowest</span>
                                    <span className="high">highest</span>
                                </span>
                                <input type="text" placeholder={temperatureLowest || "0"}/>
                                <input type="text" placeholder={temperatureHighest || "0"}/>
                            </div>
                        </span>
                        <span className="modalMoisture">
                            <span className="label">Soil Moisture</span>
                            <div className="inputs">
                                <span className="labels">
                                    <span className="low">lowest</span>
                                    <span className="high">highest</span>
                                </span>
                                <input type="text" placeholder={soilMoistureLowest || "0"}/>
                                <input type="text" placeholder={soilMoistureHighest || "0"}/>
                            </div>
                        </span>
                        <span className="modalWaterLevel">
                            <span className="label">Water Level</span>
                            <div className="inputs">
                                <span className="labels">
                                    <span className="low">lowest</span>
                                    <span className="high">highest</span>
                                </span>
                                <input type="text" placeholder={waterLevelLowest || "0"}/>
                                <input type="text" placeholder={waterLevelHighest || "0"}/>
                            </div>
                        </span>
                        <span className="modalIntensity">
                            <span className="label">Light Intensity</span>
                            <div className="inputs">
                                <span className="labels">
                                    <span className="low">lowest</span>
                                    <span className="high">highest</span>
                                </span>
                                <input type="text" placeholder={intensityLowest || "0"}/>
                                <input type="text" placeholder={intensityHighest || "0"}/>
                            </div>
                        </span>
                        <span className="modalHumidity">
                            <span className="label">Humidity</span>
                            <div className="inputs">
                                <span className="labels">
                                    <span className="low">lowest</span>
                                    <span className="high">highest</span>
                                </span>
                                <input id="humidity" type="text" placeholder={humidityLowest || "0"}/>
                                <input type="text" placeholder={humidityHighest || "0"}/>
                            </div>
                        </span>
                        <div className="btns">
                            <button onClick={() => setModal(false)}  className="cancelChanges" type="submit">CANCEL</button>
                            <button className="saveChanges" type="submit">SAVE CHANGE</button>
                        </div>
                    </div>
                </div>
            }
            </div>
            </div>
    )
}
