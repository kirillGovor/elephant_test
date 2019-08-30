import React from 'react';
import '../index.css';
class DrawFile extends React.Component {
    constructor() {
        super();
        this.state = {
            points: [],
            linePoints: [],
            rectPoints: []
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.figures.newCanvas === true) {
            this.setState({ linePoints: [], rectPoints: [] });
            newProps.figures.newCanvas = false; // :(
        }
    }
    fill = (e, tool,colors) => {
        if (tool === "Fill") {
            if (e.target.nodeName === "svg") {
                e.target.style.backgroundColor = colors;
            }
            else {
                e.target.style.fill = colors;
                e.target.style.stroke = colors;
            }
        }
    }
    render() {
        return (
            <div>
                <svg onClick={(e) => {
                    var target = e.target || e.srcElement,
                        rect = target.getBoundingClientRect(),
                        offsetX = e.clientX - rect.left,
                        offsetY = e.clientY - rect.top;

                    e.offsetX = offsetX;
                    e.offsetY = offsetY;
                    let mass = this.state.points;
                    mass.push({ x: e.offsetX, y: e.offsetY });
                    this.setState({ points: mass });
                    this.fill(e, this.props.tool,this.props.colors);
                    import('./draw').then(AnotherComponent => {
                        let draw = AnotherComponent.draw(this.state.points, this.props.colors, this.state.linePoints, this.state.rectPoints, this.props.tool);
                        if (draw)
                            this.setState({ linePoints: draw[0], rectPoints: draw[1], points: [] });
                    });
                   
                }} className="SvgList" width={this.props.figures.canvas.w !== 0 ? this.props.figures.canvas.w : "200"} height={this.props.figures.canvas.h !== 0 ? this.props.figures.canvas.h : "200"}>
                    {
                        this.props.figures.fills.map((item, index) => {
                            return (
                                <rect key={index} x={item.x ? item.x : 0} y={item.y ? item.y : 0} width={item.w ? item.w : 0} height={item.h ? item.h : 0} stroke="black" strokeWidth="1" fill="red" />
                            )
                        })
                    }
                    {
                        this.state.linePoints.map((item, index) => {
                            return (
                                <line key={index} x1={item.x1 ? item.x1 : 0} y1={item.y1 ? item.y1 : 0} x2={item.x2 ? item.x2 : 0} y2={item.y2 ? item.y2 : 0} stroke={item.color} strokeWidth="1" />
                            )
                        })
                    }
                    {
                        this.state.rectPoints.map((item, index) => {
                            return (
                                <rect key={index} x={item.x ? item.x : 0} y={item.y ? item.y : 0} width={item.w ? item.w : 0} height={item.h ? item.h : 0} stroke={item.color} strokeWidth="1" fill={item.color} />
                            )
                        })
                    }
                    {
                        this.props.figures.lines.map((item, index) => {
                            return (
                                <line key={index} x1={item.x1 ? item.x1 : 0} y1={item.y1 ? item.y1 : 0} x2={item.x2 ? item.x2 : 0} y2={item.y2 ? item.y2 : 0} stroke="black" strokeWidth="1" />
                            )
                        })
                    }
                    {
                        this.props.figures.rectes.map((item, index) => {
                            return (
                                <rect key={index} x={item.x ? item.x : 0} y={item.y ? item.y : 0} width={item.w ? item.w : 0} height={item.h ? item.h : 0} stroke="black" strokeWidth="1" />
                            )
                        })
                    }
                </svg>
            </div>
        )
    }
}

export default DrawFile;