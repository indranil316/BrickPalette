import React,{Component} from 'react';


export default class Brick extends Component{
    constructor(){
        super();
        this.state={
            backgroundColor:'transparent',
            clicked:false
        }
    }
    renderCircle=(selectedBrickColor,backgroundColor)=>{
        const {clicked} = this.state;
        if(backgroundColor!=='white'){
            return <div className="circle-styles"></div>
        }
        if(clicked===false){
            return null
        }
        if(clicked===true){
            return <div className="circle-styles"></div>
        }
    }
    onClickHandler=(selectedBrickColor,eraserOn,backgroundColor,color,panZoom)=>{
        const {index,rowIndex}=this.props.box;
        if(panZoom===false){
            return null
        }
        if(eraserOn===false){
            this.setState({backgroundColor:selectedBrickColor,clicked:true})
            this.props.updateBrick(rowIndex,index,selectedBrickColor)
        }
        if(eraserOn===true){
            this.setState({backgroundColor:'inherit',clicked:false})
            this.props.updateBrick(rowIndex,index,backgroundColor)
        }
    }
    render(){
        const {index,color}=this.props.box;
        const {selectedBrickColor,eraserOn,backgroundColor,mouseUp,panZoom}=this.props;
        return(
            <div className="square-styles" style={{backgroundColor:this.state.backgroundColor}} onClick={()=>{this.onClickHandler(selectedBrickColor,eraserOn,backgroundColor,color,panZoom)}} onMouseEnter={()=>{
                if(mouseUp===true){
                   this.onClickHandler(selectedBrickColor,eraserOn,backgroundColor,color,panZoom)}
                }
            } key={index}>
               {this.renderCircle(color,backgroundColor)}
            </div>
        )
    }
}
