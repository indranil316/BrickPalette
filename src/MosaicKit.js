import React, { Component } from 'react';
import Brick from './components/Brick';
import ColorSchme from './components/ColorScheme';
import { PanZoom } from 'react-easy-panzoom'
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FaHandPaper } from "react-icons/fa";
import Tooltip from 'react-tooltip-lite';

class MosaicKit extends Component {
    constructor(){
        super();
        this.state={
            rows:'',
            columns:'',
            defaultBoxes:[],
            rowDefault:16,
            columnDefault:16,
            boxes:[],
            optionVal:'1x1',
            selectedBrickColor:'#ffffff',
            backgroundColor:'white',
            top:0,
            left:0,
            panZoom:true,
            eraserOn:false,
            mouseUp:false,
            zoomLevel:0,
            pageBackgroundColor:'white',
            setNavPosition:0
        }
        this.panZoomRef=React.createRef();
    }
    componentDidMount(){
        const {selectedBrickColor}=this.state;
        this.createBricks('1x1',selectedBrickColor);
        let x=window.innerWidth/2-275;
        this.setState({setNavPosition:x})
        window.addEventListener('resize',()=>{
            let x=window.innerWidth/2-275;
            this.setState({setNavPosition:x})
        })
    }
    createBricks=(optionVal,selectedBrickColor)=>{
        const {rowDefault,columnDefault}=this.state;
        var rows='';
        var columns='';
        var s='r'
        for(var i=0;i<optionVal.length;i++){
            if(optionVal[i]==='x')
            {
                s='c'
            }
            else{
                if(s==='r'){
                    rows=rows+optionVal[i]
                }
                if(s==='c'){
                    columns=columns+optionVal[i]
                }
            }
        }
        rows=rowDefault * parseInt(rows);
        columns=columnDefault * parseInt(columns);
        this.setState({rows,columns})
        var boxes=[];
        for(let i=0;i<rows;i++){
            var row=[]
            for(let j=0;j<columns;j++){
                var obj={
                    rowIndex:i,
                    index:j,
                    color:selectedBrickColor
                }
                row.push(obj)
            }
            boxes.push(row)
        }
        this.setState({boxes})
        this.setState({defaultBoxes:boxes})
    }
    setMosaicPosition=()=>{
        var {top,left}=this.state;
        return{
            top:top,
            left:left,
        }
    }
    renderBricks=()=>{
        var {boxes,backgroundColor,selectedBrickColor,eraserOn,mouseUp,panZoom,optionVal}=this.state;
        var divIndex=0;
        if(boxes.length===0){
            this.createBricks(optionVal,'none')
        }
        return boxes.map(row=>{
            divIndex=divIndex+1;
            return (
                <div key={divIndex} className="mosaic-position" style={this.setMosaicPosition()}>
                    
                        {row.map(box=>{
                            return <Brick key={box.index} box={box} backgroundColor={backgroundColor} selectedBrickColor={selectedBrickColor} eraserOn={eraserOn} mouseUp={mouseUp} updateBrick={this.updateBrick} panZoom={panZoom}/>
                        })}
               
                </div>
            )
        })
        
    }
    updateBrick=(rowIndex,index,color)=>{
        var {boxes} =this.state;
        boxes[rowIndex][index].color=color;
        this.setState(boxes)
    }
    setCursor=(x)=>{
        const {panZoom}=this.state;
        if(x==='inline'){
            if(panZoom===true){
                return {cursor:'crosshair',width:'100%',height:'100%',border:'none',outline:"none"}
            }
            else {
                return {cursor:'all-scroll',width:'100%',height:'100%',border:'none',outline:"none"}
            }
        }
        else{
            if(panZoom===true){
                return 'cursor-crosshair'
            }
            else {
                return 'cursor-all-scroll'
            }
        }
    }
    clearScreen=()=>{
        var status=window.confirm('Do you want to erase everything ?')
        if(status===false){
            return null;
        }
        this.setState({boxes:[],panZoom:true})
    }
    pickColor=(color)=>{
        this.setState({selectedBrickColor:color,eraserOn:false})
    }
    iconColor=()=>{
        const {panZoom}=this.state;
        if(panZoom===true){
            return 'black'
        }
        else {
            return 'red'
        }
    }
    renderToolTipContent=(command)=>{
        const {panZoom}=this.state;
        if(command==='fit-screen'){
            return (
                <div className="tool-tip">
                    <p>Fit To Screen</p>
                </div>
            )
        }
        if(command==='reset'){
            return (
                <div className="tool-tip">
                    <p>Bring the grid to initial position</p>
                </div>
            )
        }
        if(panZoom===true){
        return (
            <div className="tool-tip">
                <p>Enable Pan</p>
            </div>
        )
        }
        else{
            return(
                <div className="tool-tip">
                    <p>Disable Pan</p>
                </div>
            )
        }
    }
    centerGrid=()=>{
        const {optionVal}=this.state;
        var rows=16*(parseInt(optionVal[0]));
        var gridWidth=20*rows;
        var screenWidth=window.innerWidth*.9-30;
        var left=0;
        if(screenWidth>gridWidth){
            left=(screenWidth-gridWidth)/2;
        }
        if(screenWidth<gridWidth){
            left=((gridWidth/2)-(screenWidth/2))
        }
        this.setState({left})
    }
    zoom=(direction)=>{
        var {zoomLevel}=this.state;
        console.log(zoomLevel)
        if(direction==='in'){
            this.setState({zoomLevel:this.state.zoomLevel+10})
        }
        if(direction==='out'){
            if(zoomLevel===-60){
                return null
            }
            this.setState({zoomLevel:this.state.zoomLevel-10})
        }
    }
    triggerZoom=()=>{
        const {zoomLevel}=this.state;
        if(zoomLevel===0){
            return null
        }
        var zoom=1+1*zoomLevel/100;
        console.log(zoom)
        return{
            transform:`scale(${zoom})`
        }
    }
    setBgClass=()=>{
        const backgroundColor=this.state.backgroundColor;
        if(backgroundColor==='white'){
            return 'bg-grid white'
        }
        if(backgroundColor==='lightyellow'){
            return 'bg-grid lightyellow'
        }
        if(backgroundColor==='green'){
            return 'bg-grid green'
        }
    }
    disablePan=()=>{
        this.setState({panZoom:true})
    }
    render(){
        return(
            <div className="page">
                <div className="nav-bar" style={{left:this.state.setNavPosition}}>
                    <div className="row">
                        <p className="nav-item-text"><span className="small-text">Base size: </span>1x1=16x16</p>
                        <select className="nav-item-width" onChange={(e)=>{this.setState({optionVal:e.target.value});this.createBricks(e.target.value);}}>
                            <option>1x1</option>
                            <option>1x2</option>
                            <option>1x3</option>
                            <option>2x2</option>
                            <option>2x3</option>
                            <option>3x1</option>
                            <option>3x2</option>
                            <option>3x3</option>
                        </select>
                        <select className="nav-item-width" onChange={(e)=>{this.setState({backgroundColor:e.target.value})}} >
                            <option>white</option>
                            <option>lightyellow</option>
                            <option>green</option>
                        </select>
                    </div>
                    <div className="row tool-bar">
                        <div className="flex-wrap stick-top">                                            
                            <ColorSchme pickColor={this.pickColor} selectedBrickColor={this.state.selectedBrickColor} eraserOn={this.state.eraserOn} disablePan={this.disablePan}/>
                        </div>
                        <div className="action-container">
                            <button onClick={()=>{this.setState({eraserOn:true,panZoom:true})}} className="btn btn-secondary nav-item-btn">Eraser</button>
                            <button onClick={()=>{this.clearScreen()}} className="btn btn-danger clear nav-item-btn">Clear</button>
                        </div> 
                    </div>
                </div>
                <div className="side-bar">
                    <div>
                        <div className="rel-left10">
                            <i className="fa fa-arrow-up icon icon-up" onClick={()=>{this.panZoomRef.current.moveBy(0,-10)}}/>
                            <div className="icon-pos">
                                <i className="fa fa-arrow-left icon" onClick={()=>{this.panZoomRef.current.moveBy(-10,0)}}/>
                                <i className="fa fa-dot-circle-o icon" onClick={()=>{
                                    this.panZoomRef.current.autoCenter()
                                }}/>
                                <i className="fa fa-arrow-right icon"  onClick={()=>{this.panZoomRef.current.moveBy(10,0)}}/>
                            </div>
                            <i className="fa fa-arrow-down icon icon-down"  onClick={()=>{this.panZoomRef.current.moveBy(0,10)}}/>   
                        </div>
                    </div>
                    <Tooltip direction="right" content={this.renderToolTipContent('fit-screen')}>
                        <div className="fit-screen" onClick={()=>{this.panZoomRef.current.autoCenter()}}>
                            <i className="fa fa-arrows-alt fa-lg"/>
                        </div>
                    </Tooltip>
                    <Tooltip direction="right" content={this.renderToolTipContent('reset')}>
                        <div className="reset" onClick={()=>{this.panZoomRef.current.reset()}}>
                            <i className="fa fa-refresh fa-lg"/>
                        </div>
                    </Tooltip>
                    <div className="btn-container">
                        <i className="fa fa-search-plus fa-lg color-lightblue cursor-zoom-in" onClick={()=>{this.panZoomRef.current.zoomIn()}}/>
                        <i className="fa fa-search-minus fa-lg color-lightblue cursor-zoom-out" onClick={()=>{this.panZoomRef.current.zoomOut()}}/>
                    </div>
                    <Tooltip direction="right" content={this.renderToolTipContent()}>
                        <FaHandPaper size={30} className="cursor-pointer" color={this.iconColor()} onClick={()=>{
                            this.setState({panZoom:!this.state.panZoom})}
                        }/>
                    </Tooltip>
                </div>
                <div className={`mosaic-container ${this.setCursor()}`} onMouseUp={()=>{this.setState({mouseUp:false})}} onMouseDown={()=>{this.setState({mouseUp:true})}}>

                <PanZoom 
                    boundaryRatioVertical={.5} 
                    boundaryRatioHorizontal={.5} 
                    enableBoundingBox
                    keyMapping={{
                        '87': { x: 0, y: -1, z: 0 },
                        '83': { x: 0, y: 1, z: 0 },
                        '65': { x: -1, y: 0, z: 0 },
                        '68': { x: 1, y: 0, z: 0 },
                      }}
                    style={this.setCursor('inline')}
                    disabled={this.state.panZoom}   
                    ref={this.panZoomRef}
                >
                    <div style={this.triggerZoom()} className={`${this.setBgClass()}`}>
                        {this.renderBricks()}
                    </div>
               </PanZoom>
                
                </div>
                
            </div>
        )
    }
}
export default MosaicKit;