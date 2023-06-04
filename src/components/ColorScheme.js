import React, { Component } from 'react'

export default class ColorScheme extends Component {
    constructor(){
        super();
        this.state={
            colors:[
                '#4aa049',
                '#d51f20',
                '#fef0b8',
                '#b9bfc3',
                '#3265b0',
                '#07141e',
                '#f9ee3e',
                '#ffffff',
                '#f8cade',
                '#95d9f7',
                '#be2e36',
                '#096a3f',
                '#ffc13c',
                '#e3c597',
                '#62473b',
                '#77afd6',
                '#b1c04d',
                '#63605c',
                '#e05e80',
                '#ff7d3e',
                '#a96dca'
            ],
            border:''
        }
    }
    renderColors=()=>{
        var key=0;
        return this.state.colors.map(color=>{
            var border='none';
            if(color===this.state.border){
                border='2px solid black';
            }
            else{
                border='none';
            }
            key=key+1;
            return (
                <div key={key} className="square-styles" style={{backgroundColor:color,border:border}} onClick={()=>{
                    this.props.pickColor(color)
                    this.props.disablePan()
                    this.setState({border:color})
                }
                    }>
                    <div className='circle-styles'/>
                </div>
            )
        })
    }
    render() {
        return (
            <div style={{display:'flex'}}>
                {this.renderColors()}
            </div>
        )
    }
}
