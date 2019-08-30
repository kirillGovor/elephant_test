import React from 'react';
import '../index.css';
import DrawFile from './DrawFile';
import PanelTools from './PanelTools';
import { generateCanvas, generateLines, generateRect, generateFill } from './generateFile';
class Canvas extends React.Component {
    constructor() {
        super();
        this.state = {
            fileText: '',
            figures: { canvas: { h: 0, w: 0 }, lines: [], rectes: [], fills: [], newCanvas: false },
            colors: "black",
            tool: "Line"
        };
    }

    handleFilerRead = (e) => {
        let content = e.target.result;
        this.setState({ fileText: content });
        this.setState({ figures: { canvas: this.state.figures.canvas, lines: this.state.figures.lines, rectes: this.state.figures.rectes, fills: this.state.figures.fills, newCanvas: true } })
        this.splitFile(content);
    }

    handleFileChosen = (file) => {
        var fileReader;
        fileReader = new FileReader();
        fileReader.onloadend = this.handleFilerRead;
        if (file)
            fileReader.readAsText(file);
    }

    handleColors = (color) => {
        this.setState({ colors: color });
    }

    handleTools = (tool) => {
        this.setState({ tool: tool });
    }

    newCanvas = (w, h) => {
        this.setState({ figures: { canvas: { h: h, w: w }, lines: [], rectes: [], fills: [], newCanvas: true } });
    }

    splitFile = (file) => {
        var newMass;
        newMass = file.split('\n');
        newMass.map((item) => {
            switch (item[0]) {
                case 'C':
                    let newCanvas = generateCanvas(item.slice(1, item.length));
                    this.setState({ figures: { canvas: newCanvas, lines: this.state.figures.lines, rectes: this.state.figures.rectes, fills: this.state.figures.fills } });
                    break;
                case 'L':
                    let newLine = generateLines(item.slice(1, item.length), this.state.figures.lines);
                    this.setState({ figures: { canvas: this.state.figures.canvas, lines: newLine, rectes: this.state.figures.rectes, fills: this.state.figures.fills } });
                    break;
                case 'R':
                    let newRect = generateRect(item.slice(1, item.length), this.state.figures.rectes);
                    this.setState({ figures: { canvas: this.state.figures.canvas, lines: this.state.figures.lines, rectes: newRect, fills: this.state.figures.fills } });
                    break;
                case 'B':
                    let newFill = generateFill(item.slice(1, item.length), this.state.figures.fills);
                    this.setState({ figures: { canvas: this.state.figures.canvas, lines: this.state.figures.lines, rectes: this.state.figures.rectes, fills: newFill } });
                    break;
                default:
                    console.log("figures is not defined");
                    break;
            }
        });
    }

    render() {
        return (
            <div>
                <input className="chooseFile" type="file" onChange={e => this.handleFileChosen(e.target.files[0])} />
                <PanelTools SelectColors={this.handleColors} tool={this.handleTools} newCanvas={this.newCanvas} />
                <DrawFile figures={this.state.figures} colors={this.state.colors} tool={this.state.tool} />
            </div>
        )
    }
}

export default Canvas;