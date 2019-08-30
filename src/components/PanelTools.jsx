import React from 'react';
import '../index.css';
import { colors } from './constantColors';

class PanelTools extends React.Component {
    constructor() {
        super();
        this.state = {
            colors: "black",
            tool: "Line",
            widthCanvas: 200,
            heightCanvas: 200
        };
    }
    changeCanvasWidth = (e) => {
        this.setState({ widthCanvas: e.target.value });
    }
    changeCanvasHeight = (e) => {
        this.setState({ heightCanvas: e.target.value });
    }
    newCanvas = () => {
        this.props.newCanvas(this.state.widthCanvas, this.state.heightCanvas);
    }

    render() {
        return (
            <div className="panelTools">
                <p style={{
                    textAlign: "left",
                    margin: "0"
                }}>selected color: </p>
                <div style={{
                    backgroundColor: this.state.colors,
                    width: "10px", cursor: "pointer",
                    minHeight: "10px", border: "solid 1px black",
                    margin: 0, padding: 0
                }}></div>
                <br></br>
                <div className="divColors">
                    {
                        colors.map((item, index) => {
                            return (
                                <div key={index} style={{
                                    backgroundColor: item.color,
                                    width: "10px", cursor: "pointer",
                                    minHeight: "10px", border: "solid 1px black",
                                    margin: 0, padding: 0
                                }}
                                    onClick={(e) => {
                                        this.props.SelectColors(e.target.style.backgroundColor);
                                        this.setState({ colors: e.target.style.backgroundColor });
                                    }}
                                >
                                </div>
                            )
                        })
                    }
                </div>

                <div className="Tool">
                    selected tool: <div className="selectTool">{this.state.line ? this.state.line : "Line"}</div>
                    <div onClick={() => {
                        this.props.tool("Line");
                        this.setState({ line: "Line" });
                    }}>Line</div>
                    <div onClick={() => {
                        this.props.tool("Rectangle");
                        this.setState({ line: "Rectangle" });
                    }}>Rectangle</div>
                    <div onClick={() => {
                        this.props.tool("Fill");
                        this.setState({ line: "Fill" });
                    }}>Bucket Fill</div>
                </div>
                <div className="inputs">
                    <p>Width</p>
                <input type="text" onChange={this.changeCanvasWidth} defaultValue={this.state.widthCanvas} ></input>
                <p>Height</p>
                <input type="text" onChange={this.changeCanvasHeight} defaultValue={this.state.heightCanvas}></input>
                  <br></br>  <button onClick={this.newCanvas}>Create or clean List</button>
                </div>
            </div>
        )
    }
}

export default PanelTools;